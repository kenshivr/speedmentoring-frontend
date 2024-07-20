import React, { useState, useEffect } from 'react';

export default function EditProfilePage({ userType }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    cuenta: '',
    mentor: '',
    especialidad: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    empresa: '',
    rfc: '',
    maestria: false,
    email: '',
    telefono: '',
    puesto: '',
    grado: '',
    password: ''
  });

  useEffect(() => {
    // Fetch especialidades
    fetch('/api/especialidades')
      .then(response => response.json())
      .then(data => setEspecialidades(data));

    // Fetch user data
    // Aquí deberías hacer una llamada para obtener los datos del usuario
    // Simulamos con datos de ejemplo
    fetch(`/api/user/${userType}`)
      .then(response => response.json())
      .then(data => setFormData(data));
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/user/${userType}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <div>
      <div className="container-sm my-1" style={{ backgroundColor: 'white', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight: '410px', margin: 'auto' }}>
        {userType === 'estudiante' && (
          <div className="row justify-content-evenly pt-3" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="cuenta" className="form-label">Número de cuenta</label>
                <input
                  className="form-control"
                  id="cuenta"
                  name="cuenta"
                  value={formData.cuenta}
                  placeholder="Ejemplo de número de cuenta"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mentor" className="form-label">Mentor</label>
                <select
                  className="form-select"
                  id="mentor"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                >
                  <option value="">Mentor</option>
                  {/* Aquí deberías obtener los mentores desde el back-end */}
                  <option value="1">José Luis Mejia Soto</option>
                  <option value="2">Brayan Vidal Romero</option>
                  <option value="3">Janine Farfan Romero</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3 pt-5">
              <div className="mb-3" style={{ maxWidth: '500px' }}>
                <select
                  className="form-select"
                  id="especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                >
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña (HASH)</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder='Contraseña escrita en HASH'
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
                <button
                  type="submit"
                  className="btn w-75"
                  style={{
                    backgroundColor: '#EFCA45',
                    color: '#4F3F05',
                    borderColor: '#EFCA45',
                    borderRadius: '20px'
                  }}
                  onClick={handleSubmit}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        )}
        {userType === 'mentor' && (
          <div className="row justify-content-evenly" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight: '410px', margin: 'auto' }}>
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  placeholder="Ejemplo de nombre"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellidoPaterno" className="form-label">Apellido paterno</label>
                <input
                  className="form-control"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  placeholder="Ejemplo de apellido"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellidoMaterno" className="form-label">Apellido materno</label>
                <input
                  className="form-control"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  placeholder="Ejemplo de apellido"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="empresa" className="form-label">Empresa</label>
                <input
                  className="form-control"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  placeholder="Ejemplo de empresa"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rfc" className="form-label">RFC</label>
                <input
                  className="form-control"
                  id="rfc"
                  name="rfc"
                  value={formData.rfc}
                  placeholder="Ejemplo de RFC"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maestria" className="form-label">Maestría</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maestria"
                    id="maestriaSi"
                    value="true"
                    checked={formData.maestria === true}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="maestriaSi">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maestria"
                    id="maestriaNo"
                    value="false"
                    checked={formData.maestria === false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="maestriaNo">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="nombre@ejemplo.com"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  placeholder="Ejemplo de teléfono"
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4 mt-4' style={{ maxWidth: '500px' }}>
                <select
                  className="form-select"
                  id="especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                >
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="puesto" className="form-label">Puesto</label>
                <input
                  className="form-control"
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  placeholder="Ejemplo de puesto"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="grado" className="form-label">Grado académico</label>
                <input
                  className="form-control"
                  id="grado"
                  name="grado"
                  value={formData.grado}
                  placeholder="Ejemplo de grado académico"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña (HASH)</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder='Contraseña escrita en HASH'
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
                <button
                  type="submit"
                  className="btn w-75"
                  style={{
                    backgroundColor: '#EFCA45',
                    color: '#4F3F05',
                    borderColor: '#EFCA45',
                    borderRadius: '20px'
                  }}
                  onClick={handleSubmit}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}