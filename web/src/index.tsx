import React from 'react';
import ReactDOM from 'react-dom/client';
import { Application } from './Application';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Application />
  </ChakraProvider>
  </React.StrictMode>
);
