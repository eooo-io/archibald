import type { ComponentType } from 'react';

export interface ResourceProps {
  id: string;
  type: string;
  config: Record<string, unknown>;
}

export interface ResourceType {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  component: ComponentType<ResourceProps>;
}

export interface CloudProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  categories: {
    id: string;
    name: string;
    resources: ResourceType[];
  }[];
  resourceTypes: ResourceType[];
  defaultRegion?: string;
  regions?: {
    id: string;
    name: string;
    location: string;
  }[];
  validateCredentials: (credentials: ProviderCredentials) => Promise<boolean>;
  getResourcePrice?: (resourceType: string, config: Record<string, unknown>) => Promise<number>;
}

export interface ProviderCredentials {
  provider: string;
  [key: string]: unknown;
}

export interface ProviderRegion {
  id: string;
  name: string;
  location: string;
  provider: string;
}
