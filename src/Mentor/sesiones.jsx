import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Page({ userId }) {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/api/showSesionesMentor/${userId}`)
        .then((response) => {
          if (response.data.success) {
            const pastSessions = response.data.data.filter(session => {
              const sessionDate = new Date(session.Fecha); // Asumiendo que session.Fecha es un string de fecha
              const today = new Date();
              return sessionDate < today; // Solo sesiones con fecha anterior a hoy
            });

            setSessions(pastSessions);
            setFilteredSessions(pastSessions); // Mostrar solo sesiones pasadas
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
      return (
        formattedDate.includes(term) ||
        session.Nombre.toLowerCase().includes(term.toLowerCase()) ||
        (!session.reporteid && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  const handleLink = (session) => {
    // Guardar session ID en localStorage y luego redirigir
    localStorage.setItem('sesionId', session.sesionid);
    navigate(`/Mentor/sesiones/verSesion`);
  };

  const handleCLickLinkSesion = (sessionId) => () => {
    localStorage.setItem('sesionId', sessionId);
  }

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3 p-3" style={{backgroundColor:'white', borderRadius:'25px'}}>
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
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Número de sesión</th>
                <th scope="col">Título</th>
                <th scope='col'>Alumno</th>
                <th scope="col">Reporte</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions.map((session, index) => (
                <tr key={index}>
                  <td>{formatDate(session.Fecha)}</td>
                  <td>{session.NumeroDeSesion}</td>
                  <td>{session.Titulo}</td>
                  <td>{`${session.Nombre} ${session.ApellidoPaterno} ${session.ApellidoMaterno}`}</td>
                  <td>
                    {session.ReporteID ? (
                      <Link 
                        to='/Mentor/sesiones/verSesion'
                        onClick={handleCLickLinkSesion(session.SesionID)}
                      >
                        <span>✔</span>
                      </Link>
                    ) : (
                      <Link 
                        to='/Mentor/sesiones/verSesion'
                        onClick={handleCLickLinkSesion(session.SesionID)}
                      >
                        n/a
                      </Link>
                    )}
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
