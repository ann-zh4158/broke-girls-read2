import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './components/App';

// uncomment so that webpack can bundle styles
import styles from './style/style.css';

// use react-query across entire application
const queryClient = new QueryClient(); 

const root = createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);