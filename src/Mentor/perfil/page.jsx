import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page({ userId }) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getUserProfile/${userId}`);
        const { numerotelefono, correoelectronico, empresa, puesto, especialidad } = response.data;
        setPhoneNumber(numerotelefono);
        setEmail(correoelectronico);
        setCompany(empresa);
        setPosition(puesto);
        setSpecialty(especialidad);
      } catch (error) {
        alert('Error al obtener los datos del usuario: ' + error.response.data.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/updateProfileMentor', {
        userId,
        phoneNumber,
        email,
        company,
        position,
        specialty,
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error al guardar los datos: ' + error.response.data.message);
    }
  };

  return (
    <div className="container-sm my-5" style={{ backgroundColor: 'rgba(245, 230, 232, 0.8)', borderRadius: '25px' }}>
      <div className="container">
        <h2 className="mx-5">Cuenta</h2>
        <div className="m-5">

          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nombre</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="Erick Pérez Mendoza" />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Número de teléfono</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                aria-label="Número de teléfono"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Correo electrónico"
              />
            </div>
          </div>

          <div className="my-5 mb-3 row">
            <label htmlFor="company" className="col-sm-2 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                aria-label="Empresa"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="position" className="col-sm-2 col-form-label">Puesto</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                aria-label="Puesto"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="row w-100 no-gutters">
              <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <label htmlFor="especialidad" className="col-sm-4 col-form-label mx-2">Especialidad</label>
                <select
                  className="form-select auto-width-select"
                  id="especialidad"
                  value="Prueba"
                  onChange={(e) => setSpecialty(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value=''>Seleccionar</option>
                  <option value="Ciencia de datos">Ciencia de datos</option>
                  <option value="Desarrollo web">Desarrollo web</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <button
                  type="button"
                  className="btn w-100"
                  style={{ backgroundColor: '#002B7A', color: '#FFFFFF', borderRadius: '20px' }}
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}