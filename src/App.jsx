import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import NavbarAdmin from "./components/Layout/Navbar_admin";
import NavbarMentor from "./components/Layout/Navbar_mentor";
import NavbarStudent from "./components/Layout/Navbar_student";

import LoginPage from './Login/page';
import BuscarCuentaPage from './Login/buscarCuenta/page';

import MentorPerfil from './Mentor/perfil';
import MentorPage from './Mentor/inicio';
import MentorEvento from './Mentor/eventos';
import MentorSesiones from './Mentor/sesiones';
import MentorSesiones1 from './Mentor/sesiones/verSesion';
import MentorNuevaSesion from './Mentor/sesiones/nuevaSesion';
import MentorEditarSesion from './Mentor/sesiones/editarSesion';
import MentorChangePassword from './Mentor/perfil/changePassword';

import EstudianteInicio from './Estudiante/inicio';
import EstudiantePerfil from './Estudiante/perfil';
import EstudianteEvento from './Estudiante/eventos';
import EstudianteSesiones from './Estudiante/sesiones';
import EstudianteSesiones1 from './Estudiante/sesiones/verSesion';
import EstudianteChangePassword from './Estudiante/perfil/changePassword';
import EstudianteSesiones1r from './Estudiante/sesiones/verSesion/retroalimentacion';

import AdminPage from './Admin/inicio';
import AdminUsuarios from './Admin/usuarios';
import AdminEditEvent from './Admin/eventos/editarEvento';
import AdminAgregarEvento from './Admin/eventos/crearEvento';
import AdminEspecialidades from './Admin/especialidades';
import AdminAgregarUsuario from './Admin/usuarios/crearUsuario';
import AdminEditarUsuario from './Admin/usuarios/editarUsuario';
import AdminImportarUsuarios from './Admin/usuarios/importarUsuarios';
import AdminNuevaEspecialidad from './Admin/especialidades/crearEspecialidad';
import AdminEditarEspecialidad from './Admin/especialidades/editarEspecialidad';

import AdminEstadisticas from './Admin/estadisticas';
import AdminEstadisticasEstudiantes from './Admin/estadisticas/estudiantes';
import AdminEstadisticasMentores from './Admin/estadisticas/mentores';
import AdminEstadisticasSesiones from './Admin/estadisticas/sesiones';
import AdminEstadisticasReportes from './Admin/estadisticas/reportes';
import AdminEstadisticasEspecialidades from './Admin/estadisticas/especialidades';
import AdminEstadisticasEventos from './Admin/estadisticas/eventos';
import AdminEstadisticasFeedbackMentores from './Admin/estadisticas/feedbackMentores';
import AdminEstadisticasFeedbackEstudiantes from './Admin/estadisticas/feedbackEstudiantes';

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
  const [eventId, setEventId] = useState(0);
  const [sesionId, setSesionId] = useState(0);
  const [specialty, setSpecialty] = useState('');
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
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
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
    localStorage.setItem('user', user);
    localStorage.setItem('userId', userId);
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

        {/* Ruta para manejar 404 */}
        {/* Listo */}<Route path="*" element={<NotFound />} />

        {/* Rutas para que react pueda renderizar las páginas de login */}
        {/* Listo */}<Route path="/login/buscarCuenta" element={<BuscarCuentaPage />} />
        {/* Listo */}<Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} />} />
        {/* Listo */}<Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} />} />

        {/* Rutas protegidas para las páginas de mentor */}
        {/* LISTO */} <Route path="/Mentor/inicio" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPage} />} />
        <Route path="/Mentor/sesiones/verSesion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones1} />} />
        <Route path="/Mentor/perfil" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPerfil} userId={userId} />} />
        <Route path="/Mentor/sesiones" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones} userId={userId} />} />
        <Route path="/Mentor/perfil/changePassword" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorChangePassword} userId={userId} />} />

        {/* Rutas protegidas para las páginas de estudiante */}
        {/* LISTO */} <Route path="/Estudiante/perfil" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudiantePerfil} />} />
        {/* LISTO */} <Route path="/Estudiante/eventos" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteEvento} />} />
        {/* LISTO */} <Route path="/Estudiante/perfil/changePassword" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteChangePassword} />} />
        {/* LISTO */} <Route path="/Estudiante/inicio" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteInicio} specialty={specialty} userId={userId} />} />
        {/* LISTO */} <Route path="/Estudiante/sesiones" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones} userId={userId} setSesionId={setSesionId} />} />
        {/* LISTO */} <Route path="/Estudiante/sesiones/verSesion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones1} sesionId={sesionId} setSesionId={setSesionId} />} />

        {/* Hechas por erick */}
        {/* LISTO */} <Route path="/Estudiante/sesiones/verSesion/retroalimentacion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones1r} />} />
        
        <Route path="/Admin/usuarios" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminUsuarios} />} />
        <Route path="/admin/inicio" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminPage} userId={userId} />} />
        <Route path="/Admin/eventos/editarEvento" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditEvent} />} />
        <Route path="/Admin/eventos/crearEvento" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarEvento} />} />

        <Route path="/Admin/usuarios/crearUsuario" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarUsuario} />} />
        {/* <Route path="/admin/estadisticas" element={<AdminEstadisticas />} />
        <Route path="/Admin/reporte/page" element={<AdminReporte />} />
        <Route path="/Admin/usuarios/editarUsuario" element={<AdminEditarUsuario />} /> */}

        {/* 
        <Route path="/admin/estadisticas" element={<AdminEstadisticas />} />
        <Route path="/admin/especialidades" element={<AdminEspecialidades />} />
        <Route path="/Admin/usuarios/crearUsuario" element={<AdminAgregarUsuario />} />
        <Route path="/Admin/usuarios/editarUsuario" element={<AdminEditarUsuario />} /> 
        */}

        {/*███████████████████████████Nuevas rutas████████████████████████████████████*/}
        <Route path="/admin/estadisticas" element={<AdminEstadisticas />} />
        <Route path="/admin/estadisticas/especialidades" element={<AdminEstadisticasEspecialidades />} />
        <Route path="/admin/estadisticas/estudiantes" element={<AdminEstadisticasEstudiantes />} />
        <Route path="/admin/estadisticas/mentores" element={<AdminEstadisticasMentores />} />
        <Route path="/admin/estadisticas/eventos" element={<AdminEstadisticasEventos />} />
        <Route path="/admin/estadisticas/feedbackEstudiantes" element={<AdminEstadisticasFeedbackEstudiantes />} />
        <Route path="/admin/estadisticas/feedbackMentores" element={<AdminEstadisticasFeedbackMentores />} />
        <Route path="/admin/estadisticas/reportes" element={<AdminEstadisticasReportes />} />
        <Route path="/admin/estadisticas/sesiones" element={<AdminEstadisticasSesiones />} />
        
        {/*███████████████████████████████████████████████████████████████*/}

        {/* Nuevas páginas */}
        <Route path="/admin/especialidades" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEspecialidades} />} />
        <Route path="/Admin/especialidades/crearEspecialidad" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminNuevaEspecialidad} />}/>
        <Route path="/Admin/usuarios/importarUsuarios" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminImportarUsuarios} />} />
        <Route path="/Admin/especialidades/editarEspecialidad" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditarEspecialidad} />}/>
        
        {/* LISTO */} <Route path='/Mentor/eventos' element={<MentorEvento />}/>
        <Route path='/Mentor/sesiones/nuevaSesion' element={<MentorNuevaSesion />}/>
        {/* LISTO */} <Route path='/Mentor/sesiones/editarSesion' element={<MentorEditarSesion />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;