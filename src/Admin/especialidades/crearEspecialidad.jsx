import React, { useState } from 'react';
import axios from 'axios';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx'; 

export default function CreateSpecialty() {
  const [specialtyName, setSpecialtyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSpecialtyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/createSpecialty`, { Especialidad: specialtyName });
      //const response = await axios.post(`http://localhost:3001/api/createSpecialty`, { Especialidad: specialtyName });
      if (response.data.success) {
        setSuccessMessage('Especialidad creada con éxito.');
        setSpecialtyName('');
      } else {
        setErrorMessage('Error al crear la especialidad.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5'>Registrar especialidad</h1>
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
                    text='Crear'
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <LinkSecundaryCentered
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
