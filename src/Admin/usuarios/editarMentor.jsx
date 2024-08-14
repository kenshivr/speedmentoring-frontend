import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [especialidades, setEspecialidades] = useState([]);

  const [formDataMentor, setFormDataMentor] = useState({
    RFC: 0,
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Especialidad: '',
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
        <div className="container-sm mt-4 p-4" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
            <div className="row justify-content-evenly" style={{ borderRadius: '50px', color: 'white', margin: 'auto' }}>
              <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                  <input type="text" className="form-control" id="nombre" name="Nombre" placeholder="Ejemplo de nombre" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="ApellidoPaterno" className="form-label">Apellido Paterno</label>
                  <input type="text" className="form-control" id="ApellidoPaterno" name="ApellidoPaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="ApellidoMaterno" className="form-label">Apellido Materno</label>
                  <input type="text" className="form-control" id="ApellidoMaterno" name="ApellidoMaterno" placeholder="Ejemplo de apellido" onChange={handleChange} />
                </div>
                <div className='mb-3 pt-4 mt-2'>
                  <select className="form-select" aria-label="Default select example" name="EspecialidadID" onChange={handleChange}>
                    <option value="">Especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
                <div className="mb-3">
                  <label htmlFor="Empresa" className="form-label">Empresa</label>
                  <input type="text" className="form-control" id="Empresa" name="Empresa" placeholder="Ejemplo de empresa" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="puesto" className="form-label">Puesto</label>
                  <input type="text" className="form-control" id="puesto" name="Puesto" placeholder="Ejemplo de puesto" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" placeholder="Ejemplo@correo.com" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                  <input type="text" className="form-control" id="NumeroTelefono" name="NumeroTelefono" placeholder="Ejemplo de teléfono" onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-center align-items-center mb-3 mt-5">
                  <button
                    type="submit"
                    className="btn w-75"
                    style={{
                      backgroundColor: '#EFCA45',
                      color: '#4F3F05',
                      borderColor: '#EFCA45',
                      borderRadius: '20px'
                    }}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
}
