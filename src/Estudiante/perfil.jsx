import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import LinkSecundaryCentered from './../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalC from './../components/Button/ButtonPrincipalC.jsx';

export default function Page() {
  const user = sessionStorage.getItem('userId');

  const [nombre, setNombre] = useState('');
  const [estudianteID, setEstudianteID] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [mentorRFC, setMentorRFC] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${apiUrl}/api/getStudent/${user}`);
      const { EstudianteID, Nombre, ApellidoPaterno, ApellidoMaterno, Periodo, Especialidad, NumeroTelefono, CorreoElectronicoPersonal, NombreMentor } = response.data;

      const fullName = `${Nombre || ''} ${ApellidoPaterno || ''} ${ApellidoMaterno || ''}`.trim();

      setNombre(fullName);
      setEstudianteID(EstudianteID);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      //const response = await axios.put(`http://localhost:3001/api/updateStudent/${user}`, {
      const response = await axios.put(`${apiUrl}/api/updateStudent/${user}`, {
        NumeroTelefono: telefono, 
        CorreoElectronicoPersonal: correo
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
    <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', color:'white', borderRadius: '25px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container">
        <h2 className="pt-4 ps-5">Cuenta</h2>
        <div className="m-5">

          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="staticNombre" className="col-sm-2 col-form-label">Número de cuenta</label>
              <div className="col-sm-10 ps-4" style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px'}}>
                <input 
                  type="text" 
                  readOnly
                  className="form-control-plaintext" 
                  id="staticNombre" 
                  value={estudianteID || ''} 
                />
              </div>
            </div>

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
                  max={9999999999}
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
                  maxLength={100}
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

            <div className="row justify-content-end mt-4 mb-1 pb-1">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                <ButtonPrincipalC
                  text='Guardar'
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
                <LinkSecundaryCentered
                  text='Cancelar'
                  link="/Estudiante/inicio"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
