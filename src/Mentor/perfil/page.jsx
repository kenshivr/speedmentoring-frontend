import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function Page({ userId }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [academicDegree, setAcademicDegree] = useState('');
  const [hasMasters, setHasMasters] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [rfc, setRfc] = useState('');

  // Función para obtener datos de usuario
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getUserProfile/${userId}`);
      const { nombre, apellidoPaterno, apellidoMaterno, rfc, numerotelefono, correoelectronico, empresa, puesto, especialidad, gradoAcademico, maestria } = response.data;
      setFirstName(nombre);
      setLastName1(apellidoPaterno);
      setLastName2(apellidoMaterno);
      setRfc(rfc);
      setPhoneNumber(numerotelefono);
      setEmail(correoelectronico);
      setCompany(empresa);
      setPosition(puesto);
      setSpecialty(especialidad);
      setAcademicDegree(gradoAcademico);
      setHasMasters(maestria);
    } catch (error) {
      alert('Error al obtener los datos del usuario: ' + error.response.data.message);
    }
  }, [userId]);

  const fetchSpecialties = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getSpecialties');
      setSpecialties(response.data);
    } catch (error) {
      alert("Error al obtener las especialidades" + error.response.data.message);
    }
  }, []);

  // useEffect solo se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchSpecialties();
    }
  }, [fetchUserData, fetchSpecialties, userId]);

  // Función para manejar la actualización del perfil
  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/updateProfileMentor', {
        userId,
        phoneNumber,
        email,
        company,
        position,
        specialty,
        academicDegree,
        hasMasters,
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error al guardar los datos: ' + error.response.data.message);
    }
  };

  return (
    <div className="container-sm my-5" style={{ backgroundColor: 'rgba(245, 230, 232, 0.8)', borderRadius: '25px' }}>
      <div className="container">
        <h2 className="pt-4 ps-5">Cuenta</h2>
        <div className="m-5">
          <div className="mb-3 row">
            <label htmlFor="staticFullName" className="col-sm-2 col-form-label">Nombre Completo</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="staticFullName" value={`${firstName} ${lastName1} ${lastName2}`} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="staticRfc" className="col-sm-2 col-form-label">RFC</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="staticRfc" value={rfc} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Número de teléfono</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Correo electrónico"
              />
            </div>
          </div>

          <div className="my-5 mb-3 row">
            <label htmlFor="company" className="col-sm-2 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                aria-label="Puesto"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="academicDegree" className="col-sm-2 col-form-label">Grado Académico</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="academicDegree"
                value={academicDegree}
                onChange={(e) => setAcademicDegree(e.target.value)}
                aria-label="Grado Académico"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="hasMasters" className="col-sm-2 col-form-label">Maestría</label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="hasMasters"
                value={hasMasters ? 'Sí' : 'No'}
                onChange={(e) => setHasMasters(e.target.value === 'Sí')}
                aria-label="Maestría"
              >
                <option value='No'>No</option>
                <option value='Sí'>Sí</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <div className="row w-100 no-gutters">
              <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <label htmlFor="especialidad" className="col-sm-4 col-form-label">Especialidad</label>
                <select
                  className="form-select auto-width-select mx-2"
                  id="especialidad"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value=''>Seleccionar</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty.especialidad}>{specialty.especialidad}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
                <button
                  type="button"
                  className="btn w-100"
                  style={{ backgroundColor: '#002B7A', color: '#FFFFFF', borderRadius: '20px' }}
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
