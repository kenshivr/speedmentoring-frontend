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
            setSessions(response.data.data);
            setFilteredSessions(response.data.data); // Inicialmente mostrar todas las sesiones
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
      const formattedDate = new Date(session.fecha).toLocaleDateString();
      return (
        formattedDate.includes(term) ||
        (!session.reporteid && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  function handleLink(session) {
    return () => {
      console.log(session);
      localStorage.setItem('sesionId', session.sesionid);
    };
  }

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3">
          <div className="col-sm-6 col-md-12">
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
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Reporte</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions.map((session, index) => (
                <tr key={index}>
                  <td>{new Date(session.fecha).toLocaleDateString()}</td>
                  <td>
                    {session.reporteid ? (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#00CC00">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm">
                      <Link to={`/Estudiante/sesiones/1/page`} onClick={handleLink(session)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z" /></svg>
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}