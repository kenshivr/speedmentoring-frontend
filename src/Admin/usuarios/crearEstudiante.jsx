import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [especialidades, setEspecialidades] = useState([]);
  const [mentores, setMentores] = useState([]);

  const [formDataAlumno, setFormDataAlumno] = useState({
    AlumnoID: 0,
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Periodo: '',
    Password: '',
    EspecialidadID: 0,
    RFC: '',
    CorreoElectronico: '',
    NumeroTelefono: '',
    Estado: 0
  });

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
      console.log('Alumno registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container-sm mt-4 p-4" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
            <div className="row justify-content-evenly pt-3">
              <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="AlumnoID" className="form-label">Número de cuenta</label>
                  <input className="form-control" id="AlumnoID" name="AlumnoID" placeholder="Ejemplo de número de cuenta" onChange={handleChange} />
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
                        {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoMaterno} ${mentor.ApellidoPaterno}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" placeholder="nombre@ejemplo.com" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                  <input className="form-control" id="NumeroTelefono" name="NumeroTelefono" placeholder="Ejemplo de teléfono" onChange={handleChange} />
                </div>
                <div className='mb-3 pt-4 mt-2' style={{ maxWidth: '500px' }}>
                  <select className="form-select" aria-label="Default select example" name="EspecialidadID" onChange={handleChange}>
                    <option value="">Especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="Periodo" className="form-label">Periodo</label>
                  <input className="form-control" id="Periodo" name="Periodo" placeholder="Ejemplo de periodo" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="Password" name="Password" placeholder="Contraseña" onChange={handleChange} />
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
                    Registrar
                  </button>
                </div>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
}
