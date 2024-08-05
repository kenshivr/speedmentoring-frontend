import React, { useState, useEffect } from 'react';

const StudentPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // Obtener sesiones desde el servidor para el estudiante logueado
    fetch(`http://localhost:3001/api/showSesionesStudent/${userId}`) // Asegúrate de que la ruta API sea correcta para obtener las sesiones del estudiante
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Formatear la fecha
          const formattedData = data.data.map(session => ({
            ...session,
            Fecha: formatDate(session.Fecha)
          }));
          setSessions(formattedData);
          setFilteredSessions(formattedData);
        } else {
          setSessions([]);
          setFilteredSessions([]);
        }
      })
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  useEffect(() => {
    // Filtrar sesiones basadas en la búsqueda
    setFilteredSessions(
      sessions.filter(session => 
        session.SesionID.toString().includes(search) ||
        session.Fecha.includes(search) ||
        session.Titulo.toLowerCase().includes(search.toLowerCase())
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
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Titulo</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <tr key={index}>
                      <td>{session.SesionID}</td>
                      <td>{session.Fecha.split('T')[0]}</td>
                      <td>{session.Titulo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No se encontraron sesiones. Por favor, comuníquese con su mentor para agendar las próximas sesiones.</td>
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
