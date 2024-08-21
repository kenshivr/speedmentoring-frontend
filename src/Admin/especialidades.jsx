import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SearchBar from '../components/Search/SearchBar.jsx'; 
import PaginationButtons from '../components/Button/PaginationButtons.jsx'; 

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
        <SearchBar
          legendText= 'Especialidades'
          searchPlaceholder= 'Buscar especialidad'
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
          buttonLink= '/Admin/especialidades/crearEspecialidad'
        />
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
          <PaginationButtons
            onPrevious = {handlePrevious}
            onNext = {handleNext}
            isPreviousDisabled = {currentPage === 0}
            isNextDisabled = {startIndex + itemsPerPage >= filteredSpecialties.length}
          />
          </div>
        </div>
      </div>
  );
}
