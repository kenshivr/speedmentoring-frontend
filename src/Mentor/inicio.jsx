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
              </form>
            </div>
          </div>
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
                        <Link to={`/Mentor/sesiones/editarSesion`} onClick={handleLink(session)}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#002B7A"><path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-30.11 21-51.56Q186-817 216-816h346l-72 72H216v528h528v-274l72-72v346q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm264-336Zm-96 96v-153l354-354q11-11 24-16t26.5-5q14.4 0 27.45 5 13.05 5 23.99 15.78L891-840q11 11 16 24.18t5 26.82q0 13.66-5.02 26.87-5.02 13.2-15.98 24.13L537-384H384Zm456-405-51-51 51 51ZM456-456h51l231-231-25-26-26-25-231 231v51Zm257-257-26-25 26 25 25 26-25-26Z"/></svg>
                        </Link>
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
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = 'white';
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
