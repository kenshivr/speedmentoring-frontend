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
            console.log(response.data.data);
            setSessions(response.data.data);
            setFilteredSessions(response.data.data);
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
      setFilteredSessions(sessions); // Mostrar todas las sesiones si no hay término de búsqueda
      return;
    }

    const filtered = sessions.filter((session) => {
      const formattedDate = new Date(session.Fecha).toLocaleDateString();
      const mentorName = session.MentorNombre.toLowerCase();
      return (
        formattedDate.includes(term) ||
        mentorName.toLowerCase().includes(term.toLowerCase()) ||
        (!session.ReporteID && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  function handleCLickLinkSesion(session) {
    return () => {
      localStorage.setItem('sesionId', session.sesionid);
    };
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
                <button
                  className="btn btn-outline-success"
                  type="button"
                  style={{ 
                    backgroundColor: '#EFCA45', 
                    color: '#4F3F05', 
                    border: '1px solid #000',
                    borderColor: "#EFCA45",
                    borderRadius: '20px',
                    transition: 'background-color 0.3s, color 0.3s' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9E6A5';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFCA45';
                    e.currentTarget.style.color = '#4F3F05';
                  }}
                  onClick={() => filterSessions(searchTerm)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Reporte</th>
                <th scope="col">Mentor</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions.map((session, index) => (
                <tr key={index}>
                  <td>{new Date(session.Fecha).toLocaleDateString()}</td>
                  <td>
                    {session.ReporteID ? (
                      <Link 
                        to='/Estudiante/sesiones/verSesion'
                        onClick={() => handleCLickLinkSesion(session.SesionID)}
                      >
                        {session.TextoExplicativo ? (
                          <span>✔</span> // Palomita si existe TextoExplicativo
                        ) : (
                          'n/a' // Mostrar 'n/a' si no existe TextoExplicativo
                        )}
                      </Link>
                    ) : (
                      <Link 
                        to='/Estudiante/sesiones/verSesion'
                        onClick={() => handleCLickLinkSesion(session.SesionID)}
                      >
                        n/a
                      </Link>
                    )}
                  </td>
                  <td>{session.MentorNombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
