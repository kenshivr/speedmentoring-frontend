import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [especialidades, setEspecialidades] = useState([]);

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

  // Función para obtener las especialidades disponibles
  const fetchEspecialidades = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getSpecialties');
      setEspecialidades(response.data);
    } catch (error) {
      alert('Error al obtener las especialidades: ' + error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEspecialidades(); // Llama a fetchEspecialidades cuando el componente se monta
    }
  }, [fetchUserData, fetchEspecialidades, user]);

  // Manejar cambio en la especialidad
  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  // Guardar cambios en la especialidad
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/updateStudent/${user}`, { especialidad });
      alert('Especialidad actualizada correctamente');
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
          <div className="mb-3 row justify-content-Evenly">
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
          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="especialidad" className="col-sm-4 col-form-label">Especialidad</label>
            <div className="col-sm-7">
              <select
                className="form-select"
                id="especialidad"
                value={especialidad}
                onChange={handleEspecialidadChange}
              >
                <option value=''>Seleccionar</option>
                {especialidades.map((esp, index) => (
                  <option key={index} value={esp.especialidad}>{esp.especialidad}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Periodo</label>
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
          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticPassword" className="mt-3 col-sm-4 col-form-label">Contraseña</label>
            <div className="col-sm-6">
              <button
                type="button"
                className="btn btn-sm w-50 my-4"
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
                }}
                onClick={() => window.location.href = 'http://localhost:3000/Estudiante/perfil/changePassword/page'}
              >
                Modificar
              </button>
            </div>
          </div>
          <div className="mb-3 row d-flex align-items-center justify-content-center my-4">
            <button
              type="button"
              className="btn btn-sm w-50 my-4"
              style={{ 
                backgroundColor: '#002B7A', 
                color: 'white', 
                border: '1px solid #000',
                borderRadius:'20px',
                transition: 'background-color 0.3s, color 0.3s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#002B7A';
                e.currentTarget.style.color = 'white';
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
