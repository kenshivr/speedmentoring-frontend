import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAdmin() {
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#EFCA45' }}>
        <div className="container-fluid">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/estadisticas">
                Estadísticas
              </Link>
            </li>
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
          </ul>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="navbar-brand" to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#3A2E01">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarAdmin;