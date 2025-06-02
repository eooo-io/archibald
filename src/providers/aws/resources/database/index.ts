import type { ResourceType } from '../../../../types/providers';
import { dynamodbTable } from './dynamodb';
import { elasticacheCluster } from './elasticache';
import { rdsInstance } from './rds';

export const databaseResources: ResourceType[] = [
  rdsInstance,
  dynamodbTable,
  elasticacheCluster,
];
