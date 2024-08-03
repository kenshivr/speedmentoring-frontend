import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Page({ userId }) {
  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [telefono, setTelefono] = useState(0);
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [puesto, setPuesto] = useState('');
  const [grado, setGrado] = useState('');
  const [grados, setGrados] = useState([]);

  // Función para obtener los grados académicos
  const fetchGrados = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAcademicDegrees');
      setGrados(response.data);
    } catch (error) {
      //alert('Error al obtener los grados académicos: ' + error.response.data.message);
    }
  }, []);

  // Función para obtener datos de usuario
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getProfileMentor/${userId}`);
      setNombre(response.data.Nombre);
      setPaterno(response.data.ApellidoPaterno);
      setMaterno(response.data.ApellidoMaterno);
      setTelefono(response.data.NumeroTelefono);
      setCorreo(response.data.CorreoElectronico);
      setEmpresa(response.data.Empresa);
      setPuesto(response.data.Puesto);
      setGrado(response.data.GradoAcademico);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + error.response.data.message);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchGrados();
    }
  }, [userId, fetchUserData, fetchGrados]);

  // Función para manejar la actualización del perfil
  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/updateProfileMentor/${userId}`, {
        telefono,
        correo,
        empresa,
        puesto,
        grado
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error al guardar los datos: ' + error.response.data.message);
    }
  };

  if (!userId) {
    return <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', minHeight:'660px' }}><div className='position-absolute top-50 start-50 translate-middle'>Cargando...</div></div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', color:'white', borderRadius: '25px' }}>
      <div className="container">
        <h2 className="pt-4 ps-5">Cuenta</h2>
        <div className="m-5">
          <div className="mb-3 row">
            <label htmlFor="staticFullName" className="col-sm-2 col-form-label">Nombre Completo</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext px-2" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'7px' }} id="staticFullName" value={`${nombre} ${paterno} ${materno}`} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="staticRfc" className="col-sm-2 col-form-label">RFC</label>
            <div className="col-sm-10">
              <input 
                type="text" 
                readOnly 
                className="form-control-plaintext px-2"
                style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'7px' }} 
                id="staticEmail" 
                value={userId}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Número de teléfono</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="phoneNumber"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                aria-label="Número de teléfono"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                aria-label="Correo electrónico"
              />
            </div>
          </div>
          <div className="row justify-content-Evenly">
            <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Contraseña</label>
            <div className="col-sm-6">

              <Link
                to="/Mentor/perfil/changePassword" // Usa el path relativo a tu enrutador
                style={{ 
                  display: 'inline-block', 
                  backgroundColor: '#EFCA45', 
                  color: '#4F3F05', 
                  border: '1px solid #000',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s, color 0.3s', 
                  textAlign: 'center', 
                  textDecoration: 'none', 
                  padding: '0.5rem 1rem'
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
          <div className="my-5 mb-3 row">
            <label htmlFor="company" className="col-sm-2 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="company"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                aria-label="Empresa"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="position" className="col-sm-2 col-form-label">Puesto</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="position"
                value={puesto}
                onChange={(e) => setPuesto(e.target.value)}
                aria-label="Puesto"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="academicDegree" className="col-sm-2 col-form-label">Grado Académico</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="academicDegree"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                aria-label="Grado Académico"
              >
                {grados.map((grado) => (
                  <option key={grado.id} value={grado.nombre}>
                    {grado.nombre}
                  </option>
                ))}
              </select>
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
                to="/Mentor/inicio"
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