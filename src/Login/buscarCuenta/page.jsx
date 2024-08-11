import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BuscarCuentaPage() {
  const [id, setId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/buscar', { id });
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
    <div className='mx-5'>
      <div className="alert alert-info m-4" role="alert">
        Para recuperar su contraseña, ingresa tu RFC (mentores) o número de cuenta (estudiantes).
      </div>
      <div className="container-sm my-2" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '25px' }}>
        <div className="container">
          <div className="row w-100 no-gutters">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="container-sm d-flex justify-content-center align-items-center my-4" style={{ backgroundColor: 'rgba(239, 202, 69, 1)', borderRadius: '10px' }}>
                <a className="navbar-brand">
                  <img
                    src="https://dl.dropboxusercontent.com/s/0vq7m1yb79th4m6db15w1/Picture1.png?rlkey=hftdijmja6u93u99020vpv5w5&st=3b51u5c2"
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
                  <label htmlFor="emailInput" className="form-label text-white responsive-text">Usuario</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="emailInput" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ 
                    backgroundColor: '#EFCA45', 
                    color: '#4F3F05', 
                    border: '1px solid #000',
                    borderRadius: '20px',
                    transition: 'background-color 0.3s, color 0.3s' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFCA45';
                    e.currentTarget.style.color = '#4F3F05';
                  }}>
                  Buscar
                </button>
                <Link
                  type="button"
                  className="btn w-100 mt-2"
                  to="/login"
                  style={{ 
                    backgroundColor: '#EBE4CA', 
                    color: '#4F3F05', 
                    border: '1px solid #000',
                    borderRadius: '20px',
                    transition: 'background-color 0.3s, color 0.3s' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EBE4CA';
                    e.currentTarget.style.color = '#4F3F05';
                  }}>
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}