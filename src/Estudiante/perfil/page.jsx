import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Page() {
  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStudent/${user}`);
      const { Nombre, Periodo, Especialidad } = response.data;
      setNombre(Nombre);
      setPeriodo(Periodo);
      setEspecialidad(Especialidad);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + error.response.data.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [fetchUserData, user]);

  return (
    <div className="container-sm my-5" style={{ backgroundColor: 'rgba(245, 230, 232, 0.8)', borderRadius: '25px' }}>
      <div className="container">
        <h2 className="mx-4 pt-4">Cuenta</h2>
        <div className="m-5">
          <div className="mb-3 row justify-content-between">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Nombre</label>
            <div className="col-sm-6">
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="staticEmail" 
                value={nombre || ''} 
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-between">
            <label htmlFor="especialidad" className="col-sm-4 col-form-label">Especialidad</label>
            <div className="col-sm-7">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="especialidad"
                value={especialidad || ''}
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-between">
            <label htmlFor="periodo" className="col-sm-4 col-form-label">Periodo</label>
            <div className="col-sm-6">
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="periodo" 
                value={periodo || ''} 
              />
            </div>
          </div>
          <div className="mb-3 row d-flex align-items-center justify-content-center my-4">
            <Link to="/Estudiante/perfil/changePassword/page" className="btn btn-sm w-50 my-4" style={{ backgroundColor: '#002B7A', color: '#FFFFFF', borderRadius: '20px' }}>
              Cambiar contraseña
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
