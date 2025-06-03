import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const accordionHoverBg = useColorModeValue('gray.100', 'gray.700');
  const comingSoonColor = useColorModeValue('gray.500', 'gray.400');

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
          bg={bgColor}
          borderRadius="md"
          border="1px solid"
          borderColor={borderColor}
          cursor="grab"
          _hover={{ shadow: 'md', bg: hoverBg }}
          draggable
          onDragStart={(event) => onDragStart(event, component.label)}
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Box color={textColor}>
            <Icon size={20} />
          </Box>
          <Text fontSize="sm" color={textColor}>{component.label}</Text>
        </Box>
      );
    });
  };

  return (
    <Box p={4}>
      <Accordion allowMultiple defaultIndex={[0]}>
        {settings.aws && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: accordionHoverBg }}>
              <Box flex="1" display="flex" alignItems="center" gap={2} color={textColor}>
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
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: accordionHoverBg }}>
              <Box flex="1" display="flex" alignItems="center" gap={2} color={textColor}>
                <SiGooglecloud />
                <Text fontWeight="medium">Google Cloud</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color={comingSoonColor} textAlign="center">
                Coming soon...
              </Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {settings.azure && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: accordionHoverBg }}>
              <Box flex="1" display="flex" alignItems="center" gap={2} color={textColor}>
                <FaWindows />
                <Text fontWeight="medium">Azure</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color={comingSoonColor} textAlign="center">
                Coming soon...
              </Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {settings.openshift && (
          <AccordionItem border="none">
            <AccordionButton py={2} px={4} borderRadius="md" _hover={{ bg: accordionHoverBg }}>
              <Box flex="1" display="flex" alignItems="center" gap={2} color={textColor}>
                <SiRedhatopenshift />
                <Text fontWeight="medium">OpenShift</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color={comingSoonColor} textAlign="center">
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
