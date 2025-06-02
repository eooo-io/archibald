import type { CloudProvider } from '../../types/providers';
import { computeResources } from './resources/compute';
import { databaseResources } from './resources/database';
import { networkingResources } from './resources/networking';
import { securityResources } from './resources/security';
import { storageResources } from './resources/storage';

export const AWSProvider: CloudProvider = {
  id: 'aws',
  name: 'Amazon Web Services',
  description: 'Amazon Web Services (AWS) cloud provider',
  icon: '/icons/aws.svg',
  version: '1.0.0',
  categories: [
    {
      id: 'compute',
      name: 'Compute',
      resources: computeResources,
    },
    {
      id: 'networking',
      name: 'Networking & Content Delivery',
      resources: networkingResources,
    },
    {
      id: 'storage',
      name: 'Storage',
      resources: storageResources,
    },
    {
      id: 'database',
      name: 'Database',
      resources: databaseResources,
    },
    {
      id: 'security',
      name: 'Security, Identity & Compliance',
      resources: securityResources,
    },
  ],
  resourceTypes: [
    ...computeResources,
    ...networkingResources,
    ...storageResources,
    ...databaseResources,
    ...securityResources,
  ],
  defaultRegion: 'us-east-1',
  regions: [
    { id: 'us-east-1', name: 'US East (N. Virginia)', location: 'North Virginia' },
    { id: 'us-west-2', name: 'US West (Oregon)', location: 'Oregon' },
    { id: 'eu-west-1', name: 'EU West (Ireland)', location: 'Ireland' },
    // Add more regions as needed
  ],
  validateCredentials: async (credentials) => {
    // Implement AWS credentials validation
    return true;
  },
  getResourcePrice: async (resourceType, config) => {
    // Implement AWS pricing calculation
    return 0;
  },
};
