import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LinkSecundaryC from '../../components/Link/LinkSecundary_Centered.jsx'; 
import ButtonPrincipalC from '../../components/Button/ButtonPrincipal_Centered_typeSubmit.jsx'; 

export default function Page() {
  const [especialidades, setEspecialidades] = useState([]);
  const [mentores, setMentores] = useState([]);

  const [formDataAlumno, setFormDataAlumno] = useState({
    EstudianteID: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Periodo: '',
    PasswordHash: '',
    EspecialidadID: 0,
    MentorRFC: '',
    CorreoElectronico: '',
    NumeroTelefono: '',
    Estado: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch especialidades
    const getEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/especialidades');
        setEspecialidades(response.data);
      } catch (error) {
        console.error("Error en la obtención de especialidades:", error);
      }
    };

    // Fetch mentores
    const getMentores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/mentors');
        setMentores(response.data);
      } catch (error) {
        console.error("Error en la obtención de mentores:", error);
      }
    };

    getEspecialidades();
    getMentores();
  }, []);

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
      await axios.post('http://localhost:3001/api/setNewAlumno', formDataAlumno);
      navigate('/Admin/estudiantes');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Registrar estudiante</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="EstudianteID" className="form-label">Número de cuenta</label>
                <input className="form-control" id="EstudianteID" name="EstudianteID" placeholder="Ejemplo de número de cuenta" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Periodo" className="form-label">Periodo</label>
                <input className="form-control" id="Periodo" name="Periodo" placeholder="Ejemplo de periodo" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s)</label>
                <input className="form-control" id="Nombre" name="Nombre" placeholder="Ejemplo de nombre" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido paterno</label>
                <input className="form-control" id="ApellidoPaterno" name="ApellidoPaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido materno</label>
                <input className="form-control" id="ApellidoMaterno" name="ApellidoMaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="mentor" className="form-label">Mentor</label>
                <select className="form-select" aria-label="Default select example" name="RFC" onChange={handleChange}>
                  <option value="">Mentor</option>
                  {mentores.map((mentor) => (
                    <option key={mentor.RFC} value={mentor.RFC}>
                      {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoPaterno} ${mentor.ApellidoMaterno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" placeholder="nombre@ejemplo.com" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input className="form-control" id="NumeroTelefono" name="NumeroTelefono" placeholder="Ejemplo de teléfono" onChange={handleChange} />
              </div>
              <div className='mb-3'>
                <label htmlFor="NumeroTelefono" className="form-label">Especialidad</label>
                <select className="form-select" aria-label="Default select example" name="EspecialidadID" onChange={handleChange}>
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.EspecialidadID} value={especialidad.EspecialidadID}>{especialidad.Especialidad} - {especialidad.EspecialidadID}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="PasswordHash" className="form-label">Fecha de nacimiento</label>
                <input className="form-control" id="PasswordHash" name="PasswordHash" placeholder="AAAAMMDD" onChange={handleChange} />
              </div>
              <div className="row">
                <div className="row justify-content-end mt-4 mb-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                    <ButtonPrincipalC
                      text='Registrar'
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <LinkSecundaryC
                      link="/Admin/estudiantes"
                      text='Cancelar'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
