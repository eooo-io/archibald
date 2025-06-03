import type { ResourceType } from '../../../../types/providers';
import { auroraCluster } from './aurora';

export const databaseResources: ResourceType[] = [
  auroraCluster,
];
