import { Box, Icon, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { CloudComponent } from '../types/CloudComponents';
import { getCloudIcon } from '../utils/cloudIcons';

interface CloudComponentNodeProps {
  data: CloudComponent;
  selected: boolean;
}

const CloudComponentNode = memo(({ data, selected }: CloudComponentNodeProps) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={selected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      p={2}
      minWidth="150px"
      boxShadow={selected ? 'lg' : 'md'}
    >
      <Handle type="target" position={Position.Top} />
      <Box display="flex" alignItems="center" mb={2}>
        <Icon as={getCloudIcon(data.provider)} boxSize={6} mr={2} />
        <Text fontWeight="bold" fontSize="sm">
          {data.name}
        </Text>
      </Box>
      {data.description && (
        <Text fontSize="xs" color="gray.600">
          {data.description}
        </Text>
      )}
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
});

CloudComponentNode.displayName = 'CloudComponentNode';

export default CloudComponentNode; 