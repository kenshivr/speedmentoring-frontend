import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import SearchBar from '../components/Search/SearchBar.jsx'; 
import PaginationButtons from '../components/Button/PaginationButtons.jsx'; 
import DropButton3 from '../components/Button/DropButton3.jsx'; 

export default function Page() {
  const [mentors, setMentors] = useState([]);
  const [mentorSearchTerm, setMentorSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/mentors`);
        setMentors(response.data);
      } catch (error) {
        console.error("Error en la obtención de los mentores:", error);
      }
    };

    getMentors();
  }, []);

  const handleSearchMentorChange = (event) => {
    setMentorSearchTerm(event.target.value);
    setCurrentPage(0); 
  };

  const handleEditClickMentor = (id) => {
    localStorage.setItem('MentorRFC', id);
  };

  const updateStatus = async (type, id, status) => {
    try {
        await axios.put(`http://localhost:3001/api/mentors/${id}`, { Estatus: status });
        setMentors(prev => prev.map(mentor => mentor.RFC === id ? { ...mentor, Estatus: status } : mentor));
    } catch (error) {
      console.error(`Error al actualizar el estado del ${type}:`, error);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredMentors.length / itemsPerPage)));
  };

  // Filtrar y paginar los mentores
  const filteredMentors = mentors.filter(mentor => {
    const searchTermLower = mentorSearchTerm.toLowerCase();
    return (
      (mentor.RFC ? mentor.RFC.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.Nombre ? mentor.Nombre.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.ApellidoPaterno ? mentor.ApellidoPaterno.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.ApellidoMaterno ? mentor.ApellidoMaterno.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.NumeroTelefono ? mentor.NumeroTelefono.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.EspecialidadID ? mentor.EspecialidadID.toString().toLowerCase().includes(searchTermLower) : false) ||
      (mentor.Empresa ? mentor.Empresa.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.Puesto ? mentor.Puesto.toLowerCase().includes(searchTermLower) : false) ||
      (mentor.CorreoElectronico ? mentor.CorreoElectronico.toLowerCase().includes(searchTermLower) : false)
    );
  });

  const startIndex = currentPage * itemsPerPage;
  const selectedMentors = filteredMentors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <SearchBar
          legendText= 'Mentores'
          searchPlaceholder= 'Buscar mentor'
          searchValue={mentorSearchTerm}
          onSearchChange={handleSearchMentorChange}
          buttonLink= '/Admin/usuarios/crearMentor'
        />
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">RFC</th>
                  <th scope="col">Estatus</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido paterno</th>
                  <th scope="col">Apellido materno</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Especialidad</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Puesto</th>
                  <th scope="col">E-mail</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {selectedMentors.map(mentor => (
                  <tr key={mentor.RFC}>
                    <td>{mentor.RFC}</td>
                    <td>{mentor.Estatus}</td>
                    <td>{mentor.Nombre}</td>
                    <td>{mentor.ApellidoPaterno}</td>
                    <td>{mentor.ApellidoMaterno}</td>
                    <td>{mentor.NumeroTelefono}</td>
                    <td>{mentor.EspecialidadID}</td>
                    <td>{mentor.Empresa}</td>
                    <td>{mentor.Puesto}</td>
                    <td>{mentor.CorreoElectronico}</td>
                    <td>
                      <DropButton3
                        text1='Editar'
                        link1='/Admin/usuarios/editarMentor'
                        dropOnClick1= {() => handleEditClickMentor(mentor.RFC)}
                        text2='Habilitar'
                        dropOnClick2={() => updateStatus('mentors', mentor.RFC, 1)}
                        text3='Deshabilitar'
                        dropOnClick3={() => updateStatus('mentors', mentor.RFC, 0)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationButtons
            onPrevious = {handlePrevious}
            onNext = {handleNext}
            isPreviousDisabled = {currentPage === 0}
            isNextDisabled = {startIndex + itemsPerPage >= filteredMentors.length}
          />
        </div>
    </div>
  );
}
