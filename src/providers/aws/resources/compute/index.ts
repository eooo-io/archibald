import type { ResourceType } from '../../../../types/providers';
import { ec2Instance } from './ec2';
import { eksCluster } from './eks';
import { lambdaFunction } from './lambda';

export const computeResources: ResourceType[] = [
  ec2Instance,
  lambdaFunction,
  eksCluster,
];
