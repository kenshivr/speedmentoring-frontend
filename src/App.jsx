import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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

// Componente para la página no encontrada
const NotFound = () => (
  <div className="text-center">
    <h1 className='fw-bold mb-3' style={{ color: '#EFCA45', fontSize: '15vw' }}>¡Oops!</h1>
    <h2 style={{ color: '#4F3F05' }}>404 - Página no encontrada</h2>
    <p style={{ color: '#4F3F05' }}>La página que estás buscando no existe.</p>
    <a className ='btn align-items-center justify-content-center p-2' href="/" style={{ backgroundColor: '#002B7A', color: 'white', maxWidth:'150px', borderRadius:'20px', fontSize:'13px'}}>
      Ir a la página principal
    </a>
  </div>
);

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');

  // Obtener la ruta actual
  const location = useLocation();

  // Funcion para determinar si se muestra la barra navegadora
  const showNavbar = () => {
    // Mostrar la navbar si el usuario no esta en la pagina login o en la pagina de buscar cuenta debido a contraseña perdida
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

      {/* Dependiendo de que tipo de usuario se loguee, se muestra una barra de navegacion diferente */}
      
      {showNavbar() && (
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

      {/* Los route van dentro de routes porque react asi lo necesita */}

      <Routes>

        {/* Rutas para que react pueda renderizar las paginas de login */}
        <Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} />} />
        <Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />

        {/* Rutas para que react pueda renderizar las paginas de mentor */}
        {/* Listo */}<Route path="/Mentor/page" element={<MentorPage />} />
        {/* Listo */}<Route path="/Mentor/perfil/page" element={<MentorPerfil userId={userId} />} /> 
        {/* Listo */}<Route path="/Mentor/sesiones/page" element={<MentorSesiones userId={userId} />} /> 
        {/* Reporte de una llamada dentro de agenda */}<Route path="/Mentor/sesiones/1/page" element={<MentorSesiones1 />} /> 
        {/* Listo */}<Route path="/Mentor/perfil/changePassword/page" element={<MentorChangePassword />} /> 

        {/* Rutas para que react pueda renderizar las paginas de estudiante, actualmente vacias */}
        <Route path="/Estudiante/page" element={<EstudiantePage />} />
        <Route path="/Estudiante/eventos/page" element={<EstudianteEvento />} />
        <Route path="/Estudiante/perfil/page" element={<EstudiantePerfil />} />
        <Route path="/Estudiante/sesiones/page" element={<EstudianteSesiones />} />
        <Route path="/Estudiante/sesiones/1/page" element={<EstudianteSesiones1 />} />

        {/* Rutas para que react pueda renderizar las paginas del administrador, actualmente vacias */}
        <Route path="/Admin/page" element={<AdminPage />} />
        <Route path="/Admin/estadisticas/page" element={<AdminEstadisticas />} />
        <Route path="/Admin/reporte/page" element={<AdminReporte />} />
        <Route path="/Admin/usuarios/page" element={<AdminUsuarios />} />
        <Route path="/Admin/usuarios/NewUser/page" element={<AdminAgregarUsuario />} />

        {/* Ruta para manejar 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      
      <Footer />
    </>
  );
}

export default App;