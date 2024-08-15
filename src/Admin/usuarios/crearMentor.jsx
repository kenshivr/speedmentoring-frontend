import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Page() {
  const [especialidades, setEspecialidades] = useState([]);

  const [formDataMentor, setFormDataMentor] = useState({
    RFC: '',
    Homoclave: '',  // Añadido el campo Homoclave al estado
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    EspecialidadID: '',
    Empresa: '',
    Puesto: '',
    CorreoElectronico: '',
    NumeroTelefono: '',
    HASH: '',
    SALT: '',
    Estado: 0
  });

  useEffect(() => {
    // Fetch especialidades
    const getEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/especialidades');
        setEspecialidades(response.data);
      } catch (error) {
        console.error("Error en la obtención de especialidades:", error);
      }
    };

    getEspecialidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataMentor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/setNewMentor', formDataMentor);
      console.log('Mentor registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container-sm mt-5 p-5" style={{ backgroundColor: 'rgba(0, 43, 122, 1)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
          <div className="row justify-content-evenly" style={{ borderRadius: '50px', color: 'white', margin: 'auto' }}>
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" id="nombre" name="Nombre" placeholder="Nombre" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido Paterno</label>
                <input type="text" className="form-control" id="ApellidoPaterno" name="ApellidoPaterno" placeholder="Apellido paterno" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido Materno</label>
                <input type="text" className="form-control" id="ApellidoMaterno" name="ApellidoMaterno" placeholder="Apellido materno" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="RFC" className="form-label">RFC</label>
                <input type="text" className="form-control" id="RFC" name="RFC" placeholder="RFC" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Homoclave" className="form-label">Homoclave</label>
                <input type="text" className="form-control" id="Homoclave" name="Homoclave" placeholder="Homoclave" onChange={handleChange} />
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className='mb-3 pt-4 mt-2'>
                <select className="form-select" aria-label="Default select example" name="EspecialidadID" onChange={handleChange}>
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Empresa" className="form-label">Empresa</label>
                <input type="text" className="form-control" id="Empresa" name="Empresa" placeholder="Empresa en la que trabaja" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="puesto" className="form-label">Puesto</label>
                <input type="text" className="form-control" id="puesto" name="Puesto" placeholder="Puesto que desempeña" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" placeholder="Ejemplo@correo.com" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input type="text" className="form-control" id="NumeroTelefono" name="NumeroTelefono" placeholder="Teléfono de contacto" onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3 mt-5">
                <button
                  type="submit"
                  className="btn w-75"
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
                  }}>
                  Registrar
                </button>
                  <Link
                    type="button"
                    className="btn w-75 mx-3"
                    to="/Admin/usuarios"
                    style={{ 
                      backgroundColor: '#EBE4CA', 
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
                    }}
                  >
                    Cancelar
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
