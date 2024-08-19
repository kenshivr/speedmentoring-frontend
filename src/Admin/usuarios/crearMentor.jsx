import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkSecundaryC from '../../components/Link/LinkSecundary_Centered.jsx'; 
import ButtonPrincipalC from '../../components/Button/ButtonPrincipal_Centered_typeSubmit.jsx'; 

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
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Registrar mentor</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="RFC" className="form-label">RFC</label>
                <input type="text" className="form-control" id="RFC" name="RFC" placeholder="RFC" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s)</label>
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
                <label htmlFor="NumeroTelefono" className="form-label">Número de Teléfono</label>
                <input type="text" className="form-control" id="NumeroTelefono" name="NumeroTelefono" placeholder="Teléfono de contacto" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="CorreoElectronico" name="CorreoElectronico" placeholder="Ejemplo@correo.com" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Empresa" className="form-label">Empresa</label>
                <input type="text" className="form-control" id="Empresa" name="Empresa" placeholder="Empresa en la que trabaja" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="Puesto" className="form-label">Puesto</label>
                <input type="text" className="form-control" id="puesto" name="Puesto" placeholder="Puesto que desempeña" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="EspecialidadID" className="form-label">Especialidad</label>
                <select className="form-select" aria-label="Default select example" name="EspecialidadID" onChange={handleChange}>
                  <option value="">Especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.Especialidad}</option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="row justify-content-end mt-4 mb-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                    <ButtonPrincipalC
                      text='Registrar'
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <LinkSecundaryC
                      link="/Admin/usuarios"
                      text='Cancelar'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
