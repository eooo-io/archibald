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
import CloudComponentsSidebar from '../components/CloudComponentsSidebar';
import CloudEdge from '../components/CloudEdge';
import DesignManager from '../components/DesignManager';
import IsometricNode from '../components/IsometricNode';
import PropertiesPanel from '../components/PropertiesPanel';
import type { CloudDesign } from '../types/CloudDesign';
import { STORAGE_KEYS } from '../types/CloudDesign';
import type { ElementProperties } from '../types/ElementProperties';
import { getDefaultProperties } from '../types/ElementProperties';

const nodeTypes = {
  default: IsometricNode,
};

const edgeTypes = {
  default: CloudEdge,
};

const flowStyles = {
  background: 'transparent',
};

const defaultViewport = {
  x: 0,
  y: 0,
  zoom: 1,
};

// Define valid connections between different AWS services
const validConnections: Record<string, string[]> = {
  'EC2 Instance': [
    'RDS Database',
    'DynamoDB Table',
    'ElastiCache Cluster',
    'S3 Bucket',
    'EFS File System',
    'Security Group',
    'Load Balancer',
    'SQS Queue',
    'SNS Topic',
    'Lambda Function',
    'API Gateway',
    'Internet Gateway'
  ],
  'Auto Scaling Group': [
    'Load Balancer',
    'Security Group',
    'SNS Topic',
    'EC2 Instance'
  ],
  'Lambda Function': [
    'DynamoDB Table',
    'S3 Bucket',
    'SQS Queue',
    'SNS Topic',
    'API Gateway',
    'Security Group',
    'KMS Key'
  ],
  'RDS Database': [
    'Security Group',
    'KMS Key',
    'Subnet'
  ],
  'DynamoDB Table': [
    'Lambda Function',
    'EC2 Instance',
    'KMS Key'
  ],
  'ElastiCache Cluster': [
    'Security Group',
    'Subnet'
  ],
  'VPC': [
    'Subnet',
    'Internet Gateway',
    'Security Group',
    'EC2 Instance',
    'RDS Database',
    'ElastiCache Cluster',
    'Load Balancer'
  ],
  'Subnet': [
    'EC2 Instance',
    'RDS Database',
    'ElastiCache Cluster',
    'Load Balancer',
    'VPC'
  ],
  'Route 53': [
    'Load Balancer',
    'API Gateway',
    'S3 Bucket'
  ],
  'Load Balancer': [
    'EC2 Instance',
    'Auto Scaling Group',
    'Security Group',
    'Subnet'
  ],
  'Security Group': [
    'EC2 Instance',
    'RDS Database',
    'ElastiCache Cluster',
    'Lambda Function',
    'Load Balancer'
  ],
  'IAM Role': [
    'EC2 Instance',
    'Lambda Function',
    'API Gateway'
  ],
  'KMS Key': [
    'S3 Bucket',
    'RDS Database',
    'DynamoDB Table',
    'SQS Queue',
    'SNS Topic',
    'EFS File System'
  ],
  'S3 Bucket': [
    'EC2 Instance',
    'Lambda Function',
    'KMS Key'
  ],
  'EFS File System': [
    'EC2 Instance',
    'Lambda Function',
    'KMS Key'
  ],
  'SQS Queue': [
    'EC2 Instance',
    'Lambda Function',
    'SNS Topic',
    'KMS Key'
  ],
  'SNS Topic': [
    'Lambda Function',
    'SQS Queue',
    'EC2 Instance'
  ],
  'Internet Gateway': [
    'VPC',
    'EC2 Instance'
  ],
  'API Gateway': [
    'Lambda Function',
    'EC2 Instance',
    'IAM Role'
  ]
};

