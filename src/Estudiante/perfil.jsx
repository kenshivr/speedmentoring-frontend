import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';

export default function Page() {
  const user = localStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [mentorRFC, setMentorRFC] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStudent/${user}`);
      const { Nombre, ApellidoPaterno, ApellidoMaterno, Periodo, Especialidad, NumeroTelefono, CorreoElectronicoPersonal, NombreMentor } = response.data;

      const fullName = `${Nombre || ''} ${ApellidoPaterno || ''} ${ApellidoMaterno || ''}`.trim();

      setNombre(fullName);
      setPeriodo(Periodo);
      setEspecialidad(Especialidad);
      setTelefono(NumeroTelefono);
      setCorreo(CorreoElectronicoPersonal);
      setMentorRFC(NombreMentor);

    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + (error.response?.data?.message || error.message));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [fetchUserData, user]);

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/updateStudent/${user}`, {
        numeroTelefono: telefono, 
        correoElectronicoPersonal: correo
      });
      if (response.data) {
        alert('Se ha actualizado la información correctamente.');
      }
      fetchUserData();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', color:'white', borderRadius: '25px' }}>
      <div className="container">
      <h2 className="pt-4 ps-5">Cuenta</h2>
        <div className="m-5">

          <div className="mb-3 row">
            <label htmlFor="staticNombre" className="col-sm-2 col-form-label">Nombre</label>
            <div className="col-sm-10 ps-4" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px'}}>
              <input 
                type="text" 
                readOnly
                className="form-control-plaintext" 
                id="staticNombre" 
                value={nombre || ''} 
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticPeriodo" className="col-sm-2 col-form-label">Periodo</label>
            <div className="col-sm-10 ps-4" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px'}}>
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="staticPeriodo" 
                value={periodo || ''} 
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticEspecialidad" className="col-sm-2 col-form-label">Especialidad</label>
            <div className="col-sm-10 ps-4" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px'}}>
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="staticEspecialidad" 
                value={especialidad || ''} 
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="inputTelefono" className="col-sm-2 col-form-label">Número de Teléfono</label>
            <div className="col-sm-10 ps-2" style={{ backgroundColor:'white', borderRadius:'25px'}}>
              <input 
                type="text"
                className="form-control" 
                id="inputTelefono" 
                value={telefono || ''} 
                onChange={(e) => setTelefono(e.target.value)}
                style={{ borderColor: 'white', borderRadius: '25px', boxShadow: 'none' }}
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="inputCorreo" className="col-sm-2 col-form-label">Correo Electrónico</label>
            <div className="col-sm-10 ps-2" style={{ backgroundColor:'white', borderRadius:'25px'}}>
              <input 
                type="email"
                className="form-control" 
                id="inputCorreo" 
                value={correo || ''} 
                onChange={(e) => setCorreo(e.target.value)}
                style={{ borderColor: 'white', borderRadius: '25px', boxShadow: 'none' }}
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-Evenly">
            <label htmlFor="staticMentorRFC" className="col-sm-2 col-form-label">Mentor</label>
            <div className="col-sm-10 ps-4" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px'}}>
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext" 
                id="staticMentorRFC" 
                value={mentorRFC || ''} 
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
              <button
                type="button"
                className="btn w-100 mx-2"
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
                className="btn w-100"
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
  );
}
