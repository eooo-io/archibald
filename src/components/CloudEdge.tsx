import { useColorModeValue } from '@chakra-ui/react';
import type { EdgeProps } from 'reactflow';
import { getBezierPath } from 'reactflow';

const CloudEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const edgeColor = useColorModeValue('gray.600', 'gray.400');
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={{
        ...style,
        strokeWidth: 2,
        stroke: `var(--chakra-colors-${edgeColor.replace('.', '-')})`,
      }}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default CloudEdge;
