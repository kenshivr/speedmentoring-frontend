import React from 'react';

export default function Page() {
  return (
      <div className="container-sm my-1 mt-5 p-4" style={{ backgroundColor: '#F5E6E8', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
          <div className="row justify-content-evenly">
            <div className="col-12 col-md-6 m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <h1>Cambiar contraseña</h1>
              </div>
              <div className='mb-3'>
                <h6>
                  <small className="text-body-secondary">La contraseña debe contener:</small>
                </h6>
                <h6>
                  <small className="text-body-secondary">- Al menos 8 carácteres.</small>
                </h6>
                <h6>
                  <small className="text-body-secondary">- Al menos una letra mayúscula (A-Z).</small>
                </h6>
                <h6>
                  <small className="text-body-secondary">- Al menos una letra minúscula (a-z).</small>
                </h6>
                <h6>
                  <small className="text-body-secondary">- Al menos un número (0-9).</small>
                </h6>
                <h6>
                  <small className="text-body-secondary">- Al menos un carácter especial (@, &, $, #, ...)</small>
                </h6>
              </div>
            </div>
            <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Contraseña actual</label>
                  </div>
                  <div className="col-auto" style={{ width: '400px' }}>
                    <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"/>
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Contraseña nueva</label>
                  </div>
                  <div className="col-auto" style={{ width: '400px' }}>
                    <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"/>
                  </div>
                  <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                     Debe ser de 8-20 carácteres.
                    </span>
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Confirmar contraseña</label>
                  </div>
                  <div className="col-auto" style={{ width: '400px' }}>
                    <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"/>
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                  <button
                    type="submit"
                    className="btn w-75"
                    style={{
                      backgroundColor: '#002B7A',
                      color:'white',
                      borderRadius: '20px'
                    }}>
                    Guardar
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                  <a
                    type="button"
                    className="btn w-75"
                    href='/Mentor/perfil'
                    style={{
                      backgroundColor: '#A0BAEB',
                      color:'#4E4E4E',
                      borderRadius: '20px'
                    }}>
                    Cancelar
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}