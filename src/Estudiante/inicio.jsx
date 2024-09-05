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
        const userId = localStorage.getItem('userId');

        if (userId) {
          const response = await fetch(`http://localhost:3001/api/showSesionesStudent/${userId}`);
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
    // Filtra sesiones basadas en la búsqueda
    setFilteredSessions(
      sessions.filter(session => 
        (session.Titulo ? session.Titulo.toString().toLowerCase() : '').includes(search.toLowerCase()) ||
        (session.NumeroDeSesion ? session.NumeroDeSesion.toString() : '').includes(search) ||
        (session.Fecha ? session.Fecha.toString() : '').includes(search) ||
        (session.Descripcion ? session.Descripcion.toString().toLowerCase() : '').includes(search.toLowerCase())
      )
    );    
  }, [search, sessions]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <div className='container p-5'>
    <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
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

  return (
    <div className='container p-5'>
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <tr key={index}>
                      <td>{session.Fecha ? session.Fecha.split('T')[0] : ''}</td>
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
