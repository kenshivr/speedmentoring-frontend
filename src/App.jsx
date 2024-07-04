import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Navbar_m from "./components/Layout/Navbar_mentor";
import Navbar_s from "./components/Layout/Navbar_student";
import Navbar_admin from "./components/Layout/Navbar_admin";

import LoginPage from './Login/page';
import MentorPage from './Mentor/page';
import MentorPerfil from './Mentor/perfil/page';
import MentorSesiones from './Mentor/sesiones/page';
import MentorSesiones1 from './Mentor/sesiones/1/page';
import MentorChangePassword from './Mentor/perfil/changePassword/page';

import BuscarCuentaPage from './Login/buscarCuenta/page';

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');

  // Obtener la ruta actual
  const location = useLocation();

  // Funcion para determinar si se muestra la barra navegadora
  const showNavbar = () => {
    // Mostrar la navbar si el usuario no esta en la pagina login
    return location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/login/buscarCuenta';
  };

  // Almacenar el userId en localStorage cuando se establece 
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Escuchar cambios en userId y actualizar localstorage
  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <>
      <Header />
      
      {showNavbar() && (
        user === 'admin' ? (
          <Navbar_admin />
        ) : user === 'student' ? (
          <Navbar_s />
        ) : user === 'mentor' ? (
          <Navbar_m />
        ) : (
          <></>
        )
      )}

      <Routes>

        <Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} />} />
        <Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />

        <Route path="/Mentor" element={<MentorPage />} />
        <Route path="/Mentor/perfil/page" element={<MentorPerfil userId={userId} />} /> 
        <Route path="/Mentor/sesiones/page" element={<MentorSesiones />} /> 
        <Route path="/Mentor/sesiones/1/page" element={<MentorSesiones1 />} /> 
        <Route path="/Mentor/perfil/changePassword/page" element={<MentorChangePassword />} /> 

      </Routes>
      
      <Footer />
    </>
  );
}

export default App;