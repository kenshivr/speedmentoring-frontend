import React from 'react';
import Layout from '../Components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="none">
      <div> 
        <div className="container-sm my-5" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '25px' }}>
          <div className="container">
            <div className="row w-100 no-gutters">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className="container-sm d-flex justify-content-center align-items-center my-4" style={{ backgroundColor: 'rgba(239, 202, 69, 1)', borderRadius: '10px' }}>
                  <a className="navbar-brand" href="https://www.acatlan.unam.mx/">
                    <img 
                      src="https://www.acatlan.unam.mx/identidad-acatlan/img/Logotipos/Escudo/escudo-a.png" 
                      alt="Logo Fes Acatlan" 
                      className="img-fluid my-4" 
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </a>
                </div>
              </div>

              <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label text-white responsive-text">Correo</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label text-white responsive-text">Contraseña</label>
                    <input type="password" className="form-control" id="inputPassword" />
                  </div>
                  <div className="mb-3">
                    <h6 style={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
                      <a href="/login/buscarCuenta" style={{ color: 'white', textDecoration: 'underline' }}>¿Haz olvidado tu contraseña?</a>
                    </h6>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: '#EFCA45',
                      color: '#4F3F05',
                      borderColor: '#EFCA45',
                      borderRadius: '20px'
                    }}>
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}