import React from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './Layout';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </React.StrictMode>
);