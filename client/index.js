import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// uncomment so that webpack can bundle styles
import styles from './style/style.scss';

render(
  <App />,
  document.getElementById('root')
);