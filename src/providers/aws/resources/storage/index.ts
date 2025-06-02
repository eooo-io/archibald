import type { ResourceType } from '../../../../types/providers';
import { ebsVolume } from './ebs';
import { efsFileSystem } from './efs';
import { s3Bucket } from './s3';

export const storageResources: ResourceType[] = [
  s3Bucket,
  ebsVolume,
  efsFileSystem,
];
