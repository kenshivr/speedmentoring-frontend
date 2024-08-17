import React, { useState, useEffect } from 'react';

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
            // Filtrar sesiones con fecha mayor o igual a la actual
            const currentDate = new Date().setHours(0, 0, 0, 0);
            let futureSessions = data.data.filter(session => {
              const sessionDate = new Date(session.Fecha.split('T')[0]).setHours(0, 0, 0, 0);
              return sessionDate >= currentDate;
            });

            // Eliminar duplicados usando sesionid
            const uniqueSessions = futureSessions.filter((session, index, self) =>
              index === self.findIndex((s) => (
                s.sesionid === session.sesionid
              ))
            );

            const formattedData = uniqueSessions.map(session => ({
              ...session,
              Fecha: formatDate(session.Fecha)
            }));

            setSessions(formattedData);
            setFilteredSessions(formattedData);
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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  if (loading) {
    return <div className='container p-5'>
    <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
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
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td colSpan="3">Cargando sesiones...</td>
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
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
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
