import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        const studentResponse = await axios.get(`http://localhost:3001/api/students/${id}`);
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
      console.log('Alumno actualizado exitosamente');
      navigate(`/Admin/usuarios/administrarEstudiantes`); // Redirige a la página de administración de estudiantes
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container-sm mt-4 p-4" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
          <div className="row justify-content-evenly pt-3">
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="EstudianteID" className="form-label">Número de cuenta</label>
                <input className="form-control" id="EstudianteID" name="EstudianteID" value={formDataAlumno.EstudianteID} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s)</label>
                <input className="form-control" id="Nombre" name="Nombre" value={formDataAlumno.Nombre} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido paterno</label>
                <input className="form-control" id="ApellidoPaterno" name="ApellidoPaterno" value={formDataAlumno.ApellidoPaterno} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido materno</label>
                <input className="form-control" id="ApellidoMaterno" name="ApellidoMaterno" value={formDataAlumno.ApellidoMaterno} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="mentor" className="form-label">Mentor</label>
                <select className="form-select" aria-label="Default select example" name="RFC" value={formDataAlumno.RFC} onChange={handleChange}>
                  <option value="">Mentor</option>
                  {mentores.map((mentor) => (
                    <option key={mentor.RFC} value={mentor.RFC}>
                      {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoMaterno} ${mentor.ApellidoPaterno}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" value={formDataAlumno.CorreoElectronico} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input className="form-control" id="NumeroTelefono" name="NumeroTelefono" value={formDataAlumno.NumeroTelefono} onChange={handleChange} />
              </div>
              <div className='mb-3 pt-4 mt-2' style={{ maxWidth: '500px' }}>
                <select className="form-select" aria-label="Default select example" name="EspecialidadID" value={formDataAlumno.EspecialidadID} onChange={handleChange}>
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Periodo" className="form-label">Periodo</label>
                <input className="form-control" id="Periodo" name="Periodo" value={formDataAlumno.Periodo} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="Password" name="Password" value={formDataAlumno.Password} onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  type="submit"
                  className="btn w-75"
                  style={{
                    backgroundColor: '#EFCA45',
                    color: '#4F3F05',
                    borderColor: '#EFCA45',
                    borderRadius: '20px'
                  }}>
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
