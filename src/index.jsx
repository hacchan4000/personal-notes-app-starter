import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './styles/style.css';
import { AppProvider } from './context/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);