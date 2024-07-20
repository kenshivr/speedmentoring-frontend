import axios from 'axios';
import { Link, resolvePath } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';

export default function Page() {

  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [especialidades, setEspecialidades] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStudent/${user}`);
      const { Nombre, Periodo, Especialidad, Especialidades } = response.data;
      setNombre(Nombre);
      setPeriodo(Periodo);
      setEspecialidad(Especialidad);
      setEspecialidades(response.data.especialidades);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + error.response.data.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData(); // Llama a fetchEspecialidades cuando el componente se monta
    }
  }, [fetchUserData, user]);

  // Guardar cambios en la especialidad
  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/updateStudent/${user}`, { especialidad });
      if (response.data) {
        alert('Se ha enviado un correo con la nueva contraseña.');
      }
      fetchUserData(); // Asegúrate de que fetchUserData es una función válida y se está ejecutando correctamente
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios: ' + (error.response ? error.response.data.message : error.message));
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
                value={nombre || ''} 
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-between">

            <div className="mb-3 row justify-content-Evenly">

              <label htmlFor="especialidad" className="col-sm-4 col-form-label">Especialidad</label>
              
              <div className="col-sm-7">
                <select
                  className="form-select auto-width-select mx-2"
                  id="especialidad"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  aria-label="Default select example"
                >
                {especialidades.map((especialidadObj, index) => (
                    <option key={index} value={especialidadObj.Especialidad}>{especialidadObj.Especialidad}</option>
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
                  id="periodo" 
                  value={periodo || ''} 
                />
              </div>
            </div>

            <div className="mb-3 row justify-content-Evenly">
              <label htmlFor="staticPassword" className="mt-3 col-sm-4 col-form-label">Contraseña</label>
              <div className="col-sm-6">
              <Link
                to="/Estudiante/perfil/changePassword/page"
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
              >
                Modificar
              </Link>
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
      
    </div>
  );
}
