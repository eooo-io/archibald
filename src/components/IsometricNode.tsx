import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import {
    FaCloud,
    FaDatabase,
    FaNetworkWired,
    FaServer,
    FaShieldAlt,
} from 'react-icons/fa';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

const iconMap = {
  'EC2 Instance': FaServer,
  'RDS Database': FaDatabase,
  'VPC': FaNetworkWired,
  'Security Group': FaShieldAlt,
  'S3 Bucket': FaCloud,
  'Internet Gateway': FaNetworkWired,
};

interface IsometricNodeData {
  label: string;
  isometric: boolean;
}

const IsometricNode = ({ data, isConnectable }: NodeProps<IsometricNodeData>) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('transparent', 'gray.800');
  const IconComponent = iconMap[data.label as keyof typeof iconMap];

  const transform = data.isometric ? 'rotateX(45deg) rotateZ(45deg)' : 'none';
  const depth = data.isometric ? '30px' : '0';

  return (
    <Box position="relative" sx={{ '.react-flow__handle': { opacity: 0.7, backgroundColor: borderColor, width: '10px', height: '10px' } }}>
      {/* Main node */}
      <Box
        p={4}
        minWidth="150px"
        border="1px solid"
        borderColor={borderColor}
        bg={bgColor}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s ease-in-out',
        }}
        _hover={{
          transform: data.isometric ? 'rotateX(45deg) rotateZ(45deg) translateZ(5px)' : 'translateY(-2px)',
        }}
      >
        <Box display="flex" alignItems="center" gap={3} justifyContent="center">
          {IconComponent && <Box color={textColor}><IconComponent size={24} /></Box>}
          <Text fontSize="sm" fontWeight="medium" color={textColor}>{data.label}</Text>
        </Box>

        {/* Isometric side panels */}
        {data.isometric && (
          <>
            <Box
              position="absolute"
              top="100%"
              left={0}
              width="100%"
              height={depth}
              borderLeft="1px solid"
              borderRight="1px solid"
              borderBottom="1px solid"
              borderColor={borderColor}
              bg={bgColor}
              style={{
                transform: 'rotateX(-90deg)',
                transformOrigin: 'top',
              }}
            />
            <Box
              position="absolute"
              top={0}
              left="100%"
              width={depth}
              height="100%"
              borderTop="1px solid"
              borderRight="1px solid"
              borderBottom="1px solid"
              borderColor={borderColor}
              bg={bgColor}
              style={{
                transform: 'rotateY(90deg)',
                transformOrigin: 'left',
              }}
            />
          </>
        )}
      </Box>

      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </Box>
  );
};

export default IsometricNode;
