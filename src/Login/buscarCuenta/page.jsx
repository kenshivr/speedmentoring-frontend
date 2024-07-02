import React, { useState } from 'react';
import axios from 'axios';

export default function BuscarCuentaPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/buscar', { email });
      if (response.data.success) {
        alert('Se ha enviado un correo con la nueva contraseña.');
      } else {
        console.log('No existe el correo en la base de datos');
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Error al buscar el correo:', error);
    }
  };

  return (
    <div>
      <div className="alert alert-info mx-5" role="alert">
        Para recuperar su contraseña, ingrese la dirección de correo electrónico que registró en la plataforma.
      </div>
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label text-white responsive-text">Correo</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="emailInput" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
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
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}