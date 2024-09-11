import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkSecundaryC from '../../components/Link/LinkSecundaryCentered.jsx'; 
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 

export default function AdminEditarMentor() {
  const RFC = localStorage.getItem('MentorRFC');
  const [mentor, setMentor] = useState({
    RFC: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    NumeroTelefono: '',
    CorreoElectronico: '',
    Empresa: '',
    Puesto: '',
    EspecialidadID: ''
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getProfileMentor/${RFC}`);
        //const response = await axios.get(`http://localhost:3001/api/getProfileMentor/${RFC}`);
        if (response.data) {
          setMentor(response.data);
        } else {
          setErrorMessage('No se pudo cargar el mentor.');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud.');
        console.error('Error:', error);
      }
    };

    fetchMentor();

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

    fetchEspecialidades();
  }, [RFC]);

  const handleChange = (e) => {
    setMentor({
      ...mentor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(`${apiUrl}/api/updateMentor/${RFC}`, mentor);
      //const response = await axios.put(`http://localhost:3001/api/updateMentor/${RFC}`, mentor);
      if (response.data.message) {
        setSuccessMessage('Mentor actualizado con éxito.');
      } else {
        setErrorMessage('Error al actualizar el mentor.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Editar Mentor</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="RFC" className="form-label">RFC</label>
                <input
                  type="text"
                  className="form-control"
                  id="RFC"
                  name="RFC"
                  placeholder="RFC del mentor"
                  value={mentor.RFC}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Nombre del mentor"
                  value={mentor.Nombre}
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
                  value={mentor.ApellidoPaterno}
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
                  value={mentor.ApellidoMaterno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Número de Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="NumeroTelefono"
                  name="NumeroTelefono"
                  placeholder="Número de Teléfono"
                  value={mentor.NumeroTelefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="CorreoElectronico"
                  name="CorreoElectronico"
                  placeholder="Correo Electrónico"
                  value={mentor.CorreoElectronico}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Empresa" className="form-label">Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  id="Empresa"
                  name="Empresa"
                  placeholder="Empresa"
                  value={mentor.Empresa}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Puesto" className="form-label">Puesto</label>
                <input
                  type="text"
                  className="form-control"
                  id="Puesto"
                  name="Puesto"
                  placeholder="Puesto"
                  value={mentor.Puesto}
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
                  value={mentor.EspecialidadID}
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
                    <ButtonPrincipalC
                      text='Registrar'
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <LinkSecundaryC
                      link="/Admin/mentores"
                      text='Cancelar'
                    />
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
