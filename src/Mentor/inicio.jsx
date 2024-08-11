import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    // Filtrar sesiones basadas en la búsqueda
    setFilteredSessions(
      sessions.filter(session => 
        session.SesionID?.toString().includes(search) ||
        session.Fecha?.includes(search) ||
        session.Titulo?.includes(search)
      )
    );
  }, [search, sessions]);

  useEffect(() => {
    console.log('Sessions:', sessions);
    console.log('Filtered Sessions:', filteredSessions);
  }, [sessions, filteredSessions]);
  

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
    <div className='container p-5'>
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3 p-3" style={{backgroundColor:'white', borderRadius:'25px'}}>
            <div className='col-sm-4 px-2'>
              <legend>Agenda</legend>
            </div>
            <div className="col-sm-8 px-2 mt-1">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px" }}
                  value={search}
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="table-responsive p-2 justify-content-center align-items-center text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                <th scope="col">Título</th>
                  <th scope="col">Alumno</th>
                  <th scope="col">Fecha</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {filteredSessions && filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <tr key={index}>
                      <td>{session.Titulo ? session.Titulo : ''}</td>
                      <td>{`${session.Nombre} ${session.ApellidoPaterno} ${session.ApellidoMaterno}`}</td>
                      <td>{formatDate(session.Fecha)}</td>
                      <td>
                        <button className="btn btn-sm">
                          <Link to={`/Mentor/sesiones/editarSesion`} onClick={handleLink(session)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z" /></svg>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Se debe de agendar una nueva sesión ...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='position-relative'>
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className='container mt-5 p-2'>
            <Link
              className="btn btn-sm px-3"
              to={`/Mentor/sesiones/nuevaSesion`}
              style={{
                backgroundColor: '#EFCA45',
                color: '#4F3F05',
                border: '1px solid #000',
                borderRadius: '20px',
                transition: 'background-color 0.3s, color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9E6A5';
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFCA45';
                e.currentTarget.style.color = '#4F3F05';
              }}
            >
              Nueva sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;