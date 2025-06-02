import type { ResourceType } from '../../../../types/providers';
import { autoScalingGroup } from './asg';
import { ec2Instance } from './ec2';
import { eksCluster } from './eks';
import { lambdaFunction } from './lambda';

export const computeResources: ResourceType[] = [
  ec2Instance,
  autoScalingGroup,
  lambdaFunction,
  eksCluster,
];
