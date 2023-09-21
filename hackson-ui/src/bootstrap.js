import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import config from './config';
import App from './App';


const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={config.basename}>
    <App />
  </BrowserRouter>
);
