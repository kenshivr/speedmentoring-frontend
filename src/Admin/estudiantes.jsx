import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import LinkAdd_Red from './../components/Link/LinkAdd_Red.jsx'; 

export default function Page() {
  const [students, setStudents] = useState([]);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error en la obtención de los estudiantes:", error);
      }
    };

    getStudents();
  }, []);

  const handleSearchStudentChange = (event) => {
    setStudentSearchTerm(event.target.value);
  };

  const handleEditClickStudent = (id) => {
    localStorage.setItem('EstudianteID', id);
  };

  const updateStatus = async (type, id, status) => {
    try {
      await axios.put(`http://localhost:3001/api/students/${id}`, { Estatus: status });
      setStudents(prev => prev.map(student => student.EstudianteID === id ? { ...student, Estatus: status } : student));
    } catch (error) {
      console.error(`Error al actualizar el estado del ${type}:`, error);
    }
  };

  const filteredStudents = students.filter(student => {
    const searchTermLower = studentSearchTerm.toLowerCase();
    return (
      (student.EstudianteID ? student.EstudianteID.toString().toLowerCase().includes(searchTermLower) : false) ||
      (student.Nombre ? student.Nombre.toLowerCase().includes(searchTermLower) : false) ||
      (student.ApellidoPaterno ? student.ApellidoPaterno.toLowerCase().includes(searchTermLower) : false) ||
      (student.ApellidoMaterno ? student.ApellidoMaterno.toLowerCase().includes(searchTermLower) : false) ||
      (student.NumeroTelefono ? student.NumeroTelefono.toLowerCase().includes(searchTermLower) : false) ||
      (student.EspecialidadID ? student.EspecialidadID.toString().toLowerCase().includes(searchTermLower) : false) ||
      (student.MentorRFC ? student.MentorRFC.toString().toLowerCase().includes(searchTermLower) : false) ||
      (student.CorreoElectronicoPersonal ? student.CorreoElectronicoPersonal.toLowerCase().includes(searchTermLower) : false) ||
      (student.Periodo ? student.Periodo.toLowerCase().includes(searchTermLower) : false)
    );
  });

  return (
    <div className="container-sm my-2 py-3">
        <div className="container p-4" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-sm-4 mt-1'>
              <legend>Estudiantes</legend>
            </div>
            <div className="col-sm-8 px-2 mt-1">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px" }}
                  value={studentSearchTerm}
                  onChange={handleSearchStudentChange}
                />
                <LinkAdd_Red
                  link='/Admin/usuarios/crearEstudiante'
                />
              </form>
            </div>
          </div>
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
                  <th scope="col">E-mail</th>
                  <th scope="col">E-mail institucional</th>
                  <th scope="col">Periodo</th>
                  <th scope="col">RFC mentor</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {filteredStudents.map(student => (
                  <tr key={student.EstudianteID}>
                    <td>{student.EstudianteID}</td>
                    <td>{student.Estatus}</td>
                    <td>{student.Nombre}</td>
                    <td>{student.ApellidoPaterno}</td>
                    <td>{student.ApellidoMaterno}</td>
                    <td>{student.NumeroTelefono}</td>
                    <td>{student.EspecialidadID}</td>
                    <td>{student.CorreoElectronicoPersonal}</td>
                    <td>{student.EstudianteID ? `${student.EstudianteID}@pcpuma.acatlan.unam.mx` : 'N/A'}</td>
                    <td>{student.Periodo}</td>
                    <td>{student.MentorRFC}</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm dropdown-toggle" type="button" id={`dropdownMenuButton-${student.EstudianteID}`} data-bs-toggle="dropdown" aria-expanded="false"/>
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${student.EstudianteID}`}>
                          <li>
                            <Link className="dropdown-item" to={`/Admin/usuarios/editarEstudiante`} onClick={() => handleEditClickStudent(student.EstudianteID)}>Editar</Link>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => updateStatus('students', student.EstudianteID, 1)}>Habilitar</button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => updateStatus('students', student.EstudianteID, 0)}>Deshabilitar</button>
                          </li>
                        </ul>
                      </div>
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
