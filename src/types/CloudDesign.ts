import type { Edge, Node } from 'reactflow';

export interface CloudDesign {
  id: string;
  name: string;
  description?: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
  version: number;
  isAutosaved?: boolean;
}

export interface CloudDesignVersion {
  version: number;
  nodes: Node[];
  edges: Edge[];
  timestamp: string;
  description?: string;
}

export interface CloudDesignMetadata {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  currentVersion: number;
}

export const STORAGE_KEYS = {
  DESIGNS_LIST: 'cloud-architecture-designs',
  CURRENT_DESIGN: 'cloud-architecture-current-design',
  DESIGN_PREFIX: 'cloud-architecture-design-',
  VERSION_PREFIX: 'cloud-architecture-version-',
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
} as const;
