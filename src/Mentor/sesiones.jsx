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
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#48dd48"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
                      </Link>
                    ) : (
                      <Link 
                        to='/Mentor/sesiones/verSesion'
                        onClick={handleCLickLinkSesion(session.SesionID)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ff0000"><path d="M480-96q-16 0-28-5t-23-16L117-429q-11-11-16-23t-5-28q0-16 5-28t15.7-22.7L429-843q11-11 23-16t28-5q16 0 28 5t23 16l312 312q11 11 16 23t5 28q0 16-5 28t-16 23L530.7-116.7Q520-106 508-101t-28 5Zm0-72 312-312-312-312-312 312 312 312Zm-36-288h72v-216h-72v216Zm35.79 120q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm.21-144Z"/></svg>
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
