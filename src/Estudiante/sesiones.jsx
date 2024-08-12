import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Page({ userId }) {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/api/showSesionesStudent/${userId}`)
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
            console.error('No se encontraron sesiones');
          }
        })
        .catch((error) => {
          console.error('Error al obtener sesiones:', error);
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
      const mentorName = session.MentorNombre ? session.MentorNombre.toLowerCase() : '';
      const title = session.Titulo ? session.Titulo.toLowerCase() : '';
      
      return (
        formattedDate.includes(term) ||
        mentorName.includes(term.toLowerCase()) ||
        title.includes(term.toLowerCase()) || // Búsqueda por título
        (!session.ReporteID && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  const handleCLickLinkSesion = (sessionId) => () => {
    localStorage.setItem('sesionId', sessionId);
  }

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-sm-4 px-2'>
              <legend>Historial de sesiones</legend>
            </div>
            <div className="col-sm-8 px-2 mt-1">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Número de sesión</th>
                <th scope="col">Título</th>
                <th scope="col">Reporte</th>
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
                      {session.ReporteID ? (
                        <Link 
                          to='/Estudiante/sesiones/verSesion'
                          onClick={handleCLickLinkSesion(session.SesionID)}
                        >
                          <span>✔</span>
                        </Link>
                      ) : (
                        <Link 
                          to='/Estudiante/sesiones/verSesion'
                          onClick={handleCLickLinkSesion(session.SesionID)}
                        >
                          n/a
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No se encontraron sesiones que coincidan con la búsqueda. Por favor, ajuste su búsqueda e intente nuevamente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
