import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Login/page';
import BuscarCuentaPage from './Login/buscarCuenta/page';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;