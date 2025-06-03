import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CloudArchitecture from './pages/CloudArchitecture';
import theme from './theme';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Box display="flex" flexDir="column" minH="100vh">
            <Navigation />
            <Box flex="1">
              <Routes>
                <Route path="/" element={<Navigate to="/editor" replace />} />
                <Route path="/editor" element={<CloudArchitecture />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
