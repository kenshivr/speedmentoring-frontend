import React, { useState, useEffect } from 'react';

export default function Page() {
  const [userType, setUserType] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [mentores, setMentores] = useState([]);

  const [formDataMentor, setFormDataMentor] = useState({
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
    grado: ''
  });

  const [formDataAlumno, setFormDataAlumno] = useState({
    cuenta: '',
    mentor: '',
    especialidad: ''
  });

  useEffect(() => {
    // Fetch especialidades
    fetch('/api/especialidades')
      .then(response => response.json())
      .then(data => setEspecialidades(data));

    // Fetch mentores
    fetch('/api/mentors')
      .then(response => response.json())
      .then(data => setMentores(data));
  }, []);

  // const handleUserTypeChange = (e) => {
  //   setUserType(e.target.value);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch('/api/registro', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ ...formData, userType }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Success:', data);
  //       // Handle success, e.g., show a success message or redirect
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       // Handle error, e.g., show an error message
  //     });
  // };

  return (
    <div>
      <div className='container mt-5 p-1' style={{ maxWidth: '950px' }}>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ backgroundColor: '#EFCA45', color: '#4F3F05', maxWidth: '500px' }}
          onChange={handleUserTypeChange}
          value={userType}
        >
          <option value="none">Tipo de usuario</option>
          <option value="estudiante">Estudiante</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container-sm my-1" style={{ backgroundColor: 'white', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight:'410px', margin: 'auto' }}>
          {userType === 'estudiante' && (
            <div className="row justify-content-evenly pt-3" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
              <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="cuenta" className="form-label">Número de cuenta</label>
                  <input className="form-control" id="cuenta" name="cuenta" placeholder="Ejemplo de número de cuenta" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mentor" className="form-label">Mentor</label>
                  <select className="form-select" aria-label="Default select example" name="mentor" onChange={handleChange}>
                    <option value="" selected>Mentor</option>
                    {mentores.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>{mentor.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3 pt-5">
                <div className='mb-3' style={{ maxWidth: '500px' }}>
                  <select className="form-select" aria-label="Default select example" name="especialidad" onChange={handleChange}>
                    <option value="" selected>Especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.id} value={especialidad.id}>{especialidad.nombre}</option>
                    ))}
                  </select>
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
                    }}>
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          )}
          {userType === 'mentor' && (
            <div className="row justify-content-evenly" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight:'410px', margin: 'auto' }}>
              <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                  <input className="form-control" id="nombre" name="nombre" placeholder="Ejemplo de nombre" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidoPaterno" className="form-label">Apellido paterno</label>
                  <input className="form-control" id="apellidoPaterno" name="apellidoPaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidoMaterno" className="form-label">Apellido materno</label>
                  <input className="form-control" id="apellidoMaterno" name="apellidoMaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="empresa" className="form-label">Empresa</label>
                  <input className="form-control" id="empresa" name="empresa" placeholder="Ejemplo de empresa" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="rfc" className="form-label">RFC</label>
                  <input className="form-control" id="rfc" name="rfc" placeholder="Ejemplo de RFC" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="maestria" className="form-label">Maestría</label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="maestria" id="maestriaSi" value="true" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="maestriaSi">
                      Sí
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="maestria" id="maestriaNo" value="false" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="maestriaNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="nombre@ejemplo.com" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input className="form-control" id="telefono" name="telefono" placeholder="Ejemplo de teléfono" onChange={handleChange} />
                </div>
                <div className='mb-4 mt-4' style={{ maxWidth: '500px' }}>
                  <select className="form-select" aria-label="Default select example" name="especialidad" onChange={handleChange}>
                    <option value="" selected>Especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.id} value={especialidad.id}>{especialidad.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="puesto" className="form-label">Puesto</label>
                  <input className="form-control" id="puesto" name="puesto" placeholder="Ejemplo de puesto" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="grado" className="form-label">Grado académico</label>
                  <input className="form-control" id="grado" name="grado" placeholder="Ejemplo de grado académico" onChange={handleChange} />
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
                    }}>
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}