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
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const IconComponent = iconMap[data.label as keyof typeof iconMap];

  const transform = data.isometric ? 'rotateX(45deg) rotateZ(45deg)' : 'none';
  const depth = data.isometric ? '30px' : '0';

  return (
    <Box position="relative" sx={{ '.react-flow__handle': { opacity: 0.7, backgroundColor: borderColor, width: '10px', height: '10px' } }}>
      {/* Main node */}
      <Box
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        minWidth="150px"
        boxShadow="sm"
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s ease-in-out',
        }}
        _hover={{
          boxShadow: 'lg',
          transform: data.isometric ? 'rotateX(45deg) rotateZ(45deg) translateZ(5px)' : 'translateY(-2px)',
        }}
      >
        <Box display="flex" alignItems="center" gap={3} justifyContent="center">
          {IconComponent && <IconComponent size={24} />}
          <Text fontSize="sm" fontWeight="medium">{data.label}</Text>
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
              bg={bg}
              borderLeft="1px solid"
              borderRight="1px solid"
              borderBottom="1px solid"
              borderColor={borderColor}
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
              bg={bg}
              borderTop="1px solid"
              borderRight="1px solid"
              borderBottom="1px solid"
              borderColor={borderColor}
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
