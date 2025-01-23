import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/Router.jsx';
import { AuthProvider } from './contexts/AuthContext'; // Importa AuthProvider
import './Index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve la aplicación con AuthProvider */}
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>
);