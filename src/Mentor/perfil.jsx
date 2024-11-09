import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LinkSecundaryCentered from './../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalC from './../components/Button/ButtonPrincipalC.jsx';

export default function Page({ userId }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [puesto, setPuesto] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${apiUrl}/api/getProfileMentor/${userId}`);
      setNombre(response.data.Nombre);
      setPaterno(response.data.ApellidoPaterno);
      setMaterno(response.data.ApellidoMaterno);
      setTelefono(response.data.NumeroTelefono);
      setCorreo(response.data.CorreoElectronico);
      setEmpresa(response.data.Empresa);
      setPuesto(response.data.Puesto);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + (error.response?.data?.message || error.message));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/updateProfileMentor/${userId}`, {
        telefono,
        correo,
        empresa,
        puesto
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error al guardar los datos: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!userId) {
    return (
      <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', minHeight:'660px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <div className='position-absolute top-50 start-50 translate-middle'>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', color:'white', borderRadius: '25px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container">
        <h2 className="pt-4 ps-5">Cuenta</h2>
        <div className="m-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="staticFullName" className="col-sm-2 col-form-label">Nombre Completo</label>
              <div className="col-sm-10">
                <input 
                  type="text" 
                  readOnly 
                  className="form-control-plaintext ps-4" 
                  style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px' }} 
                  id="staticFullName" 
                  maxLength={150}
                  value={`${nombre} ${paterno} ${materno}`} 
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="staticRfc" className="col-sm-2 col-form-label">RFC</label>
              <div className="col-sm-10">
                <input 
                  type="text" 
                  readOnly 
                  className="form-control-plaintext ps-4"
                  style={{ backgroundColor:'rgba(255,255,255,0.6)', borderRadius:'25px' }} 
                  id="staticEmail" 
                  maxLength={14}
                  value={userId}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Número de teléfono</label>
              <div className="col-sm-10">
                <input
                  className="form-control ps-4"
                  type="text"
                  id="phoneNumber"
                  value={telefono}
                  max={9999999999}
                  style={{ borderRadius:'25px' }}
                  onChange={(e) => setTelefono(e.target.value)}
                  aria-label="Número de teléfono"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico</label>
              <div className="col-sm-10">
                <input
                  className="form-control ps-4"
                  type="text"
                  id="email"
                  value={correo}
                  maxLength={100}
                  style={{ borderRadius:'25px' }}
                  onChange={(e) => setCorreo(e.target.value)}
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            <div className="my-4 mb-3 row">
              <label htmlFor="company" className="col-sm-2 col-form-label">Empresa</label>
              <div className="col-sm-10">
                <input
                  className="form-control ps-4"
                  type="text"
                  id="company"
                  value={empresa}
                  maxLength={50}
                  style={{ borderRadius:'25px' }}
                  onChange={(e) => setEmpresa(e.target.value)}
                  aria-label="Empresa"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="position" className="col-sm-2 col-form-label">Puesto</label>
              <div className="col-sm-10">
                <input
                  className="form-control ps-4"
                  type="text"
                  id="position"
                  maxLength={50}
                  value={puesto}
                  style={{ borderRadius:'25px' }}
                  onChange={(e) => setPuesto(e.target.value)}
                  aria-label="Puesto"
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
                    link="/Mentor/inicio"
                  />
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
