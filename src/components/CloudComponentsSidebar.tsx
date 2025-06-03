import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Icon,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import type { IconType } from 'react-icons';
import { FaAws, FaCloud, FaDatabase } from 'react-icons/fa';
import {
    MdApi,
    MdAutoAwesome,
    MdBalance,
    MdCloud,
    MdComputer,
    MdDataset,
    MdDns,
    MdFolder,
    MdLock,
    MdMemory,
    MdMessage,
    MdNetworkCheck,
    MdQueue,
    MdRouter,
    MdSecurity,
    MdStorage,
    MdSwapHoriz,
    MdVpnKey,
    MdWebAsset
} from 'react-icons/md';
import { SiGooglecloud, SiRedhatopenshift } from 'react-icons/si';

type AWSService =
    | 'EC2 Instance'
    | 'Auto Scaling Group'
    | 'Lambda Function'
    | 'RDS Database'
    | 'DynamoDB Table'
    | 'ElastiCache Cluster'
    | 'VPC'
    | 'Subnet'
    | 'Route 53'
    | 'Load Balancer'
    | 'Security Group'
    | 'IAM Role'
    | 'KMS Key'
    | 'S3 Bucket'
    | 'EFS File System'
    | 'SQS Queue'
    | 'SNS Topic'
    | 'Internet Gateway'
    | 'API Gateway';

type ServiceCategory =
    | 'Compute'
    | 'Database'
    | 'Networking'
    | 'Security'
    | 'Storage'
    | 'Integration'
    | 'Gateway'
    | 'Container';

// AWS Service Icons
const awsIcons: Record<AWSService, IconType> = {
    'EC2 Instance': MdComputer,
    'Auto Scaling Group': MdAutoAwesome,
    'Lambda Function': MdMemory,
    'RDS Database': MdDataset,
    'DynamoDB Table': MdDataset,
    'ElastiCache Cluster': MdDataset,
    'VPC': MdCloud,
    'Subnet': MdRouter,
    'Route 53': MdDns,
    'Load Balancer': MdBalance,
    'Security Group': MdSecurity,
    'IAM Role': MdLock,
    'KMS Key': MdVpnKey,
    'S3 Bucket': MdFolder,
    'EFS File System': MdStorage,
    'SQS Queue': MdQueue,
    'SNS Topic': MdMessage,
    'Internet Gateway': MdRouter,
    'API Gateway': MdApi
};

// Category Icons
const categoryIcons: Record<ServiceCategory, IconType> = {
    'Compute': MdAutoAwesome,
    'Database': FaDatabase,
    'Networking': MdNetworkCheck,
    'Security': MdLock,
    'Storage': MdStorage,
    'Integration': MdSwapHoriz,
    'Gateway': MdWebAsset,
    'Container': MdStorage
};

// Define providers and their components
const cloudProviders = {
    AWS: {
        icon: FaAws,
        services: {
            'Compute': [
                'EC2 Instance',
                'Auto Scaling Group',
                'Lambda Function'
            ],
            'Database': [
                'RDS Database',
                'DynamoDB Table',
                'ElastiCache Cluster'
            ],
            'Networking': [
                'VPC',
                'Subnet',
                'Route 53',
                'Load Balancer'
            ],
            'Security': [
                'Security Group',
                'IAM Role',
                'KMS Key'
            ],
            'Storage': [
                'S3 Bucket',
                'EFS File System'
            ],
            'Integration': [
                'SQS Queue',
                'SNS Topic'
            ],
            'Gateway': [
                'Internet Gateway',
                'API Gateway'
            ]
        }
    },
    GCP: {
        icon: SiGooglecloud,
        services: {
            'Compute': [
                'Compute Engine',
                'Cloud Functions',
                'Cloud Run'
            ],
            'Storage': [
                'Cloud Storage',
                'Persistent Disk',
                'Filestore'
            ],
            'Database': [
                'Cloud SQL',
                'Cloud Spanner',
                'Cloud Bigtable'
            ]
        }
    },
    Azure: {
        icon: FaCloud,
        services: {
            'Compute': [
                'Virtual Machines',
                'App Service',
                'Functions'
            ],
            'Storage': [
                'Blob Storage',
                'File Storage',
                'Disk Storage'
            ],
            'Database': [
                'SQL Database',
                'Cosmos DB',
                'Database for MySQL'
            ]
        }
    },
    OpenShift: {
        icon: SiRedhatopenshift,
        services: {
            'Container': [
                'Pods',
                'Deployments',
                'Services'
            ],
            'Storage': [
                'Persistent Volumes',
                'Storage Classes'
            ],
            'Networking': [
                'Routes',
                'Network Policies'
            ]
        }
    }
};

export const CloudComponentsSidebar: React.FC = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const itemBgColor = useColorModeValue('gray.50', 'gray.700');
    const itemHoverBgColor = useColorModeValue('gray.100', 'gray.600');
    const accordionBg = useColorModeValue('gray.50', 'gray.700');
    const iconColor = useColorModeValue('blue.500', 'blue.200');

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const renderServiceItem = (service: string, provider: string) => {
        const isAWS = provider === 'AWS';
        const ServiceIcon = isAWS ? awsIcons[service as AWSService] : null;

        return (
            <Box
                key={service}
                p={2}
                bg={itemBgColor}
                borderRadius="md"
                border="1px solid"
                borderColor={borderColor}
                cursor="grab"
                _hover={{ bg: itemHoverBgColor }}
                draggable
                onDragStart={(e) => onDragStart(e, service)}
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
            >
                {isAWS && ServiceIcon && (
                    <Icon
                        as={ServiceIcon}
                        boxSize={5}
                        color={iconColor}
                    />
                )}
                <span>{service}</span>
            </Box>
        );
    };

    return (
        <Box
            h="calc(100vh - 160px)"
            overflowY="auto"
            bg={bgColor}
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('gray.300', 'gray.600'),
                    borderRadius: '24px',
                },
            }}
        >
            <Accordion allowMultiple defaultIndex={[0]}>
                {Object.entries(cloudProviders).map(([provider, { icon: ProviderIcon, services }]) => (
                    <AccordionItem key={provider} border="0">
                        <AccordionButton
                            py={2}
                            _hover={{ bg: accordionBg }}
                            _expanded={{ bg: accordionBg }}
                        >
                            <Box flex="1" display="flex" alignItems="center">
                                <Icon as={ProviderIcon} boxSize={5} mr={2} color={iconColor} />
                                {provider}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4} px={2}>
                            <Accordion allowMultiple>
                                {Object.entries(services).map(([category, items]) => (
                                    <AccordionItem key={category} border="0">
                                        <AccordionButton
                                            py={2}
                                            _hover={{ bg: accordionBg }}
                                            _expanded={{ bg: accordionBg }}
                                        >
                                            <Box flex="1" textAlign="left" display="flex" alignItems="center">
                                                <Icon as={categoryIcons[category as ServiceCategory]} boxSize={4} mr={2} color={iconColor} />
                                                {category}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={2}>
                                            <VStack spacing={2} align="stretch">
                                                {items.map((service) => renderServiceItem(service, provider))}
                                            </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

export default CloudComponentsSidebar;
