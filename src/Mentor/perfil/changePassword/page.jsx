import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const characteristics = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/;
    return characteristics.test(pass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(newPassword)) {
      alert('La contraseña no cumple con los requisitos');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      return;
    }

    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.put('http://localhost:3001/api/changePassMentor', {
        userId,
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        alert('Contraseña actualizada correctamente');
        navigate('/Mentor/perfil/page'); // Redirigir a la página principal del mentor
      } else {
        alert('Error al actualizar la contraseña');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="container-sm my-1 mt-5 p-4" style={{ backgroundColor: '#F5E6E8', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
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
                <small className="text-body-secondary">- Al menos 8 carácteres y máximo 20 caracteres.</small>
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
                <small className="text-body-secondary">- Al menos un carácter especial (!, ", #, $, %, &, ', (, ), *, +)</small>
              </h6>
            </div>
          </div>
          <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="currentPassword" className="col-form-label">Contraseña actual</label>
                </div>
                <div className="col-auto" style={{ width: '400px' }}>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    className="form-control" 
                    aria-describedby="passwordHelpInline" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="newPassword" className="col-form-label">Contraseña nueva</label>
                </div>
                <div className="col-auto" style={{ width: '400px' }}>
                  <input 
                    type="password" 
                    id="newPassword" 
                    className="form-control" 
                    aria-describedby="passwordHelpInline" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
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
                  <label htmlFor="confirmPassword" className="col-form-label">Confirmar contraseña</label>
                </div>
                <div className="col-auto" style={{ width: '400px' }}>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="form-control" 
                    aria-describedby="passwordHelpInline" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
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
                    color: 'white',
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
                    color: '#4E4E4E',
                    borderRadius: '20px'
                  }}>
                  Cancelar
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}