import React, { useState, useEffect } from 'react';

import LinkPrincipalCentered from './../components/Link/LinkPrincipalCentered.jsx';
import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx';
import DropButton1 from '../components/Button/DropButton1.jsx';

const MentorPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [search, setSearch] = useState('');

  const userId = sessionStorage.getItem('userId');

useEffect(() => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Obtener sesiones desde el servidor solo una vez al montar el componente
  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/showSesionesMentor/${userId}`);
      const data = await response.json();

      if (Array.isArray(data.data) && data.data.length > 0) {
        setSessions(data.data); // Guarda todas las sesiones para referencia
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  fetchSessions();
}, [userId]);

useEffect(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo la fecha

  const filtered = sessions.filter(session => {
    // Convierte la fecha de la sesión en un objeto Date
    const sessionDate = new Date(session.Fecha);
    sessionDate.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo la fecha

    // Aplica ambos filtros: búsqueda y fecha posterior a hoy
    return (
      // Búsqueda en múltiples campos
      ((session.Titulo ? session.Titulo.toString().toLowerCase() : '').includes(search.toLowerCase()) ||
      (session.NumeroDeSesion ? session.NumeroDeSesion.toString() : '').includes(search) ||
      (session.Fecha ? session.Fecha.toString() : '').includes(search) ||
      (session.Nombre ? session.Nombre.toString().toLowerCase() : '').includes(search.toLowerCase()) ||
      (session.ApellidoMaterno ? session.ApellidoMaterno.toString().toLowerCase() : '').includes(search.toLowerCase()) ||
      (session.ApellidoPaterno ? session.ApellidoPaterno.toString().toLowerCase() : '').includes(search.toLowerCase())) &&
      // Filtrar por fecha
      sessionDate >= today
    );
  });

  setFilteredSessions(filtered);
}, [search, sessions]);


  function handleLink(session) {
    return () => {
      sessionStorage.setItem('sesionId', session.SesionID);
    };
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    
    // Asegura que día y mes tengan siempre dos dígitos
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');
  
    return `${formattedDay}-${formattedMonth}-${year}`;
  };
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="col d-flex align-items-center justify-content-center">
        <header className="text-center my-4">
          <p
            className="text-uppercase font-weight-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'white', 
              letterSpacing: '2px'
            }}
          >
           Agenda
          </p>
        </header>
      </div>
      <div className="container p-3">
        <SearchBarNoButton
          legendText='Filtrar'
          searchPlaceholder='Buscar sesión por titulo o nombre de alumno...'
          searchValue={search}
          onSearchChange={handleSearchChange}
        />
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Número de sesión</th>
                <th scope="col">Título</th>
                <th scope="col">Alumno</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions && filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => (
                  <tr key={index}>
                    <td>{formatDate(session.Fecha)}</td>
                    <td>{session.NumeroDeSesion ? session.NumeroDeSesion : ''}</td>
                    <td>{session.Titulo ? session.Titulo : ''}</td>
                    <td>{`${session.Nombre} ${session.ApellidoPaterno} ${session.ApellidoMaterno}`}</td>
                    <td>
                      <DropButton1
                        text='Editar'
                        link='/Mentor/sesiones/editarSesion'
                        dropOnClick={handleLink(session)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Se debe de agendar una nueva sesión ...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='position-relative'>
        <div className="position-absolute top-50 start-50 translate-middle mt-5 pt-4">
          <div className='container'>
            <LinkPrincipalCentered
              text='Nueva sesión'
              link='/Mentor/sesiones/nuevaSesion'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
