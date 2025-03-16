import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import NavbarAdmin from "./components/Layout/Navbar_admin";
import NavbarMentor from "./components/Layout/Navbar_mentor";
import NavbarStudent from "./components/Layout/Navbar_student";

import LoginPage from './Login/page';

import NotFound from './Others/NotFound404';

import MentorPerfil from './Mentor/perfil';
import MentorPage from './Mentor/inicio';
import MentorEvento from './Mentor/eventos';
import MentorSesiones from './Mentor/sesiones';
import MentorSesiones1 from './Mentor/sesiones/verSesion';
import MentorNuevaSesion from './Mentor/sesiones/nuevaSesion';
import MentorEditarSesion from './Mentor/sesiones/editarSesion';
import MentorSesiones1r from './Mentor/sesiones/verSesion/retroalimentacion';

import EstudianteInicio from './Estudiante/inicio';
import EstudiantePerfil from './Estudiante/perfil';
import EstudianteEvento from './Estudiante/eventos';
import EstudianteSesiones from './Estudiante/sesiones';
import EstudianteSesiones1 from './Estudiante/sesiones/verSesion';
import EstudianteSesiones1r from './Estudiante/sesiones/verSesion/retroalimentacion';

import AdminPage from './Admin/eventos';
import AdminMentores from './Admin/mentores';
import AdminEstudiantes from './Admin/estudiantes';
import AdminEditEvent from './Admin/eventos/editarEvento';
import AdminAgregarEvento from './Admin/eventos/crearEvento';
import AdminEspecialidades from './Admin/especialidades';
import AdminAgregarMentor from './Admin/usuarios/crearMentor';
import AdminAgregarEstudiante from './Admin/usuarios/crearEstudiante';
import AdminEditarEstudiante from './Admin/usuarios/editarEstudiante';
import AdminEditarMentor from './Admin/usuarios/editarMentor';
import AdminImportarUsuarios from './Admin/importarUsuarios';
import AdminNuevaEspecialidad from './Admin/especialidades/crearEspecialidad';
import AdminEditarEspecialidad from './Admin/especialidades/editarEspecialidad';

import AdminEstadisticas from './Admin/estadisticas';
import AdminEstadisticasEstudiantes from './Admin/estadisticas/estudiantes';
import AdminEstadisticasMentores from './Admin/estadisticas/mentores';
import AdminEstadisticasSesiones from './Admin/estadisticas/sesiones';
import AdminEstadisticasReportes from './Admin/estadisticas/reportes';
import AdminEstadisticasEventos from './Admin/estadisticas/eventos';
import AdminEstadisticasFeedbackMentores from './Admin/estadisticas/feedbackMentores';
import AdminEstadisticasFeedbackEstudiantes from './Admin/estadisticas/feedbackEstudiantes';

// Componente para proteger rutas
const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
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

  // Almacenar el userId en sessionStorage cuando se establece 
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId && storedUser) {
      setUserId(storedUserId);
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Este `useEffect` asegura que los datos se actualicen correctamente en sessionStorage
  useEffect(() => {
    if (user && userId) {
      sessionStorage.setItem('user', user);
      sessionStorage.setItem('userId', userId);
    }
  }, [userId, user]);


  return (
    <>
      <Header />
      {showNavbar() && (
        user === 'admin' ? (
          <NavbarAdmin />
        ) : user === 'student' ? (
          <NavbarStudent  isAuthenticated={isAuthenticated} element={NavbarMentor} userId={userId}  />
        ) : user === 'mentor' ? (
          <NavbarMentor  isAuthenticated={isAuthenticated} element={NavbarMentor} userId={userId} />
        ) : (
          <></>
        )
      )}

      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} />} /> */}

        <Route path="/login" element={<LoginPage setUser={setUser} setUserId={setUserId} setSpecialty={setSpecialty} setIsAuthenticated={setIsAuthenticated}/>} />

        <Route path="/Mentor/inicio" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPage} />} />
        <Route path="/Mentor/perfil" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorPerfil} userId={userId} />} />
        <Route path='/Mentor/eventos' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorEvento} />} />
        <Route path="/Mentor/sesiones" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones} userId={userId} />} />
        <Route path='/Mentor/sesiones/nuevaSesion' element={< ProtectedRoute isAuthenticated={isAuthenticated} element={MentorNuevaSesion} />} />
        <Route path='/Mentor/sesiones/editarSesion' element={< ProtectedRoute isAuthenticated={isAuthenticated} element={MentorEditarSesion} />} />
        <Route path="/Mentor/sesiones/verSesion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones1} />} />
        <Route path="/Mentor/sesiones/verSesion/retroalimentacion" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={MentorSesiones1r} />} />

        <Route path="/Estudiante/inicio" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteInicio} specialty={specialty} userId={userId} />} />
        <Route path="/Estudiante/perfil" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudiantePerfil} />} />
        <Route path="/Estudiante/eventos" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteEvento} />} />
        <Route path="/Estudiante/sesiones" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones} userId={userId} setSesionId={setSesionId} />} />
        <Route path="/Estudiante/sesiones/verSesion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones1} sesionId={sesionId} setSesionId={setSesionId} />} />
        <Route path="/Estudiante/sesiones/verSesion/retroalimentacion" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EstudianteSesiones1r} />} />

        <Route path="/admin/eventos" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminPage} userId={userId} />} />
        <Route path="/Admin/eventos/editarEvento" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditEvent} />} />
        <Route path="/Admin/eventos/crearEvento" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarEvento} />} />

        <Route path="/admin/estadisticas" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticas} />} />
        <Route path="/admin/estadisticas/estudiantes" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasEstudiantes} />} />
        <Route path="/admin/estadisticas/mentores" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasMentores} />} />
        <Route path="/admin/estadisticas/eventos" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasEventos} />} />
        <Route path="/admin/estadisticas/feedbackEstudiantes" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasFeedbackEstudiantes} />} />
        <Route path="/admin/estadisticas/feedbackMentores" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasFeedbackMentores} />} />
        <Route path="/admin/estadisticas/reportes" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasReportes} />} />
        <Route path="/admin/estadisticas/sesiones" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstadisticasSesiones} />} />

        <Route path="/Admin/importarUsuarios" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminImportarUsuarios} />} />

        <Route path="/Admin/estudiantes" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEstudiantes} />} />
        <Route path="/Admin/usuarios/crearEstudiante" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarEstudiante} />} />
        <Route path="/Admin/usuarios/editarEstudiante" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditarEstudiante} />} />

        <Route path="/Admin/mentores" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminMentores} />} />
        <Route path="/Admin/usuarios/crearMentor" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminAgregarMentor} />} />
        <Route path="/Admin/usuarios/editarMentor" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditarMentor} />} />

        <Route path="/admin/especialidades" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEspecialidades} />} />
        <Route path="/Admin/especialidades/crearEspecialidad" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminNuevaEspecialidad} />} />
        <Route path="/Admin/especialidades/editarEspecialidad" element={< ProtectedRoute isAuthenticated={isAuthenticated} element={AdminEditarEspecialidad} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;