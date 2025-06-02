import type { ResourceType } from '../../../../types/providers';
import { iamRole } from './iam-role';
import { kmsKey } from './kms';
import { wafWebACL } from './waf';

export const securityResources: ResourceType[] = [
  iamRole,
  kmsKey,
  wafWebACL,
];
