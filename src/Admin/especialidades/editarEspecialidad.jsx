import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 
import LinkSecundaryC from '../../components/Link/LinkSecundaryCentered.jsx'; 

export default function AdminEditarEspecialidad() {
  const id = localStorage.getItem('EspecialidadID');
  const [specialtyName, setSpecialtyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/especialidad/${id}`);
        //const response = await axios.get(`http://localhost:3001/api/especialidad/${id}`);
        if (response.data) {
          setSpecialtyName(response.data.Especialidad);
        } else {
          setErrorMessage('No se pudo cargar la especialidad.');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud.');
        console.error('Error:', error);
      }
    };

    fetchSpecialty();
  }, [id]);

  const handleChange = (e) => {
    setSpecialtyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(`${apiUrl}/api/updateSpecialty/${id}`, { Especialidad: specialtyName });
      //const response = await axios.put(`http://localhost:3001/api/updateSpecialty/${id}`, { Especialidad: specialtyName });
      if (response.data.success) {
        setSuccessMessage('Especialidad actualizada con éxito.');
      } else {
        setErrorMessage('Error al actualizar la especialidad.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5'>Editar Especialidad</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="specialtyName" className="form-label">Nombre de la Especialidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="specialtyName"
                  name="specialtyName"
                  placeholder="Nombre de la especialidad"
                  value={specialtyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row justify-content-end mt-4 mb-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <ButtonPrincipalC
                    text=' Editar '
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <LinkSecundaryC
                    text='Cancelar'
                    link='/Admin/especialidades'
                  />
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
