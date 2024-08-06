import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAdmin() {
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#EFCA45' }}>
        <div className="container-fluid">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <Link className="navbar-brand" to="/Admin/inicio">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#3A2E01">
                  <path d="M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z" />
                </svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/estadisticas">
                Estadísticas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/especialidades">
                Especialidades
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#3A2E01', fontWeight: 'bold' }} to="/Admin/usuarios">
                Usuarios
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