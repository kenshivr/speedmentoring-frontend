import React from 'react';
import Layout from '../../components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="student">
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
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Número de teléfono</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="phoneNumber"
                  value="5521905108"
                  aria-label="Número de teléfono"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Correo electrónico</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value="317285361@pcpuma.acatlan.unam.mx"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>
            <div className="my-5 mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Empresa</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value="Google Inc"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Puesto</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value="Desarrollador web"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="row w-100 no-gutters">
                <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                  <label htmlFor="especialidad" className="col-sm-4 col-form-label mx-2">Especialidad</label>
                  <select className="form-select auto-width-select" id="especialidad" aria-label="Default select example">
                    <option selected>Seleccionar</option>
                    <option value="1">Ciencia de datos</option>
                    <option value="2">Desarrollo web</option>
                    <option value="3">Machine Learning</option>
                  </select>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <button
                      type="submit"
                      className="btn w-100"
                      style={{
                        backgroundColor: '#002B7A',
                        color: '#FFFFFF',
                        borderRadius: '20px'
                      }}>
                      Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}