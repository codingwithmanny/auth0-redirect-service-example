// Imports
// ========================================================
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './providers';
import Routes from './routes';

// Main Render
// ========================================================
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>
);