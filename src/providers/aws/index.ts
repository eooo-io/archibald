import type { CloudProvider } from '../../types/providers';
import { computeResources } from './resources/compute';
import { databaseResources } from './resources/database';
import { integrationResources } from './resources/integration';
import { networkingResources } from './resources/networking';
import { securityResources } from './resources/security';

export const awsProvider: CloudProvider = {
  id: 'aws',
  name: 'Amazon Web Services',
  description: 'AWS Cloud Provider',
  resources: [
    ...computeResources,
    ...networkingResources,
    ...databaseResources,
    ...securityResources,
    ...integrationResources,
  ],
};
