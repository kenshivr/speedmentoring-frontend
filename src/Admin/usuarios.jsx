import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Page() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/mentors`);
        const data = response.data;
        setMentors(data);
      } catch (error) {
        console.error("Error en la obtencion de los mentores:", error);
      }
    };

    const getStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/students`);
        const data = response.data;
        setStudents(data);
      } catch (error) {
        console.error("Error en la obtencion de los estudiantes: ", error);
      }
    };

    getMentors();
    getStudents();
  }, []);

  return (
    <div className="container-sm my-2 p-3">
      <div className="container-sm p-3">
        <div className="container p-4" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-sm-4 mt-1'>
              <legend>Mentores</legend>
            </div>
            <div className="col-sm-8 px-2 mt-1">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px"}}
                  // value={}
                  // onChange={}
                />
              </form>
            </div>
          </div>
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
                  <th scope="col">E-mail</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {mentors.map(mentor => (
                  <tr key={mentor.RFC}>
                    <td>{mentor.RFC}</td>
                    <td>{mentor.Estatus}</td>
                    <td>{mentor.Nombre}</td>
                    <td>{mentor.ApellidoPaterno}</td>
                    <td>{mentor.ApellidoMaterno}</td>
                    <td>{mentor.NumeroTelefono}</td>
                    <td>{mentor.EspecialidadID}</td>
                    <td>{mentor.CorreoElectronico}</td>
                    <td>
                      {/* <button className="btn btn-sm" onClick={() => handleActionClick(record.id, 'options')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="container p-4 mt-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
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
                  style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px"}}
                  // value={}
                  // onChange={}
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {students.map(student => (
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
                    <td>
                      {/* <button className="btn btn-sm" onClick={() => handleActionClick(record.id, 'options')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='row justify-content-center mt-4'>
          <div className='col-12 col-md-6 col-lg-2 mb-3'>
            <Link
              className="btn btn-sm w-100"
              to={`/Admin/usuarios/importarUsuarios`}
              style={{
                backgroundColor: '#EFCA45',
                color: '#4F3F05',
                borderRadius: '5px',
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
              Importar
            </Link>
          </div>
          <div className='col-12 col-md-6 col-lg-2'>
            <Link
              to="/Admin/usuarios/crearUsuario"
              className="btn btn-danger btn-outline-light btn-sm w-100"
              role="button"
            >
              Nuevo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
