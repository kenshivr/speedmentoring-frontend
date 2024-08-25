import React, { useState, useEffect } from 'react';

import LinkPrincipalCentered from './../components/Link/LinkPrincipalCentered.jsx';
import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx'; 
import DropButton1 from '../components/Button/DropButton1.jsx'; 

const MentorPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [search, setSearch] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Obtener sesiones desde el servidor
    fetch(`http://localhost:3001/api/showSesionesMentor/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setSessions(data.data);
          setFilteredSessions(data.data);
        } else {
          console.error('Data is not an array:', data.data);
        }
      })
      .catch(error => console.error('Error fetching sessions:', error));
  }, [userId]);
  

  useEffect(() => {
    const today = new Date();
    const filtered = sessions.filter(session => {
      const sessionDate = new Date(session.Fecha); // Convierte la fecha de la sesión a un objeto Date
      return (
        (session.SesionID?.toString().includes(search) ||
        session.Fecha?.includes(search) ||
        session.Titulo?.includes(search)) &&
        sessionDate >= today // Filtra las sesiones cuya fecha es igual o posterior a hoy
      );
    });
    setFilteredSessions(filtered);
  }, [search, sessions]);

  function handleLink(session) {
    return () => {
      localStorage.setItem('sesionId', session.SesionID);
    };
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <SearchBarNoButton
          legendText= 'Agenda'
          searchPlaceholder= 'Buscar sesión'
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
                        dropOnClick= {handleLink(session)}
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
