import React, { useState, useEffect } from 'react';

import SearchBarNoButton from '../components/Search/SearchBarNoButton.jsx'; 

const StudentPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const userId = sessionStorage.getItem('userId');

        if (userId) {
          const apiUrl = process.env.REACT_APP_BACKEND_URL;
          const response = await fetch(`${apiUrl}/api/showSesionesStudent/${userId}`);
          //const response = await fetch(`http://localhost:3001/api/showSesionesStudent/${userId}`);
          const data = await response.json();

          if (data.success) {
            const currentDate = new Date();
            let futureSessions = data.data.filter(session => {
              let sessionDate = new Date(session.Fecha);
              return sessionDate >= currentDate;
            });

            setSessions(futureSessions);
            setFilteredSessions(futureSessions);
          } else {
            setSessions([]);
            setFilteredSessions([]);
          }
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a las 00:00 para comparar solo la fecha
  
    const filtered = sessions.filter(session => {
      // Convierte la fecha de la sesión en un objeto Date
      const sessionDate = new Date(session.Fecha);
      sessionDate.setHours(0, 0, 0, 0); // Establece la hora a las 00:00 para comparar solo la fecha
  
      // Filtro de búsqueda en múltiples campos
      const matchesSearch = 
        (session.Titulo ? session.Titulo.toString().toLowerCase() : '').includes(search.toLowerCase()) ||
        (session.NumeroDeSesion ? session.NumeroDeSesion.toString() : '').includes(search) ||
        (session.Fecha ? session.Fecha.toString() : '').includes(search) ||
        (session.Descripcion ? session.Descripcion.toString().toLowerCase() : '').includes(search.toLowerCase());
  
      // Retorna true solo si cumple con el filtro de búsqueda y la fecha
      return matchesSearch && sessionDate >= today;
    });
  
    setFilteredSessions(filtered);
  }, [search, sessions]);
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <div className='container p-5'>
    <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="col d-flex align-items-center justify-content-center">
        <header className="text-center my-4">
          <p
            className="text-uppercase font-weight-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'white', 
              letterSpacing: '2px'
            }}
          >
           Agenda
          </p>
        </header>
      </div>
      <div className="container p-3">
        <SearchBarNoButton
          legendText= 'Agenda'
          searchPlaceholder= 'Buscar sesión'
          searchValue={search}
          onSearchChange={handleSearchChange}
        />
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Número de sesión</th> 
                <th scope="col">Título</th> 
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td colSpan="4">Cargando sesiones...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  }

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

  return (
    <div className='container p-5'>
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <div className="col d-flex align-items-center justify-content-center">
          <header className="text-center my-4">
            <p
              className="text-uppercase font-weight-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'white', 
                letterSpacing: '2px'
              }}
            >
             Agenda
            </p>
          </header>
        </div>
        <div className="container p-3">
          <SearchBarNoButton
            legendText= 'Filtro'
            searchPlaceholder= 'Buscar sesión por titulo o descripción...'
            searchValue={search}
            onSearchChange={handleSearchChange}
          />
          <div className="table-responsive p-2 justify-content-center align-items-center text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Número de sesión</th> 
                  <th scope="col">Título</th> 
                  <th scope="col">Descripción</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <tr key={index}>
                      <td>{formatDate(session.Fecha)}</td>
                      <td>{session.NumeroDeSesion || ''}</td> 
                      <td>{session.Titulo || ''}</td> 
                      <td>{session.Descripcion || ''}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No se encontraron sesiones. Por favor, comuníquese con su mentor para agendar las próximas sesiones.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
