export type CloudProvider = 'AWS' | 'GCP' | 'OpenShift' | 'Azure' | 'Custom';

export interface Position {
  x: number;
  y: number;
}

export interface ComponentProperties {
  size?: string;
  region?: string;
  instanceType?: string;
  capacity?: number;
  position?: Position;
  tags?: Record<string, string>;
  [key: string]: string | number | boolean | Record<string, string> | Position | undefined;
}

export interface CloudComponent {
  id: string;
  type: string;
  provider: CloudProvider;
  name: string;
  description?: string;
  icon: string;
  category: string;
  properties: ComponentProperties;
}

export interface ConnectionProperties {
  protocol?: string;
  port?: number;
  encrypted?: boolean;
  bandwidth?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
  properties?: ConnectionProperties;
}

export interface DiagramData {
  id: string;
  name: string;
  description?: string;
  components: CloudComponent[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

export type ComponentCategory =
  | 'Compute'
  | 'Storage'
  | 'Database'
  | 'Network'
  | 'Security'
  | 'Analytics'
  | 'Container'
  | 'Serverless'
  | 'Custom'; 