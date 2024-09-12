import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkSecundaryC from '../../components/Link/LinkSecundaryCentered.jsx'; 
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 

export default function EditStudentPage() {
  const id = sessionStorage.getItem('EstudianteID');
  const [formDataAlumno, setFormDataAlumno] = useState({
    EstudianteID: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Periodo: '',
    EspecialidadID: '',
    MentorRFC: '',
    CorreoElectronicoPersonal: '',
    NumeroTelefono: '',
    Estado: 0
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getStudent/${id}`);
        //const response = await axios.get(`http://localhost:3001/api/getStudent/${id}`);
        if (response.data) {
          setFormDataAlumno(response.data);
        } else {
          setErrorMessage('No se pudo cargar el estudiante.');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud.');
        console.error('Error:', error);
      }
    };

    const fetchEspecialidades = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getSpecialties`);
        //const response = await axios.get(`http://localhost:3001/api/getSpecialties`);
        if (response.data) {
          setEspecialidades(response.data);
        } else {
          console.error('Error al obtener especialidades:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener especialidades:', error);
      }
    };

    const fetchMentores = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/mentors`);
        //const response = await axios.get(`http://localhost:3001/api/mentors`);
        if (response.data) {
          setMentores(response.data);
        } else {
          console.error('Error al obtener mentores:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener mentores:', error);
      }
    };

    if (id) {
      fetchStudentData();
    }
    fetchEspecialidades();
    fetchMentores();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataAlumno({
      ...formDataAlumno,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${apiUrl}/api/students/${id}`, formDataAlumno);
      //const response = await axios.put(`http://localhost:3001/api/students/${id}`, formDataAlumno);
      if (response.data.success) {
        setSuccessMessage('Estudiante actualizado con éxito.');
      } else {
        setErrorMessage('Error al actualizar el estudiante.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Editar Estudiante</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="EstudianteID" className="form-label">Número de cuenta</label>
                <input
                  type="text"
                  className="form-control"
                  id="EstudianteID"
                  name="EstudianteID"
                  placeholder="Ejemplo de número de cuenta"
                  value={formDataAlumno.EstudianteID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Periodo" className="form-label">Periodo</label>
                <input
                  type="text"
                  className="form-control"
                  id="Periodo"
                  name="Periodo"
                  placeholder="Periodo del estudiante"
                  value={formDataAlumno.Periodo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s)</label>
                <input
                  type="text"
                  className="form-control"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Nombre del estudiante"
                  value={formDataAlumno.Nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido Paterno</label>
                <input
                  type="text"
                  className="form-control"
                  id="ApellidoPaterno"
                  name="ApellidoPaterno"
                  placeholder="Apellido Paterno"
                  value={formDataAlumno.ApellidoPaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido Materno</label>
                <input
                  type="text"
                  className="form-control"
                  id="ApellidoMaterno"
                  name="ApellidoMaterno"
                  placeholder="Apellido Materno"
                  value={formDataAlumno.ApellidoMaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="MentorRFC" className="form-label">Mentor</label>
                <select
                  className="form-select"
                  id="MentorRFC"
                  name="MentorRFC"
                  value={formDataAlumno.MentorRFC}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un mentor</option>
                  {mentores.map((mentor) => (
                    <option key={mentor.RFC} value={mentor.RFC}>
                      {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoMaterno} ${mentor.ApellidoPaterno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronicoPersonal" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="CorreoElectronicoPersonal"
                  name="CorreoElectronicoPersonal"
                  placeholder="Correo Electrónico Personal"
                  value={formDataAlumno.CorreoElectronicoPersonal}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="NumeroTelefono"
                  name="NumeroTelefono"
                  placeholder="Número de Teléfono"
                  value={formDataAlumno.NumeroTelefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="EspecialidadID" className="form-label">Especialidad</label>
                <select
                  className="form-select"
                  id="EspecialidadID"
                  name="EspecialidadID"
                  value={formDataAlumno.EspecialidadID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.EspecialidadID} value={especialidad.EspecialidadID}>
                      {especialidad.Especialidad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="row justify-content-end mt-4 mb-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                    <ButtonPrincipalC text="Registrar" />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <LinkSecundaryC link="/Admin/estudiantes" text="Cancelar" />
                  </div>
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
