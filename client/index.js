import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

// uncomment so that webpack can bundle styles
import styles from './style/style.css';

// use react-query across entire application
const queryClient = new QueryClient(); 

const root = document.getElementById('root');

render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>,
  root
);