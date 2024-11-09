import axios from 'axios';
import React, { useEffect, useState } from 'react';

import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx'; 
import DropButton1 from '../components/Button/DropButton1.jsx'; 

export default function Page({ userId }) {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para almacenar mensajes de error

  useEffect(() => {
    if (userId) {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      axios.get(`${apiUrl}/api/showSesionesStudent/${userId}`)
        .then((response) => {
          if (response.data.success) {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            let pastSessions = response.data.data.filter(session => {
              const sessionDate = new Date(session.Fecha.split('T')[0]).setHours(0, 0, 0, 0);
              return sessionDate < currentDate;
            });

            const uniqueSessions = pastSessions.filter((session, index, self) =>
              index === self.findIndex((s) => (
                s.SesionID === session.SesionID
              ))
            );

            setSessions(uniqueSessions);
            setFilteredSessions(uniqueSessions);
          } else {
            setErrorMessage('No se encontraron sesiones. Ponte en contacto con tu mentor para agendar una nueva...'); // Mensaje de error amigable
          }
        })
        .catch((error) => {
          setErrorMessage('Ocurrió un error al obtener las sesiones. Intente de nuevo más tarde.'); // Mensaje en caso de error en la solicitud
        });
    }
  }, [userId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterSessions(event.target.value);
  };

  const filterSessions = (term) => {
    if (!term.trim()) {
      setFilteredSessions(sessions);
      return;
    }

    const filtered = sessions.filter((session) => {
      const formattedDate = new Date(session.Fecha).toLocaleDateString();
      const title = session.Titulo ? session.Titulo.toLowerCase() : '';
      
      return (
        formattedDate.includes(term) ||
        title.includes(term.toLowerCase()) || // Búsqueda por título
        (session.EstudianteReporteID === null && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  const handleCLickLinkSesion = (sessionId) => () => {
    sessionStorage.setItem('sesionId', sessionId);
  }

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <SearchBarNoButton
            legendText= 'Historial de sesiones'
            searchPlaceholder= 'Buscar sesión'
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
          />

        {errorMessage && ( // Mostrar mensaje de error si existe
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Número de sesión</th>
                <th scope="col">Título</th>
                <th scope="col">Reporte</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => (
                  <tr key={index}>
                    <td>{new Date(session.Fecha).toLocaleDateString()}</td>
                    <td>{session.NumeroDeSesion}</td>
                    <td>{session.Titulo}</td>
                    <td>
                      {session.EstudianteReporteID ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#48dd48">
                          <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ff0000">
                          <path d="M480-96q-16 0-28-5t-23-16L117-429q-11-11-16-23t-5-28q0-16 5-28t15.7-22.7L429-843q11-11 23-16t28-5q16 0 28 5t23 16l312 312q11 11 16 23t5 28q0 16-5 28t-16 23L530.7-116.7Q520-106 508-101t-28 5Zm0-72 312-312-312-312-312 312 312 312Zm-36-288h72v-216h-72v216Zm35.79 120q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm.21-144Z"/>
                        </svg>
                      )}
                    </td>
                    <td>
                      {session.EstudianteReporteID ? (
                        <DropButton1
                          text='Ver reporte'
                          link='/Estudiante/sesiones/verSesion'
                          dropOnClick={handleCLickLinkSesion(session.SesionID)}
                        />                   
                      ) : (
                        <DropButton1
                          text='Agregar reporte'
                          link='/Estudiante/sesiones/verSesion'
                          dropOnClick={handleCLickLinkSesion(session.SesionID)}
                        />         
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No se encontraron sesiones que coincidan con la búsqueda. Por favor, ajuste su búsqueda e intente nuevamente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
