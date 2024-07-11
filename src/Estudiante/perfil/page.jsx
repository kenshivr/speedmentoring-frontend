import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  // Función para obtener los datos del estudiante
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStudent/${user}`);
      const { nombre, periodo, especialidad } = response.data;
      setNombre(nombre);
      setPeriodo(periodo);
      setEspecialidad(especialidad);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + error.response.data.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData(); // Llama a fetchUserData cuando el componente se monta y user está definido
    }
  }, [fetchUserData, user]);

  // Manejar cambio en la especialidad
  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  // Guardar cambios en la especialidad
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/updateStudent/${user}`, { especialidad });
      alert('Especialidad actualizada correctamente');
      // Opcional: Actualizar la vista con los nuevos datos después de la actualización
      fetchUserData();
    } catch (error) {
      alert('Error al guardar los cambios: ' + error.response.data.message);
    }
  };

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
                value={nombre || ' '} 
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-between">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Especialidad</label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                id="especialidad"
                value={especialidad || ' '} 
                onChange={handleEspecialidadChange}
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-between">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Especialidad</label>
            <div className="col-sm-6">
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="staticEmail" 
                value={periodo}
              />
            </div>
          </div>
          <div className="mb-3 row d-flex align-items-center justify-content-center my-4">
            <button
              type="button"
              className="btn btn-sm w-50 my-4"
              style={{
                backgroundColor: '#002B7A',
                color: '#FFFFFF',
                borderRadius: '20px'
              }}
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
