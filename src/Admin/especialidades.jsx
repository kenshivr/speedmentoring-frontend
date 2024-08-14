import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function ManageSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getSpecialties');
        if (response.data) {
          setSpecialties(response.data);
        } else {
          console.error('Error al obtener especialidades:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener especialidades:', error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSpecialties = specialties.filter(specialty => 
    specialty.EspecialidadID.toString().includes(searchTerm) ||
    specialty.Especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id) => {
    localStorage.setItem('EspecialidadID', id);
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-sm-4 mt-1'>
              <legend className='mt-1'>Especialidades</legend>
            </div>
            <div className="col-sm-8 px-2 mt-2">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar especialidad"
                  aria-label="Search"
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Link
                  className="btn btn-sm w-20 pt-2 pb-2"
                  to={`/Admin/especialidades/crearEspecialidad`}
                  style={{
                    backgroundColor: '#db3345',
                    color: '#4F3F05',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s, color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#db3345';
                    e.currentTarget.style.color = '#4F3F05';
                  }}
                >
                   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredSpecialties.map((specialty) => (
                <tr key={specialty.EspecialidadID}>
                  <td>{specialty.EspecialidadID}</td>
                  <td>{specialty.Especialidad}</td>
                  <td>
                    <Link
                      className="btn btn-sm"
                      to={`/Admin/especialidades/editarEspecialidad`}
                      style={{
                        backgroundColor: '#EFCA45',
                        color: '#4F3F05',
                        border: '1px solid #000',
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
                      onClick={() => handleEditClick(specialty.EspecialidadID)}
                    >
                      Editar
                    </Link>
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
