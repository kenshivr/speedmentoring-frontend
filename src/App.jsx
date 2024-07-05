import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import NavbarMentor from "./components/Layout/Navbar_mentor";
import NavbarStudent from "./components/Layout/Navbar_student";
import NavbarAdmin from "./components/Layout/Navbar_admin";

import LoginPage from './Login/page';
import BuscarCuentaPage from './Login/buscarCuenta/page';

import MentorPage from './Mentor/page';
import MentorPerfil from './Mentor/perfil/page';
import MentorSesiones from './Mentor/sesiones/page';
import MentorSesiones1 from './Mentor/sesiones/1/page';
import MentorChangePassword from './Mentor/perfil/changePassword/page';

import EstudiantePage from './Estudiante/page';
import EstudianteEvento from './Estudiante/eventos/page';
import EstudiantePerfil from './Estudiante/perfil/page';
import EstudianteSesiones from './Estudiante/sesiones/page';
import EstudianteSesiones1 from './Estudiante/sesiones/1/page';

import AdminPage from './Admin/page';
import AdminEstadisticas from './Admin/estadisticas/page';
import AdminReporte from './Admin/reporte/page';
import AdminUsuarios from './Admin/usuarios/page';
import AdminAgregarUsuario from './Admin/usuarios/newUser/page';

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('RFC1234567890');

  return (
    <>
      <Header />
      
      {(
        user === 'admin' ? (
          <NavbarAdmin />
        ) : user === 'student' ? (
          <NavbarStudent />
        ) : user === 'mentor' ? (
          <NavbarMentor />
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

        <Route path="/Estudiante" element={<EstudiantePage />} />
        <Route path="/Estudiante/eventos/page" element={<EstudianteEvento />} />
        <Route path="/Estudiante/perfil/page" element={<EstudiantePerfil />} />
        <Route path="/Estudiante/sesiones/page" element={<EstudianteSesiones />} />
        <Route path="/Estudiante/sesiones/page/1" element={<EstudianteSesiones1 />} />

        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Admin/estadisticas/page" element={<AdminEstadisticas />} />
        <Route path="/Admin/reporte/page" element={<AdminReporte />} />
        <Route path="/Admin/usuarios/page" element={<AdminUsuarios />} />
        <Route path="/Admin/usuarios/NewUser/page" element={<AdminAgregarUsuario />} />

      </Routes>
      
      <Footer />
    </>
  );
}

export default App;