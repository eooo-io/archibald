import type { ResourceType } from '../../../../types/providers';
import { iamUser } from './iam-user';

export const securityResources: ResourceType[] = [
  iamUser,
];
