import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';

export default function Page() {
  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');

  // Eliminar estado y función para especialidades
  // const [especialidad, setEspecialidad] = useState('');
  // const [especialidades, setEspecialidades] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStudent/${user}`);
      const { Nombre, ApellidoPaterno, ApellidoMaterno, Periodo } = response.data;

      // Concatenar los nombres y apellidos
      const fullName = `${Nombre || ''} ${ApellidoPaterno || ''} ${ApellidoMaterno || ''}`.trim();
      
      // Actualizar el estado con el nombre completo y el período
      setNombre(fullName);
      setPeriodo(Periodo);

    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + (error.response?.data?.message || error.message));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData(); // Llama a fetchUserData cuando el componente se monta
    }
  }, [fetchUserData, user]);

  // Guardar cambios sin la especialidad
  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/updateStudent/${user}`, {
        // Eliminar especialidad del objeto enviado
        // especialidad
      });
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
    <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', color:'white', borderRadius: '25px' }}>
      <div className="container">
        <h2 className="mx-4 pt-4">Cuenta</h2>
        <div className="m-5">

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Nombre</label>
            <div className="col-sm-6 ps-4" style={{ backgroundColor:'white', borderRadius:'25px'}}>
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
              <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Periodo</label>
              <div className="col-sm-6 ms-2 ps-4" style={{ backgroundColor:'white', borderRadius:'25px'}}>
                <input 
                  type="text" 
                  readOnly 
                  className="form-control-plaintext" 
                  id="periodo" 
                  value={periodo || ''} 
                />
              </div>
            </div>

            <div className="row justify-content-Evenly">
              <label htmlFor="staticPassword" className="mt-3 col-sm-4 col-form-label">Contraseña</label>
              <div className="col-sm-6">
                <Link
                  to="/Estudiante/perfil/changePassword"
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

            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
                <button
                  type="button"
                  className="btn btn-sm w-50 my-4 mx-3"
                  style={{ 
                    backgroundColor: '#EFCA45', 
                    color: 'black', 
                    border: '1px solid #000',
                    borderRadius:'20px',
                    transition: 'background-color 0.3s, color 0.3s' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFCA45';
                    e.currentTarget.style.color = 'black';
                  }}
                  onClick={handleSave}
                >
                  Guardar
                </button>
                <Link
                  type="button"
                  className="btn btn-sm w-50 mx-3"
                  to="/Estudiante/inicio"
                  style={{ 
                    backgroundColor: '#A0BAEB', 
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
              </div>
            </div>

          </div>

        </div>

      </div>
      
    </div>
  );
}
