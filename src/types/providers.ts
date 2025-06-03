
export interface ResourceProps {
  id: string;
  config: Record<string, unknown>;
}

export interface ResourceType {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  component: React.FC<ResourceProps>;
}

export interface CloudProvider {
  id: string;
  name: string;
  description: string;
  resources: ResourceType[];
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
