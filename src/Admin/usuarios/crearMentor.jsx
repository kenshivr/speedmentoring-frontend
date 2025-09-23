import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 
import LinkSecundaryC from '../../components/Link/LinkSecundaryCentered.jsx'; 

export default function Page() {
  const [especialidades, setEspecialidades] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formDataMentor, setFormDataMentor] = useState({
    RFC: '',
    Homoclave: '',
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
    Estado: 'Activo'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getEspecialidades = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/especialidades`);
        setEspecialidades(response.data);
        
        // Establecer primera especialidad por defecto si existe
        if (response.data.length > 0) {
          setFormDataMentor(prev => ({
            ...prev,
            EspecialidadID: response.data[0].EspecialidadID || response.data[0].id
          }));
        }
      } catch (error) {
        console.error("Error en la obtención de especialidades:", error);
      }
    };

    getEspecialidades();
  }, []);

  // Validaciones del formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Campos obligatorios
    if (!formDataMentor.RFC.trim()) newErrors.RFC = 'RFC es obligatorio';
    else if (formDataMentor.RFC.length != 10) {
      newErrors.RFC = 'El RFC debe tener 10 caracteres';
    }
    
    if (!formDataMentor.Homoclave.trim()) newErrors.Homoclave = 'Homoclave es obligatoria';
    else if (formDataMentor.Homoclave.length !== 3) {
      newErrors.Homoclave = 'La homoclave debe tener exactamente 3 caracteres';
    }
    
    if (!formDataMentor.Nombre.trim()) newErrors.Nombre = 'Nombre es obligatorio';
    if (!formDataMentor.ApellidoPaterno.trim()) newErrors.ApellidoPaterno = 'Apellido paterno es obligatorio';
    if (!formDataMentor.ApellidoMaterno.trim()) newErrors.ApellidoMaterno = 'Apellido materno es obligatorio';
    if (!formDataMentor.EspecialidadID) newErrors.EspecialidadID = 'Debe seleccionar una especialidad';
    
    // Validación de email si se proporciona
    if (formDataMentor.CorreoElectronico && !/\S+@\S+\.\S+/.test(formDataMentor.CorreoElectronico)) {
      newErrors.CorreoElectronico = 'El formato del correo electrónico no es válido';
    }
    
    // Validación de teléfono si se proporciona (solo números, mínimo 10 dígitos)
    if (formDataMentor.NumeroTelefono && !/^\d{10,15}$/.test(formDataMentor.NumeroTelefono.replace(/\s/g, ''))) {
      newErrors.NumeroTelefono = 'El teléfono debe contener entre 10 y 15 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Transformaciones específicas por campo
    let processedValue = value;
    
    if (name === 'RFC') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (name === 'Homoclave') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (name === 'Nombre' || name === 'ApellidoPaterno' || name === 'ApellidoMaterno') {
      // Permitir solo letras y espacios en nombres
      processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (name === 'NumeroTelefono') {
      // Permitir solo números en teléfono
      processedValue = value.replace(/\D/g, '');
    }
    
    setFormDataMentor(prevState => ({
      ...prevState,
      [name]: processedValue
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, complete todos los campos obligatorios correctamente');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/setNewMentor`, formDataMentor);
      
      if (response.status === 200 || response.status === 201) {
        alert('Mentor registrado exitosamente');
        navigate('/Admin/mentores');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      
      if (error.response) {
        // Error del servidor
        alert(`Error al registrar: ${error.response.data.message || 'Error del servidor'}`);
      } else if (error.request) {
        // Error de conexión
        alert('Error de conexión. Verifique su internet.');
      } else {
        // Error general
        alert('Error al registrar el mentor');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Registrar mentor</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              
              {/* Campo RFC */}
              <div className="mb-3">
                <label htmlFor="RFC" className="form-label">RFC *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.RFC ? 'is-invalid' : ''}`} 
                  id="RFC" 
                  name="RFC" 
                  placeholder="Ejemplo: ABC123456789" 
                  value={formDataMentor.RFC}
                  onChange={handleChange}
                  maxLength="13"
                  required
                />
                {errors.RFC && <div className="invalid-feedback">{errors.RFC}</div>}
                <div className="form-text">12-13 caracteres alfanuméricos</div>
              </div>
              
              {/* Campo Homoclave */}
              <div className="mb-3">
                <label htmlFor="Homoclave" className="form-label">Homoclave *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.Homoclave ? 'is-invalid' : ''}`} 
                  id="Homoclave" 
                  name="Homoclave" 
                  placeholder="Ejemplo: AB1" 
                  value={formDataMentor.Homoclave}
                  onChange={handleChange}
                  maxLength="3"
                  required
                />
                {errors.Homoclave && <div className="invalid-feedback">{errors.Homoclave}</div>}
                <div className="form-text">3 caracteres alfanuméricos</div>
              </div>
              
              {/* Campo Nombre */}
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s) *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.Nombre ? 'is-invalid' : ''}`} 
                  id="Nombre" 
                  name="Nombre" 
                  placeholder="Nombre(s) del mentor" 
                  value={formDataMentor.Nombre}
                  onChange={handleChange}
                  required
                />
                {errors.Nombre && <div className="invalid-feedback">{errors.Nombre}</div>}
              </div>
              
              {/* Campo Apellido Paterno */}
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido Paterno *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.ApellidoPaterno ? 'is-invalid' : ''}`} 
                  id="ApellidoPaterno" 
                  name="ApellidoPaterno" 
                  placeholder="Apellido paterno" 
                  value={formDataMentor.ApellidoPaterno}
                  onChange={handleChange}
                  required
                />
                {errors.ApellidoPaterno && <div className="invalid-feedback">{errors.ApellidoPaterno}</div>}
              </div>
              
              {/* Campo Apellido Materno */}
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido Materno *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.ApellidoMaterno ? 'is-invalid' : ''}`} 
                  id="ApellidoMaterno" 
                  name="ApellidoMaterno" 
                  placeholder="Apellido materno" 
                  value={formDataMentor.ApellidoMaterno}
                  onChange={handleChange}
                  required
                />
                {errors.ApellidoMaterno && <div className="invalid-feedback">{errors.ApellidoMaterno}</div>}
              </div>
              
              {/* Campo Teléfono */}
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Número de Teléfono</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.NumeroTelefono ? 'is-invalid' : ''}`} 
                  id="NumeroTelefono" 
                  name="NumeroTelefono" 
                  placeholder="10-15 dígitos" 
                  value={formDataMentor.NumeroTelefono}
                  onChange={handleChange}
                  maxLength="15"
                />
                {errors.NumeroTelefono && <div className="invalid-feedback">{errors.NumeroTelefono}</div>}
              </div>
              
              {/* Campo Correo Electrónico */}
              <div className="mb-3">
                <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.CorreoElectronico ? 'is-invalid' : ''}`} 
                  id="CorreoElectronico" 
                  name="CorreoElectronico" 
                  placeholder="ejemplo@correo.com" 
                  value={formDataMentor.CorreoElectronico}
                  onChange={handleChange}
                />
                {errors.CorreoElectronico && <div className="invalid-feedback">{errors.CorreoElectronico}</div>}
              </div>
              
              {/* Campo Empresa */}
              <div className="mb-3">
                <label htmlFor="Empresa" className="form-label">Empresa</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Empresa" 
                  name="Empresa" 
                  placeholder="Empresa en la que trabaja" 
                  value={formDataMentor.Empresa}
                  onChange={handleChange}
                />
              </div>
              
              {/* Campo Puesto */}
              <div className="mb-3">
                <label htmlFor="Puesto" className="form-label">Puesto</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Puesto" 
                  name="Puesto" 
                  placeholder="Puesto que desempeña" 
                  value={formDataMentor.Puesto}
                  onChange={handleChange}
                />
              </div>
              
              {/* Select Especialidad */}
              <div className="mb-3">
                <label htmlFor="EspecialidadID" className="form-label">Especialidad *</label>
                <select 
                  className={`form-select ${errors.EspecialidadID ? 'is-invalid' : ''}`} 
                  id="EspecialidadID"
                  name="EspecialidadID" 
                  value={formDataMentor.EspecialidadID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.EspecialidadID || especialidad.id} 
                            value={especialidad.EspecialidadID || especialidad.id}>
                      {especialidad.Especialidad}
                    </option>
                  ))}
                </select>
                {errors.EspecialidadID && <div className="invalid-feedback">{errors.EspecialidadID}</div>}
              </div>
              
              <div className="row">
                <div className="row justify-content-end mt-4 mb-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                    <ButtonPrincipalC
                      text={isSubmitting ? 'Registrando...' : 'Registrar'}
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <LinkSecundaryC
                      link="/Admin/mentores"
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