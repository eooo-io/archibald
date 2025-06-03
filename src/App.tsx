import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CloudArchitecture from './pages/CloudArchitecture';
import theme from './theme';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<CloudArchitecture />} />
            <Route path="/components" element={<div>Components Page</div>} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
