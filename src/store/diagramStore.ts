import { create } from 'zustand';
import type { CloudComponent, Connection, DiagramData } from '../types/CloudComponents';

interface DiagramStore {
  diagrams: DiagramData[];
  currentDiagram: DiagramData | null;
  selectedComponent: CloudComponent | null;
  
  // Actions
  createDiagram: (name: string, description?: string) => void;
  addComponent: (component: Omit<CloudComponent, 'id'>) => void;
  updateComponent: (id: string, updates: Partial<CloudComponent>) => void;
  removeComponent: (id: string) => void;
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  removeConnection: (id: string) => void;
  setCurrentDiagram: (id: string) => void;
  setSelectedComponent: (component: CloudComponent | null) => void;
}

export const useDiagramStore = create<DiagramStore>((set) => ({
  diagrams: [],
  currentDiagram: null,
  selectedComponent: null,

  createDiagram: (name, description) => {
    const newDiagram: DiagramData = {
      id: crypto.randomUUID(),
      name,
      description,
      components: [],
      connections: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      diagrams: [...state.diagrams, newDiagram],
      currentDiagram: newDiagram,
    }));
  },

  addComponent: (component) => {
    set((state) => {
      if (!state.currentDiagram) return state;

      const newComponent = {
        ...component,
        id: crypto.randomUUID(),
      };

      const updatedDiagram = {
        ...state.currentDiagram,
        components: [...state.currentDiagram.components, newComponent],
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentDiagram: updatedDiagram,
        diagrams: state.diagrams.map((d) =>
          d.id === updatedDiagram.id ? updatedDiagram : d
        ),
      };
    });
  },

  updateComponent: (id, updates) => {
    set((state) => {
      if (!state.currentDiagram) return state;

      const updatedComponents = state.currentDiagram.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      );

      const updatedDiagram = {
        ...state.currentDiagram,
        components: updatedComponents,
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentDiagram: updatedDiagram,
        diagrams: state.diagrams.map((d) =>
          d.id === updatedDiagram.id ? updatedDiagram : d
        ),
      };
    });
  },

  removeComponent: (id) => {
    set((state) => {
      if (!state.currentDiagram) return state;

      const updatedDiagram = {
        ...state.currentDiagram,
        components: state.currentDiagram.components.filter((c) => c.id !== id),
        connections: state.currentDiagram.connections.filter(
          (conn) => conn.source !== id && conn.target !== id
        ),
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentDiagram: updatedDiagram,
        diagrams: state.diagrams.map((d) =>
          d.id === updatedDiagram.id ? updatedDiagram : d
        ),
      };
    });
  },

  addConnection: (connection) => {
    set((state) => {
      if (!state.currentDiagram) return state;

      const newConnection = {
        ...connection,
        id: crypto.randomUUID(),
      };

      const updatedDiagram = {
        ...state.currentDiagram,
        connections: [...state.currentDiagram.connections, newConnection],
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentDiagram: updatedDiagram,
        diagrams: state.diagrams.map((d) =>
          d.id === updatedDiagram.id ? updatedDiagram : d
        ),
      };
    });
  },

  removeConnection: (id) => {
    set((state) => {
      if (!state.currentDiagram) return state;

      const updatedDiagram = {
        ...state.currentDiagram,
        connections: state.currentDiagram.connections.filter((c) => c.id !== id),
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentDiagram: updatedDiagram,
        diagrams: state.diagrams.map((d) =>
          d.id === updatedDiagram.id ? updatedDiagram : d
        ),
      };
    });
  },

  setCurrentDiagram: (id) => {
    set((state) => ({
      currentDiagram: state.diagrams.find((d) => d.id === id) || null,
    }));
  },

  setSelectedComponent: (component) => {
    set({ selectedComponent: component });
  },
})); 