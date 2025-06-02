import { CloudProvider } from '../types/providers';

// Provider registrations will be imported here
import { AWSProvider } from './aws';
import { AzureProvider } from './azure';
import { GCPProvider } from './gcp';
import { OpenShiftProvider } from './openshift';

export const availableProviders: CloudProvider[] = [
  AWSProvider,
  GCPProvider,
  AzureProvider,
  OpenShiftProvider,
];

export * from './aws';
export * from './azure';
export * from './gcp';
export * from './openshift';
