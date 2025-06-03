import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, VStack } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { FaAws, FaCloud, FaDatabase, FaNetworkWired, FaServer, FaShieldAlt, FaWindows } from 'react-icons/fa';
import { SiGooglecloud, SiRedhatopenshift } from 'react-icons/si';
import type { CloudProviderSettings } from '../types/Settings';

interface CloudComponentsSidebarProps {
  settings: CloudProviderSettings;
}

const awsComponents = [
  { label: 'EC2 Instance', icon: FaServer },
  { label: 'RDS Database', icon: FaDatabase },
  { label: 'VPC', icon: FaNetworkWired },
  { label: 'Security Group', icon: FaShieldAlt },
  { label: 'S3 Bucket', icon: FaCloud },
  { label: 'Internet Gateway', icon: FaNetworkWired },
];

const gcpComponents = [
  // Add GCP components here when needed
];

const azureComponents = [
  // Add Azure components here when needed
];

const openshiftComponents = [
  // Add OpenShift components here when needed
];

export const CloudComponentsSidebar = ({ settings }: CloudComponentsSidebarProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const renderCloudComponents = (components: { label: string; icon: IconType }[]) => {
    return components.map((component) => {
      const Icon = component.icon;
      return (
        <Box
          key={component.label}
          p={3}
          bg="white"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          cursor="grab"
          _hover={{ shadow: 'md' }}
          draggable
          onDragStart={(event) => onDragStart(event, component.label)}
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Icon size={20} />
          <Text fontSize="sm">{component.label}</Text>
        </Box>
      );
    });
  };

  return (
    <Box p={4}>
      <Accordion allowMultiple defaultIndex={[0]}>
        {settings.aws && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: 'gray.100' }}>
              <Box flex="1" display="flex" alignItems="center" gap={2}>
                <FaAws />
                <Text fontWeight="medium">AWS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={2} align="stretch">
                {renderCloudComponents(awsComponents)}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        )}

        {settings.gcp && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: 'gray.100' }}>
              <Box flex="1" display="flex" alignItems="center" gap={2}>
                <SiGooglecloud />
                <Text fontWeight="medium">Google Cloud</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Coming soon...
              </Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {settings.azure && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: 'gray.100' }}>
              <Box flex="1" display="flex" alignItems="center" gap={2}>
                <FaWindows />
                <Text fontWeight="medium">Azure</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Coming soon...
              </Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {settings.openshift && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: 'gray.100' }}>
              <Box flex="1" display="flex" alignItems="center" gap={2}>
                <SiRedhatopenshift />
                <Text fontWeight="medium">OpenShift</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Coming soon...
              </Text>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </Box>
  );
};

export default CloudComponentsSidebar;
