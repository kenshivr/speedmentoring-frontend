import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import NavbarAdmin from "./components/Layout/Navbar_admin";
import NavbarMentor from "./components/Layout/Navbar_mentor";
import NavbarStudent from "./components/Layout/Navbar_student";

import LoginPage from './Login/page';
import BuscarCuentaPage from './Login/buscarCuenta/page';

import MentorPage from './Mentor/page';
import MentorPerfil from './Mentor/perfil/page';
import MentorSesiones from './Mentor/sesiones/page';
import MentorSesiones1 from './Mentor/sesiones/1/page';
import MentorChangePassword from './Mentor/perfil/changePassword/page';

import EstudiantePage from './Estudiante/page';
import EstudiantePerfil from './Estudiante/perfil/page';
import EstudianteEvento from './Estudiante/eventos/page';
import EstudianteSesiones from './Estudiante/sesiones/page';
import EstudianteSesiones1 from './Estudiante/sesiones/1/page';
import EstudianteSesiones1r from './Estudiante/sesiones/1/retroalim';
import EstudianteChangePassword from './Estudiante/perfil/changePassword/page';

import AdminPage from './Admin/page';
import AdminEspecialidades from './Admin/especialidades/page';
import AdminNuevaEspecialidad from './Admin/especialidades/nuevaEspecialidad/page';
import AdminEditarEspecialidad from './Admin/especialidades/nuevaEspecialidad/editarEspecialidad';
import AdminUsuarios from './Admin/usuarios/page';
import AdminImportarUsuarios from './Admin/usuarios/importarUsuarios';
import AdminEditEvent from './Admin/editarEvento/page';
import AdminEstadisticas from './Admin/estadisticas/page';
import AdminAgregarEvento from './Admin/nuevoEvento/page';
import AdminAgregarUsuario from './Admin/usuarios/newUser/page';
import AdminEditarUsuario from './Admin/usuarios/editUser/page';

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

// Componente para proteger rutas
const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [sesionId, setSesionId] = useState(0);
  const [eventId, setEventId] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Obtener la ruta actual
  const location = useLocation();

  // Función para determinar si se muestra la barra navegadora
  const showNavbar = () => {
    // Mostrar la navbar si el usuario no está en la página login o en la página de buscar cuenta debido a contraseña perdida
    return location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/login/buscarCuenta';
  };  

  // Almacenar el userId en localStorage cuando se establece 
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  // Escuchar cambios en userId y actualizar localstorage
  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', user);
  }, [userId, user]);

  return (
    <>
      <Header />

      {/* Dependiendo de qué tipo de usuario se loguee, se muestra una barra de navegación diferente */}
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

      {/* Los route van dentro de routes porque react así lo necesita */}
      <Routes>
        {/* Rutas para que react pueda renderizar las páginas de login */}
        <Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} />} />
        <Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />

        {/* Rutas protegidas para las páginas de mentor */}
        <Route path="/Mentor/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPage} />} />
        <Route path="/Mentor/perfil/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPerfil} userId={userId} />} />
        <Route path="/Mentor/sesiones/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones} userId={userId} />} />
        <Route path="/Mentor/sesiones/1/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones1} />} />
        <Route path="/Mentor/perfil/changePassword/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorChangePassword} userId={userId} />} />

        {/* Rutas protegidas para las páginas de estudiante */}
        <Route path="/Estudiante/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudiantePage} specialty={specialty} userId={userId} />} />
        <Route path="/Estudiante/eventos/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteEvento} />} />
        <Route path="/Estudiante/perfil/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudiantePerfil} />} />
        <Route path="/Estudiante/sesiones/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones} userId={userId} setSesionId={setSesionId} />} />
        <Route path="/Estudiante/sesiones/1/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones1} sesionId={sesionId} setSesionId={setSesionId} />} />
        <Route path="/Estudiante/perfil/changePassword/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteChangePassword} />} />

        {/* Rutas para que react pueda renderizar las paginas de estudiante, actualmente vacias */}
        {/* Listo */}<Route path="/Estudiante/page" element={<EstudiantePage specialty={specialty}/>} />
        {/* Listo */}<Route path="/Estudiante/eventos/page" element={<EstudianteEvento />} />
        {/* Listo */}<Route path="/Estudiante/perfil/page" element={<EstudiantePerfil />} />
        {/* Listo */}<Route path="/Estudiante/sesiones/page" element={<EstudianteSesiones userId={userId} setSesionId={setSesionId} />} />
        {/* Listo */}<Route path="/Estudiante/sesiones/1/page" element={<EstudianteSesiones1 sesionId={sesionId} setSesionId={setSesionId} />} />

        {/* Hechas por erick */}
        {/* <Route path="/Estudiante/sesiones/1/retroalim" element={<EstudianteSesiones1r />} /> */}

        <Route path="/Admin/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminPage} userId={userId} />} />
        <Route path="/Admin/editarEvento/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditEvent} />} />
        <Route path="/Admin/nuevoEvento/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarEvento} />} />
        <Route path="/Admin/usuarios/page" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminUsuarios} />} />

        {/* 
        <Route path="/Admin/estadisticas/page" element={<AdminEstadisticas />} />
        <Route path="/Admin/especialidades/page" element={<AdminEspecialidades />} />
        <Route path="/Admin/usuarios/NewUser/page" element={<AdminAgregarUsuario />} />
        <Route path="/Admin/usuarios/editUser/page" element={<AdminEditarUsuario />} /> 
        */}


        {/* Nuevas páginas */}
        <Route path="/Admin/especialidades/page" element={<AdminEspecialidades />}/>
        <Route path="/Admin/especialidades/nuevaEspecialidad/page" element={<AdminNuevaEspecialidad />}/>
        <Route path="/Admin/especialidades/nuevaEspecialidad/editarEspecialidad" element={<AdminEditarEspecialidad />}/>
        <Route path="/Admin/usuarios/importarUsuarios" element={<AdminImportarUsuarios />} />

        {/* Ruta para manejar 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;