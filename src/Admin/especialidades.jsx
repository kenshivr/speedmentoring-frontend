import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from '../components/Search/SearchBar.jsx'; 
import PaginationButtons from '../components/Button/PaginationButtons.jsx'; 
import DropButton1 from '../components/Button/DropButton1.jsx'; 

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
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getSpecialties`);
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
    sessionStorage.setItem('EspecialidadID', id);
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
                    <DropButton1
                      text='Editar'
                      link='/Admin/especialidades/editarEspecialidad'
                      dropOnClick= {() => handleEditClick(specialty.EspecialidadID)}
                    />
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
