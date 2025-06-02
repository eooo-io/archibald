import type { ResourceType } from '../../../../types/providers';
import { iamRole } from './iam-role';
import { iamUser } from './iam-user';
import { kmsKey } from './kms';
import { wafWebACL } from './waf';

export const securityResources: ResourceType[] = [
  iamRole,
  iamUser,
  kmsKey,
  wafWebACL,
];
