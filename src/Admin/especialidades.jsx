import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LinkAddRed from '../components/Link/LinkAddRed.jsx'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function ManageSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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
    setCurrentPage(0); // Reinicia a la primera página al buscar
  };

  const handleEditClick = (id) => {
    localStorage.setItem('EspecialidadID', id);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredSpecialties.length / itemsPerPage)));
  };

  // Filtrar y paginar las especialidades
  const filteredSpecialties = specialties.filter(specialty => 
    specialty.EspecialidadID.toString().includes(searchTerm) ||
    specialty.Especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * itemsPerPage;
  const selectedSpecialties = filteredSpecialties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
                <LinkAddRed
                  link='/Admin/especialidades/crearEspecialidad'
                />
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {selectedSpecialties.map((specialty) => (
                <tr key={specialty.EspecialidadID}>
                  <td>{specialty.EspecialidadID}</td>
                  <td>{specialty.Especialidad}</td>
                  <td>
                    <div className="dropdown">
                      <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/>
                      </button>

                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                          <Link className="dropdown-item" to={`/Admin/especialidades/editarEspecialidad`} onClick={() => handleEditClick(specialty.EspecialidadID)} >Editar</Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="col d-flex align-items-center justify-content-center mt-4 pt-2">
            <div className='row px-4'>
              <button
                className="btn"
                style={{
                  backgroundColor: '#EFCA45',
                  color: '#4F3F05',
                  borderRadius: '20px',
                  transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
                }}
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                Anterior
              </button>
            </div>
            <div className='row px-4'>
              <button
                className="btn"
                style={{
                  backgroundColor: '#EFCA45',
                  color: '#4F3F05',
                  borderRadius: '20px',
                  transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
                }}
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= filteredSpecialties.length}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
