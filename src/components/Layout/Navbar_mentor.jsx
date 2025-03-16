
import { React, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavbarMentor({ userId }) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');

  // Función para obtener datos del usuario
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${apiUrl}/api/getProfileMentor/${userId}`);
      //const response = await axios.get(`http://localhost:3001/api/getProfileMentor/${userId}`);
      setNombre(response.data.Nombre);
      setPaterno(response.data.ApellidoPaterno);
      setMaterno(response.data.ApellidoMaterno);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + (error.response?.data?.message || error.message));
    }
  }, [userId]);

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#EFCA45' }}>
        <div className="container-fluid">
          <ul className="nav nav-underline">

            <li className="nav-item">
              <Link 
                to="/Mentor/inicio"
                className="nav-link" 
                style={{ color: '#3A2E01', fontWeight: 'bold' }} 
              >
                Agenda
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/Mentor/sesiones"
                className="nav-link"
                style={{ color: '#3A2E01', fontWeight: 'bold' }}
              >
                Sesiones
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                to="/Mentor/eventos"
                className="nav-link" 
                style={{ color: '#3A2E01', fontWeight: 'bold' }} 
              >
                Eventos
              </Link>
            </li>

          </ul>

          {/* Segunda lista de elementos (lado derecho) */}
          <ul className="nav justify-content-end align-items-center">
            <li className="nav-item d-none d-md-block">
              <span className="navbar-text me-3" style={{ fontWeight: 'bold', color: '#3A2E01' }}>
                {nombre ? `${nombre} ${paterno} ${materno}` : 'Cargando...'}
              </span>
            </li>

            <li className="nav-item">  {/* BOtón para ver perfil */}
              <Link
                to="/Mentor/perfil"
                className="navbar-brand"
              >
                <svg xmlns="http://www.w3.org/2001/svg" height="40px" viewBox="0 -900 960 960" width="40px" fill="#3A2E01" style={{marginTop: '5px'}}><path d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z"/></svg>
              </Link>
            </li>

            <li className="nav-item"> {/* BOtón para cerrar sesión */}
              <button onClick={handleLogout} className="navbar-brand" style={{ background: 'none', border: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -950 960 960" width="40px" fill="#3A2E01"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button>
            </li>
          </ul>

        </div>
      </nav>
    </div>
  )
}
