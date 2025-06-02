import { Box, Icon, Text } from '@chakra-ui/react';
import type { CloudProvider, ComponentCategory } from '../types/CloudComponents';
import { getCloudIcon } from '../utils/cloudIcons';

interface PaletteItemProps {
  provider: CloudProvider;
  type: string;
  category: ComponentCategory;
  onDragStart: (event: React.DragEvent) => void;
}

const PaletteItem = ({ provider, type, onDragStart }: PaletteItemProps) => {
  return (
    <Box
      draggable
      onDragStart={onDragStart}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={2}
      cursor="grab"
      _hover={{ shadow: 'md' }}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Icon as={getCloudIcon(provider)} boxSize={5} />
      <Text fontSize="sm">{type}</Text>
    </Box>
  );
};

const ComponentPalette = () => {
  const handleDragStart = (event: React.DragEvent, item: { provider: CloudProvider; type: string; category: ComponentCategory }) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  };

  const components = [
    { provider: 'AWS', type: 'EC2 Instance', category: 'Compute' },
    { provider: 'AWS', type: 'S3 Bucket', category: 'Storage' },
    { provider: 'GCP', type: 'Compute Engine', category: 'Compute' },
    { provider: 'GCP', type: 'Cloud Storage', category: 'Storage' },
    { provider: 'OpenShift', type: 'Container', category: 'Container' },
    { provider: 'Azure', type: 'Virtual Machine', category: 'Compute' },
    { provider: 'Azure', type: 'Blob Storage', category: 'Storage' },
  ] as const;

  return (
    <Box
      position="fixed"
      left={4}
      top={4}
      bg="white"
      borderRadius="lg"
      shadow="lg"
      p={4}
      maxHeight="calc(100vh - 32px)"
      overflowY="auto"
    >
      <Text fontWeight="bold" mb={4}>
        Components
      </Text>
      <Box display="flex" flexDirection="column" gap={2}>
        {components.map((item) => (
          <PaletteItem
            key={`${item.provider}-${item.type}`}
            provider={item.provider}
            type={item.type}
            category={item.category}
            onDragStart={(e) => handleDragStart(e, item)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ComponentPalette; 