const initialNodes: Node[] = [
  {
    id: 'vpc-1',
    type: 'default',
    data: {
      label: 'VPC',
      isometric: false,
      properties: getDefaultProperties('VPC'),
    },
    position: { x: 400, y: 200 },
  },
  {
    id: 'igw-1',
    type: 'default',
    data: {
      label: 'Internet Gateway',
      isometric: false,
      properties: getDefaultProperties('Internet Gateway'),
    },
    position: { x: 400, y: 50 },
  },
  {
    id: 'web-sg',
    type: 'default',
    data: {
      label: 'Security Group',
      isometric: false,
      properties: getDefaultProperties('Security Group'),
    },
    position: { x: 200, y: 200 },
  },
  {
    id: 'db-sg',
    type: 'default',
    data: {
      label: 'Security Group',
      isometric: false,
      properties: getDefaultProperties('Security Group'),
    },
    position: { x: 600, y: 200 },
  },
  {
    id: 'web-1',
    type: 'default',
    data: {
      label: 'EC2 Instance',
      isometric: false,
      properties: getDefaultProperties('EC2 Instance'),
    },
    position: { x: 200, y: 350 },
  },
  {
    id: 'web-2',
    type: 'default',
    data: {
      label: 'EC2 Instance',
      isometric: false,
      properties: getDefaultProperties('EC2 Instance'),
    },
    position: { x: 400, y: 350 },
  },
  {
    id: 'db-1',
    type: 'default',
    data: {
      label: 'RDS Database',
      isometric: false,
      properties: getDefaultProperties('RDS Database'),
    },
    position: { x: 600, y: 350 },
  },
  {
    id: 'storage-1',
    type: 'default',
    data: {
      label: 'S3 Bucket',
      isometric: false,
      properties: getDefaultProperties('S3 Bucket'),
    },
    position: { x: 300, y: 500 },
  },
];

const initialEdges: Edge[] = [
  // VPC connections
  {
    id: 'vpc-igw',
    source: 'vpc-1',
    target: 'igw-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // Security group connections
  {
    id: 'web-sg-web1',
    source: 'web-sg',
    target: 'web-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  {
    id: 'web-sg-web2',
    source: 'web-sg',
    target: 'web-2',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  {
    id: 'db-sg-db1',
    source: 'db-sg',
    target: 'db-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // Web to DB connections
  {
    id: 'web1-db',
    source: 'web-1',
    target: 'db-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  {
    id: 'web2-db',
    source: 'web-2',
    target: 'db-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // Storage connections
  {
    id: 'web1-s3',
    source: 'web-1',
    target: 'storage-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  {
    id: 'web2-s3',
    source: 'web-2',
    target: 'storage-1',
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
];

export const CloudArchitecture = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isometric, setIsometric] = useState(false);
  const [currentDesignId, setCurrentDesignId] = useState<string>();
  const [currentVersion, setCurrentVersion] = useState(1);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const buttonBg = useColorModeValue('white', 'gray.700');
  const buttonTextColor = useColorModeValue('gray.800', 'white');
  const buttonBorderColor = useColorModeValue('gray.200', 'gray.600');

  // Auto-save functionality
  useEffect(() => {
    if (!currentDesignId) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

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

      localStorage.setItem(
        `${STORAGE_KEYS.DESIGN_PREFIX}${currentDesignId}`,
        JSON.stringify(design)
      );

      setCurrentVersion((v) => v + 1);

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
        data: {
          label: type,
          isometric,
          properties: getDefaultProperties(type),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, isometric]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleUpdateProperties = useCallback((nodeId: string, properties: ElementProperties) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                properties,
              },
            }
          : node
      )
    );
  }, [setNodes]);

  const handleLoadDesign = useCallback((design: CloudDesign) => {
    // Ensure all nodes have properties
    const nodesWithProperties = design.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        properties: node.data.properties || getDefaultProperties(node.data.label),
      },
    }));

    setNodes(nodesWithProperties);
    setEdges(design.edges);
    setCurrentDesignId(design.id);
    setCurrentVersion(design.version);
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  // Update all nodes with isometric prop
  const nodesWithIsometric = nodes.map(node => ({
    ...node,
    data: { ...node.data, isometric },
  }));

  return (
    <Box display="flex" flexDir="column" h="100%" bg={bgColor}>
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
          <CloudComponentsSidebar />
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
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            style={flowStyles}
            defaultViewport={defaultViewport}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            deleteKeyCode="Delete"
            selectionKeyCode="Shift"
            multiSelectionKeyCode="Control"
            zoomActivationKeyCode="Meta"
            panActivationKeyCode="Space"
            className="react-flow-no-node-borders"
          >
            <Background gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </Box>
        <PropertiesPanel
          selectedNode={selectedNode}
          onUpdateProperties={handleUpdateProperties}
        />
      </Box>
    </Box>
  );
};

export default CloudArchitecture;
