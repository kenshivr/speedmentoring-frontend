import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/mentors`);
        const data = response.data;
        console.log(response.data);
        setMentors(data);
      } catch (error) {
        console.error("Error en la obtencion de los mentores:", error);
      }
    };

    const getStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/students`);
        const data = response.data;
        console.log(response.data);
        setStudents(data);
      } catch (error) {
        console.error("Error en la obtencion de los estudiantes: ", error);
      }
    };

    getMentors();
    getStudents();
  }, []);

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
                // value={}
                // onChange={}
              />
              
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

              {mentors.map(mentor => (
                <tr key={mentor.MentorRFC}>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>{mentor.MentorRFC}</td>
                  <td>{mentor.Estado}</td>
                  <td>{mentor.Nombre}</td>
                  <td>{mentor.ApellidoPaterno}</td>
                  <td>{mentor.ApellidoMaterno}</td>
                  <td>{'Mentor'}</td>
                  <td>{mentor.NumeroTelefono}</td>
                  <td>{mentor.EspecialidadID}</td>
                  <td>{mentor.CorreoElectronico}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>
                    {/* <button className="btn btn-sm" onClick={() => handleActionClick(record.id, 'options')}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                    </button> */}
                  </td>
                </tr>
              ))}

              {students.map(student => (
                <tr key={student.AlumnoID}>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>{student.AlumnoID}</td>
                  <td>{student.Estado}</td>
                  <td>{student.Nombre}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'Alumno'}</td>
                  <td>{'N/A'}</td>
                  <td>{student.EspecialidadID}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
                  <td>{'N/A'}</td>
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
    </div>
  );
}
