import React, { useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${searchTerm}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleActionClick = (recordId, action) => {
    if (action === 'edit') {
      window.location.href = `/Admin/usuarios/EditUser/${recordId}`;
    } else {
      updateRecordStatus(recordId, action);
    }
  };

  const updateRecordStatus = async (recordId, action) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/${recordId}`, {
        status: action === 'enable' ? 'Habilitado' : 'Deshabilitado'
      });
      setRecords(records.map(record => record.id === recordId ? { ...record, status: response.data.status } : record));
    } catch (error) {
      console.error("Error updating record status:", error);
    }
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius:'50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3">
          <div className="col-sm-6 col-md-12">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px"}}
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-outline-success me-2"
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
                onClick={handleSearch}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
              </button>
              <a className="btn btn-danger btn-outline-light btn-sm" href="/Admin/usuarios/NewUser/page" role="button">Nuevo usuario</a>
            </form>
          </div>
        </div>
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Seleccionar</th>
                <th scope="col">ID</th>
                <th scope="col">Estado</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido paterno</th>
                <th scope="col">Apellido materno</th>
                <th scope="col">Rol</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Especialidad</th>
                <th scope="col">E-mail</th>
                <th scope="col">Periodo</th>
                <th scope="col">Fecha de registro</th>
                <th scope="col">Sesiones</th>
                <th scope="col">Reportes enviados</th>
                <th scope="col">Reportes no enviados</th>
                <th scope="col">Último login</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {records.map(record => (
                <tr key={record.id}>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>{record.id}</td>
                  <td>{record.status}</td>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.middleName}</td>
                  <td>{record.role}</td>
                  <td>{record.phone}</td>
                  <td>{record.specialty}</td>
                  <td>{record.email}</td>
                  <td>{record.period}</td>
                  <td>{record.registrationDate}</td>
                  <td>{record.sessions}</td>
                  <td>{record.reportsSent}</td>
                  <td>{record.reportsNotSent}</td>
                  <td>{record.lastLogin}</td>
                  <td>
                    <button className="btn btn-sm" onClick={() => handleActionClick(record.id, 'options')}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                    </button>
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
