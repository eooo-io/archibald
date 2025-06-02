import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import ComponentPalette from './components/ComponentPalette';
import DiagramCanvas from './components/DiagramCanvas';
import { useDiagramStore } from './store/diagramStore';

function App() {
  const { createDiagram } = useDiagramStore();

  useEffect(() => {
    // Create an initial empty diagram
    createDiagram('New Diagram');
  }, [createDiagram]);

  return (
    <ChakraProvider>
      <ComponentPalette />
      <DiagramCanvas />
    </ChakraProvider>
  );
}

export default App;
