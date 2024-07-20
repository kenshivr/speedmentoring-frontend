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
import EstudianteSesiones1r from './Estudiante/sesiones/1/retroalim';
import EstudianteChangePassword from './Estudiante/perfil/changePassword/page';

import AdminPage from './Admin/page';
import AdminEstadisticas from './Admin/estadisticas/page';
import AdminReporte from './Admin/reporte/page';
import AdminUsuarios from './Admin/usuarios/page';
import AdminAgregarUsuario from './Admin/usuarios/newUser/page';
import AdminEditarUsuario from './Admin/usuarios/editUser/page';
import AdminAgregarEvento from './Admin/nuevoEvento/page';

// Componente para la página no encontrada
const NotFound = () => (
  <div className="text-center pt-5">
    <h1 className='fw-bold mb-3 pt-5' style={{ color: '#EFCA45', fontSize: '15vw' }}>¡Oops!</h1>
    <h2 style={{ color: '#4F3F05' }}>404 - Página no encontrada</h2>
    <p style={{ color: '#4F3F05' }}>La página que estás buscando no existe.</p>
    <div className='container pt-5'>
      <a
        type="button"
        className="btn w-75"
        href='/'
        style={{ 
          backgroundColor: '#002B7A', 
          color: 'white', 
          border: '1px solid #000',
          borderRadius:'20px',
          maxWidth:'250px',
          transition: 'background-color 0.3s, color 0.3s' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#000';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#002B7A';
          e.currentTarget.style.color = '#white';
        }}
        >
        Ir a la página principal
      </a>
    </div>
  </div>
);

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [sesionId, setSesionId] = useState(0);

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
        {/* Listo */}<Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty}/>} />
        {/* Listo */}<Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty}/>} />
        {/* Listo */}<Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />

        {/* Rutas para que react pueda renderizar las paginas de mentor */}
        {/*  */}<Route path="/Mentor/page" element={<MentorPage />} />
        {/*  */}<Route path="/Mentor/perfil/page" element={<MentorPerfil userId={userId} />} /> 
        {/*  */}<Route path="/Mentor/sesiones/page" element={<MentorSesiones userId={userId} />} /> 
        {/*  */}<Route path="/Mentor/sesiones/1/page" element={<MentorSesiones1 />} /> 
        {/*  */}<Route path="/Mentor/perfil/changePassword/page" element={<MentorChangePassword />} /> 

        {/* Rutas para que react pueda renderizar las paginas de estudiante, actualmente vacias */}
        {/* Listo */}<Route path="/Estudiante/page" element={<EstudiantePage specialty={specialty}/>} />
        {/* Listo */}<Route path="/Estudiante/eventos/page" element={<EstudianteEvento />} />
        {/* Listo */}<Route path="/Estudiante/perfil/page" element={<EstudiantePerfil />} />
        {/* Listo */}<Route path="/Estudiante/sesiones/page" element={<EstudianteSesiones userId={userId} setSesionId={setSesionId} />} />
        {/* Listo */}<Route path="/Estudiante/sesiones/1/page" element={<EstudianteSesiones1 sesionId={sesionId} setSesionId={setSesionId} />} />

        {/* Hechas por erick */}
        <Route path="/Estudiante/sesiones/1/retroalim" element={<EstudianteSesiones1r />} />
        {/* Listo */}<Route path="/Estudiante/perfil/changePassword/page" element={<EstudianteChangePassword />} /> 


        <Route path="/Admin/page" element={<AdminPage />} />{/* Usada para administrar los eventos */}
        <Route path="/Admin/nuevoEvento/page" element={<AdminAgregarEvento />} />
        <Route path="/Admin/estadisticas/page" element={<AdminEstadisticas />} />{/* Todavía no está terminada */}
        <Route path="/Admin/reporte/page" element={<AdminReporte />} />{/* Todavía no está terminada */}
        <Route path="/Admin/usuarios/page" element={<AdminUsuarios />} />
        <Route path="/Admin/usuarios/NewUser/page" element={<AdminAgregarUsuario />} />
        <Route path="/Admin/usuarios/editUser/page" element={<AdminEditarUsuario />} />
        

        {/* Ruta para manejar 404 */}
        {/* Listo */}<Route path="*" element={<NotFound />} />

      </Routes>
      
      <Footer />
    </>
  );
}

export default App;