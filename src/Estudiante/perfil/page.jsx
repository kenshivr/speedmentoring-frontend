import React from 'react';

export default function Page() {
  return (
    <div className="container-sm my-5" style={{ backgroundColor: 'rgba(245, 230, 232, 0.8)', borderRadius: '25px' }}>
        <div className="container">
          <h2 className="mx-4 pt-4">Cuenta</h2>
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
                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="317285361@pcpuma.acatlan.unam.mx" />
              </div>
            </div>
            <div className="mb-3 row d-flex align-items-center justify-content-center my-4">
                <button
                  type="submit"
                  className="btn btn-sm w-50 my-4"
                  style={{
                    backgroundColor: '#002B7A',
                    color: '#FFFFFF',
                    borderRadius: '20px'
                  }}
                >
                  Guardar
                </button>
              </div>
          </div>
        </div>
      </div>
  );
}