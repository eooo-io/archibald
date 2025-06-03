import type { ResourceType } from '../../../../types/providers';
import { autoScalingGroup } from './asg';

export const computeResources: ResourceType[] = [
  autoScalingGroup,
];
