import type { ResourceType } from '../../../../types/providers';
import { auroraCluster } from './aurora';
import { dynamodbTable } from './dynamodb';
import { elasticacheCluster } from './elasticache';
import { rdsInstance } from './rds';

export const databaseResources: ResourceType[] = [
  rdsInstance,
  auroraCluster,
  dynamodbTable,
  elasticacheCluster,
];
