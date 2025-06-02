import type { ResourceType } from '../../../../types/providers';
import { snsTopic } from './sns';
import { sqsQueue } from './sqs';

export const integrationResources: ResourceType[] = [
  snsTopic,
  sqsQueue,
];
