import React, { useState } from 'react';

const ClientComponent = ({ onSubmit }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(correo, password);
  };

  const handleForgotPassword = () => {
    // Aquí puedes manejar la lógica para redirigir a la página de recuperación de contraseña
    console.log('Redirect to forgot password page');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label text-white responsive-text">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label text-white responsive-text">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <h6 style={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
            <span
              onClick={handleForgotPassword}
              style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
            >
              ¿Haz olvidado tu contraseña?
            </span>
          </h6>
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: '#EFCA45',
            color: '#4F3F05',
            borderColor: '#EFCA45',
            borderRadius: '20px',
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default ClientComponent;