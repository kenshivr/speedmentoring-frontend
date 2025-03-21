import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Search/SearchBar.jsx';
import DropButton3 from '../components/Button/DropButton3.jsx';
import PaginationButtons from '../components/Button/PaginationButtons.jsx';

export default function Page() {
  const itemsPerPage = 5;
  const [students, setStudents] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  
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
  
    const getStudents = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/students`);
        const sortedStudents = response.data.sort((a, b) => a.ApellidoPaterno.localeCompare(b.ApellidoPaterno));
        setStudents(sortedStudents);
      } catch (error) {
        console.error("Error en la obtención de los estudiantes:", error);
      }
    };
  
    fetchSpecialties();
    getStudents();
  }, []);
  
  const handleSearchStudentChange = (event) => {
    setStudentSearchTerm(event.target.value);
    setCurrentPage(0);
  };
  
  const handleEditClickStudent = (id) => {
    sessionStorage.setItem('EstudianteID', id);
  };
  
  const updateStatus = async (type, id, status) => {
    let Estatus = status ? 'Activo' : 'Inactivo';
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      await axios.put(`${apiUrl}/api/students/${id}`, { Estatus: status });
      setStudents(prev => prev.map(student => student.EstudianteID === id ? { ...student, Estatus } : student));
    } catch (error) {
      console.error(`Error al actualizar el estado del ${type}:`, error);
    }
  };
  
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredStudents.length / itemsPerPage)));
  };
  
  const filteredStudents = students.map(student => {
    const specialty = specialties.find(s => s.EspecialidadID === student.EspecialidadID);
    return { ...student, Especialidad: specialty ? specialty.Especialidad : 'No Asignada' };
  }).filter(student => {
    const searchTermLower = studentSearchTerm.toLowerCase();
    return (
      student.EstudianteID.toString().toLowerCase().includes(searchTermLower) ||
      student.Nombre.toLowerCase().includes(searchTermLower) ||
      student.ApellidoPaterno.toLowerCase().includes(searchTermLower) ||
      student.ApellidoMaterno.toLowerCase().includes(searchTermLower) ||
      student.NumeroTelefono?.toLowerCase().includes(searchTermLower) ||
      student.Especialidad.toLowerCase().includes(searchTermLower) ||
      student.MentorNombre?.toLowerCase().includes(searchTermLower) ||
      student.CorreoElectronicoPersonal?.toLowerCase().includes(searchTermLower) ||
      student.Periodo.toLowerCase().includes(searchTermLower)
    );
  });
  
  const startIndex = currentPage * itemsPerPage;
  const selectedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <SearchBar
          legendText='Estudiantes'
          searchPlaceholder='Buscar estudiante'
          searchValue={studentSearchTerm}
          onSearchChange={handleSearchStudentChange}
          buttonLink='/Admin/usuarios/crearEstudiante'
        />
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Número de cuenta</th>
                <th scope="col">Estatus</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido paterno</th>
                <th scope="col">Apellido materno</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Periodo</th>
                <th scope="col">Mentor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {selectedStudents.map(student => (
                <tr key={student.EstudianteID}>
                  <td>{student.EstudianteID}</td>
                  <td>{student.Estatus}</td>
                  <td>{student.Nombre}</td>
                  <td>{student.ApellidoPaterno}</td>
                  <td>{student.ApellidoMaterno}</td>
                  <td>{student.NumeroTelefono}</td>
                  <td>{student.Especialidad}</td>
                  <td>{student.CorreoElectronicoPersonal}</td>
                  <td>{student.Periodo}</td>
                  <td>{student.MentorNombre || 'No asignado'}</td>
                  <td>
                    <DropButton3
                      text1='Editar'
                      link1='/Admin/usuarios/editarEstudiante'
                      dropOnClick1={() => handleEditClickStudent(student.EstudianteID)}
                      text2='Habilitar'
                      dropOnClick2={() => updateStatus('students', student.EstudianteID, 1)}
                      text3='Deshabilitar'
                      dropOnClick3={() => updateStatus('students', student.EstudianteID, 0)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          isPreviousDisabled={currentPage === 0}
          isNextDisabled={startIndex + itemsPerPage >= filteredStudents.length}
        />
      </div>
    </div>
  );
}