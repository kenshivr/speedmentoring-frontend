import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditStudentPage() {
  const { id } = useParams(); // Obtiene el ID del estudiante de la URL
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [formDataAlumno, setFormDataAlumno] = useState({
    EstudianteID: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Periodo: '',
    Password: '',
    EspecialidadID: '',
    RFC: '',
    CorreoElectronico: '',
    NumeroTelefono: '',
    Estado: 0
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/students/${id}`);
        console.log(response.data); // Verifica los datos que estás recibiendo
        setFormDataAlumno(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    if (id) {
      fetchStudentData();
    }

    const fetchData = async () => {
      try {
        // Fetch especialidades
        const espResponse = await axios.get('http://localhost:3001/api/especialidades');
        setEspecialidades(espResponse.data);

        // Fetch mentores
        const menResponse = await axios.get('http://localhost:3001/api/mentors');
        setMentores(menResponse.data);

        // Fetch student data
        const studentResponse = await axios.get(`http://localhost:3001/api/getProfileStudent/${id}`);
        setFormDataAlumno(studentResponse.data);
      } catch (error) {
        console.error("Error en la obtención de datos:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataAlumno(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/students/${id}`, formDataAlumno);
      setSuccessMessage('Alumno actualizado exitosamente');
      navigate(`/Admin/usuarios`); // Redirige a la página de administración de estudiantes
    } catch (error) {
      console.error('Error al actualizar:', error);
      setErrorMessage('Error al actualizar.');
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white' }}>
        <h1 className='text-center mb-5'>Editar Estudiante</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="EstudianteID" className="form-label">Número de cuenta</label>
                <input
                  className="form-control"
                  id="EstudianteID"
                  name="EstudianteID"
                  value={formDataAlumno.EstudianteID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s)</label>
                <input
                  className="form-control"
                  id="Nombre"
                  name="Nombre"
                  value={formDataAlumno.Nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido paterno</label>
                <input
                  className="form-control"
                  id="ApellidoPaterno"
                  name="ApellidoPaterno"
                  value={formDataAlumno.ApellidoPaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido materno</label>
                <input
                  className="form-control"
                  id="ApellidoMaterno"
                  name="ApellidoMaterno"
                  value={formDataAlumno.ApellidoMaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="RFC" className="form-label">Mentor</label>
                <select className="form-select" aria-label="Default select example" name="RFC" value={formDataAlumno.RFC} onChange={handleChange}>
                  <option value="">Mentor</option>
                  {mentores.map((mentor) => (
                    <option key={mentor.RFC} value={mentor.RFC}>
                      {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoMaterno} ${mentor.ApellidoPaterno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="CorreoElectronico"
                  name="CorreoElectronico"
                  value={formDataAlumno.CorreoElectronico}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input
                  className="form-control"
                  id="NumeroTelefono"
                  name="NumeroTelefono"
                  value={formDataAlumno.NumeroTelefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <select className="form-select" aria-label="Default select example" name="EspecialidadID" value={formDataAlumno.EspecialidadID} onChange={handleChange}>
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Periodo" className="form-label">Periodo</label>
                <input
                  className="form-control"
                  id="Periodo"
                  name="Periodo"
                  value={formDataAlumno.Periodo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={formDataAlumno.Password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
                  <button
                    type="submit"
                    className="btn btn-sm w-50 my-4 mx-3"
                    style={{ 
                      backgroundColor: '#EFCA45', 
                      color: '#4F3F05', 
                      border: '1px solid #000',
                      borderRadius:'20px',
                      transition: 'background-color 0.3s, color 0.3s' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFCA45';
                      e.currentTarget.style.color = '#4F3F05';
                    }}
                  >
                    Actualizar
                  </button>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
                  <Link
                    type="button"
                    className="btn btn-sm w-50 mx-3"
                    to="/Admin/usuarios"
                    style={{ 
                      backgroundColor: '#EBE4CA', 
                      color: '#4F3F05', 
                      border: '1px solid #000',
                      borderRadius: '20px',
                      transition: 'background-color 0.3s, color 0.3s' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EBE4CA';
                      e.currentTarget.style.color = '#4F3F05';
                    }}
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
