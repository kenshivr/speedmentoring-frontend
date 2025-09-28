import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DropButton2 from '../components/Button/DropButton2.jsx';
import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx';
import LinkPrincipalCentered from './../components/Link/LinkPrincipalCentered.jsx';

const MentorPage = () => {
  const [search, setSearch] = useState('');
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = sessionStorage.getItem('userId');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (userId) fetchSessions();
    else setErrorMessage('No se encontró el usuario.');
  }, [userId]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Solo fecha

    const filtered = sessions.filter(session => {
      const sessionDate = session.Fecha ? new Date(session.Fecha) : null;
      if (sessionDate) sessionDate.setHours(0, 0, 0, 0);

      const matchesSearch = 
        (session.Titulo ? session.Titulo.toLowerCase() : '').includes(search.toLowerCase()) ||
        (session.NumeroDeSesion ? session.NumeroDeSesion.toString() : '').includes(search) ||
        (session.Fecha ? session.Fecha.toString() : '').includes(search) ||
        (session.Nombre ? session.Nombre.toLowerCase() : '').includes(search.toLowerCase()) ||
        (session.ApellidoMaterno ? session.ApellidoMaterno.toLowerCase() : '').includes(search.toLowerCase()) ||
        (session.ApellidoPaterno ? session.ApellidoPaterno.toLowerCase() : '').includes(search.toLowerCase());

      return matchesSearch && (!sessionDate || sessionDate >= today);
    });

    setFilteredSessions(filtered);
  }, [search, sessions]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/showSesionesMentor/${userId}`);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setSessions(data.data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setErrorMessage('Ocurrió un error al cargar las sesiones.');
    }
  };

  const handleLink = (session) => () => {
    if (session && session.SesionID) {
      sessionStorage.setItem('sesionId', session.SesionID);
    } else {
      setErrorMessage('Sesión inválida.');
    }
  };

  const handleDelete = async (sesionID) => {
    if (!sesionID) {
      alert('Sesión inválida.');
      return;
    }
    try {
      const response = await axios.delete(`${apiUrl}/api/deleteSession/${sesionID}`);
      alert(response.data?.message || 'Ocurrió un error en la eliminación de la sesión');
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
      alert('Error al eliminar la sesión. Intenta de nuevo.');
    }
    fetchSessions();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Fecha inválida';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="col d-flex align-items-center justify-content-center">
        <header className="text-center my-4">
          <p className="text-uppercase font-weight-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', letterSpacing: '2px' }}>
            Agenda
          </p>
        </header>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
                <th scope="col">Fecha agendada</th>
                <th scope="col">Número de sesión</th>
                <th scope="col">Título</th>
                <th scope="col">Alumno</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => (
                  <tr key={index}>
                    <td>{formatDate(session.Fecha)}</td>
                    <td>{session.NumeroDeSesion || 'N/A'}</td>
                    <td>{session.Titulo || 'Sin título'}</td>
                    <td>{`${session.Nombre || 'Sin nombre'} ${session.ApellidoPaterno || ''} ${session.ApellidoMaterno || ''}`}</td>
                    <td>
                      <DropButton2
                        text1='Editar'
                        link1='/Mentor/sesiones/editarSesion'
                        dropOnClick1={handleLink(session)}
                        text2='Eliminar'
                        dropOnClick2={() => handleDelete(session.SesionID)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Se debe agendar una nueva sesión...</td>
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
