import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx'; 
import DropButton1 from '../components/Button/DropButton1.jsx';
import PaginationButtons from '../components/Button/PaginationButtons.jsx';

export default function Page({ userId }) {
  const itemsPerPage = 5; // Número de sesiones por página
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userId) {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      axios.get(`${apiUrl}/api/showSesionesMentor/${userId}`)
        .then((response) => {
          if (response.data.success) {
            const pastSessions = response.data.data.filter(session => {
              const sessionDate = new Date(session.Fecha);
              return sessionDate < new Date();
            });
            setSessions(pastSessions);
            setFilteredSessions(pastSessions);
            setErrorMessage('');
          } else {
            setErrorMessage('No se encontraron sesiones. ¡Agenda una nueva en la sección de Agenda!');
          }
        })
        .catch(() => {
          setErrorMessage('Error al obtener sesiones. Intente nuevamente más tarde.');
        });
    }
  }, [userId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
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
      const studentName = `${session.Nombre} ${session.ApellidoPaterno} ${session.ApellidoMaterno}`.toLowerCase();

      return (
        formattedDate.includes(term) ||
        title.includes(term.toLowerCase()) ||
        studentName.includes(term.toLowerCase()) ||
        (!session.ReporteID && term.toLowerCase() === 'n/a')
      );
    });

    setFilteredSessions(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleCLickLinkSesion = (sessionId) => () => {
    sessionStorage.setItem('sesionId', sessionId);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedSessions = filteredSessions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredSessions.length / itemsPerPage)));
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="col d-flex align-items-center justify-content-center">
        <header className="text-center my-4">
          <p className="text-uppercase font-weight-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', letterSpacing: '2px' }}>
            Sesiones
          </p>
        </header>
      </div>
      <div className="container p-3">
        <SearchBarNoButton
          legendText="Filtrar"
          searchPlaceholder="Buscar sesión por título o nombre de alumno..."
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
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
                <th scope="col">Alumno</th>
                <th scope="col">Informe</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {selectedSessions.length > 0 ? (
                selectedSessions.map((session, index) => (
                  <tr key={index}>
                    <td>{formatDate(session.Fecha)}</td>
                    <td>{session.NumeroDeSesion}</td>
                    <td>{session.Titulo}</td>
                    <td>{`${session.Nombre} ${session.ApellidoPaterno} ${session.ApellidoMaterno}`}</td>
                    <td>
                      {session.ReporteID ? '✅' : '❌'}
                    </td>
                    <td>
                      <DropButton1
                        text={session.ReporteID ? `Ver informe ${session.NumeroDeSesion}` : `Realizar informe ${session.NumeroDeSesion}`}
                        link="/Mentor/sesiones/verSesion"
                        dropOnClick={handleCLickLinkSesion(session.SesionID)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No se encontraron sesiones que coincidan con la búsqueda. Por favor, ajuste su búsqueda e intente nuevamente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          isPreviousDisabled={currentPage === 0}
          isNextDisabled={startIndex + itemsPerPage >= filteredSessions.length}
        />
      </div>
    </div>
  );
}
