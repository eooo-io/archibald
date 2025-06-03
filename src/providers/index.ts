import type { CloudProvider } from '../types/providers';
import { awsProvider } from './aws';

// Provider registrations will be imported here

export const providers: Record<string, CloudProvider> = {
  aws: awsProvider,
};

export const availableProviders: CloudProvider[] = [
  awsProvider,
];

export * from './aws';

