import { Box, Button, HStack, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCube, FaSquare } from 'react-icons/fa';
import type { Connection, Edge, Node } from 'reactflow';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MarkerType,
    MiniMap,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CloudComponentsSidebar } from '../components/CloudComponentsSidebar';
import CloudEdge from '../components/CloudEdge';
import DesignManager from '../components/DesignManager';
import IsometricNode from '../components/IsometricNode';
import SettingsMenu from '../components/SettingsMenu';
import type { CloudDesign, CloudDesignVersion } from '../types/CloudDesign';
import { STORAGE_KEYS } from '../types/CloudDesign';
import type { CloudProviderSettings } from '../types/Settings';
import { defaultSettings } from '../types/Settings';

const nodeTypes = {
  default: IsometricNode,
};

const edgeTypes = {
  default: CloudEdge,
};

// Define valid connections between different AWS services
const validConnections: Record<string, string[]> = {
  'EC2 Instance': ['RDS Database', 'S3 Bucket', 'Security Group'],
  'RDS Database': ['Security Group'],
  'VPC': ['EC2 Instance', 'RDS Database', 'Security Group'],
  'Security Group': ['EC2 Instance', 'RDS Database'],
  'S3 Bucket': ['EC2 Instance'],
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Internet Gateway', isometric: false },
    position: { x: 250, y: 25 },
  },
];

const initialEdges: Edge[] = [];

const flowStyles = {
  background: 'transparent',
};

export const CloudArchitecture = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isometric, setIsometric] = useState(false);
  const [currentDesignId, setCurrentDesignId] = useState<string>();
  const [currentVersion, setCurrentVersion] = useState(1);
  const [settings, setSettings] = useState<CloudProviderSettings>(defaultSettings);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const buttonBg = useColorModeValue('white', 'gray.700');
  const buttonTextColor = useColorModeValue('gray.800', 'white');
  const buttonBorderColor = useColorModeValue('gray.200', 'gray.600');

  // Auto-save functionality
  useEffect(() => {
    if (!currentDesignId) return;

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer
    autoSaveTimerRef.current = setTimeout(() => {
      const design: CloudDesign = {
        id: currentDesignId,
        name: 'Autosaved',
        nodes,
        edges,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: currentVersion + 1,
        isAutosaved: true,
      };

      // Save design data
      localStorage.setItem(
        `${STORAGE_KEYS.DESIGN_PREFIX}${currentDesignId}`,
        JSON.stringify(design)
      );

      // Save version
      const version: CloudDesignVersion = {
        version: currentVersion + 1,
        nodes,
        edges,
        timestamp: new Date().toISOString(),
        description: 'Auto-saved version',
      };

      localStorage.setItem(
        `${STORAGE_KEYS.VERSION_PREFIX}${currentDesignId}-${version.version}`,
        JSON.stringify(version)
      );

      setCurrentVersion(version.version);

      toast({
        title: 'Design auto-saved',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }, STORAGE_KEYS.AUTO_SAVE_INTERVAL);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [nodes, edges, currentDesignId, currentVersion, toast]);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);

      if (!sourceNode || !targetNode) return;

      const sourceType = sourceNode.data.label;
      const targetType = targetNode.data.label;

      // Check if the connection is valid
      const allowedTargets = validConnections[sourceType] || [];
      if (!allowedTargets.includes(targetType)) {
        toast({
          title: 'Invalid Connection',
          description: `${sourceType} cannot be directly connected to ${targetType}`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const edge = {
        ...params,
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        animated: true,
      };

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, nodes, toast]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode: Node = {
        id: Math.random().toString(),
        type: 'default',
        position,
        data: { label: type, isometric },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, isometric]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleLoadDesign = useCallback((design: CloudDesign) => {
    setNodes(design.nodes);
    setEdges(design.edges);
    setCurrentDesignId(design.id);
    setCurrentVersion(design.version);
  }, [setNodes, setEdges]);

  // Update all nodes with isometric prop
  const nodesWithIsometric = nodes.map(node => ({
    ...node,
    data: { ...node.data, isometric },
  }));

  return (
    <Box display="flex" flexDir="column" h="calc(100vh - 100px)" bg={bgColor}>
      <Box display="flex" flex="1" position="relative">
        <Box width="250px" borderRight="1px solid" borderColor="gray.200">
          <Box p={4} borderBottom="1px solid" borderColor="gray.200">
            <VStack spacing={2}>
              <HStack width="full" spacing={2}>
                <DesignManager
                  nodes={nodes}
                  edges={edges}
                  onLoadDesign={handleLoadDesign}
                  currentDesignId={currentDesignId}
                />
                <SettingsMenu onSettingsChange={setSettings} />
              </HStack>
              <Button
                leftIcon={isometric ? <FaSquare /> : <FaCube />}
                onClick={() => setIsometric(!isometric)}
                size="sm"
                width="full"
                bg={buttonBg}
                color={buttonTextColor}
                border="1px solid"
                borderColor={buttonBorderColor}
                shadow="sm"
                _hover={{
                  shadow: 'md',
                  bg: useColorModeValue('gray.50', 'gray.600'),
                }}
              >
                {isometric ? '2D View' : 'Isometric View'}
              </Button>
            </VStack>
          </Box>
          <CloudComponentsSidebar settings={settings} />
        </Box>
        <Box flex="1" position="relative">
          <ReactFlow
            nodes={nodesWithIsometric}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            style={flowStyles}
          >
            <Background gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
};

export default CloudArchitecture;
