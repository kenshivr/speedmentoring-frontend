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
      <h1 className='ms-4' style={{ color: 'white' }}>Especialidades</h1>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3">
          <div className="col-sm-6 col-md-12">
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
                className="btn btn-danger btn-outline-light btn-sm"
                to="/Admin/especialidades/crearEspecialidad"
                role="button"
              >
                Nueva especialidad
              </Link>
            </form>
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
