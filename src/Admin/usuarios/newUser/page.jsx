'use client';

import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout';

export default function Page() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  
  return (
    <Layout navbar={true} userType="admin">
      <div className='container mt-5 p-1' style={{ maxWidth: '950px' }}>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ backgroundColor: '#EFCA45', color: '#4F3F05', maxWidth: '500px' }}
          onChange={handleUserTypeChange}
        >
          <option value="none">Tipo de usuario</option>
          <option value="estudiante">Estudiante</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <div className="container-sm my-1" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight:'410px', margin: 'auto' }}>
        {userType === 'estudiante' && (
          <div className="row justify-content-evenly">
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Número de cuenta</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Ejemplo de número de cuenta" />
              </div>
              <div className='mb-3' style={{ maxWidth: '500px' }}>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Especialidad</option>
                  <option value="1">Ciencia de datos</option>
                  <option value="2">Desarrollo web</option>
                  <option value="3">Base de datos</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
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
        )}
        {userType === 'mentor' && (
          <div className="row justify-content-evenly">
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre(s)</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Ejemplo de nombre" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Apellido paterno</label>
                <input className="form-control" id="exampleFormControlInput2" placeholder="Ejemplo de apellido" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Apellido materno</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de apellido" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput4" className="form-label">Especialidad</label>
                <input className="form-control" id="exampleFormControlInput4" placeholder="Ejemplo de especialidad" />
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput5" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="exampleFormControlInput5" placeholder="nombre@ejemplo.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput6" className="form-label">Teléfono</label>
                <input className="form-control" id="exampleFormControlInput6" placeholder="Ejemplo de teléfono" />
              </div>
              <div className='mb-3 mt-4' style={{ maxWidth: '500px' }}>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Especialidad</option>
                  <option value="1">Ciencia de datos</option>
                  <option value="2">Desarrollo web</option>
                  <option value="3">Base de datos</option>
                </select>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
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
        )}
      </div>
    </Layout>
  );
}
