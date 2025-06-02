import { Box } from '@chakra-ui/react';
import { useCallback } from 'react';
import type { Connection, Edge, Node } from 'reactflow';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDiagramStore } from '../store/diagramStore';
import CloudComponentNode from './CloudComponentNode';

const nodeTypes = {
  cloudComponent: CloudComponentNode,
};

const DiagramCanvas = () => {
  const { currentDiagram, addConnection, removeConnection } = useDiagramStore();

  // Convert our components to ReactFlow nodes
  const initialNodes: Node[] = currentDiagram?.components.map((component) => ({
    id: component.id,
    type: 'cloudComponent',
    position: component.properties.position || { x: 0, y: 0 },
    data: component,
  })) || [];

  // Convert our connections to ReactFlow edges
  const initialEdges: Edge[] = currentDiagram?.connections.map((connection) => ({
    id: connection.id,
    source: connection.source,
    target: connection.target,
    label: connection.label,
    type: 'smoothstep',
    data: connection.properties,
  })) || [];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        addConnection({
          source: connection.source,
          target: connection.target,
          type: 'default',
          label: '',
        });
      }
    },
    [addConnection]
  );

  const onEdgesDelete = useCallback(
    (edges: Edge[]) => {
      edges.forEach((edge) => removeConnection(edge.id));
    },
    [removeConnection]
  );

  return (
    <Box width="100%" height="100vh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};

export default DiagramCanvas; 