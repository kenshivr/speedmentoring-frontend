import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el usuario del sessionStorage
    sessionStorage.removeItem('user'); // Aquí 'user' es la clave que utilizas para almacenar los datos del usuario
    sessionStorage.removeItem('user'); // Si también usas sessionStorage, asegúrate de limpiarlo

    // Redirigir al usuario a la página de inicio
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#EFCA45' }}>
        <div className="container-fluid">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/eventos">
                Eventos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/especialidades">
                Especialidades
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/estudiantes">
                Estudiantes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/mentores">
                Mentores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/importarUsuarios">
                Importar usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/estadisticas">
                Estadísticas
              </Link>
            </li>
          </ul>

          {/* Segunda lista de elementos (lado derecho) */}
          <ul className="nav justify-content-end">
            <li className="nav-item"> {/* BOtón para cerrar sesión */}
              <button onClick={handleLogout} className="navbar-brand" style={{ background: 'none', border: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#3A2E01"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarAdmin;