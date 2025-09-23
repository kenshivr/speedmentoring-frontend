import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx'; 
import LinkSecundaryC from '../../components/Link/LinkSecundaryCentered.jsx'; 

export default function Page() {
  const [mentores, setMentores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formDataAlumno, setFormDataAlumno] = useState({
    EstudianteID: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Periodo: '',
    PasswordHash: '',
    EspecialidadID: '',
    MentorRFC: '', // Este nombre debe coincidir con el backend
    CorreoElectronicoPersonal: '',
    NumeroTelefono: '',
    Estado: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getEspecialidades = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/especialidades`);
        setEspecialidades(response.data);
      } catch (error) {
        console.error("Error en la obtención de especialidades:", error);
      }
    };

    const getMentores = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/mentors`);
        setMentores(response.data);
        
        // Establecer primer mentor por defecto si existe
        if (response.data.length > 0) {
          setFormDataAlumno(prev => ({
            ...prev,
            MentorRFC: response.data[0].RFC
          }));
        }
      } catch (error) {
        console.error("Error en la obtención de mentores:", error);
      }
    };

    getEspecialidades();
    getMentores();
  }, []);

  // Validaciones
  const validateForm = () => {
    const newErrors = {};
    
    // Campos obligatorios
    if (!formDataAlumno.EstudianteID.trim()) newErrors.EstudianteID = 'Número de cuenta es obligatorio';
    if (!formDataAlumno.Nombre.trim()) newErrors.Nombre = 'Nombre es obligatorio';
    if (!formDataAlumno.ApellidoPaterno.trim()) newErrors.ApellidoPaterno = 'Apellido paterno es obligatorio';
    if (!formDataAlumno.ApellidoMaterno.trim()) newErrors.ApellidoMaterno = 'Apellido materno es obligatorio';
    if (!formDataAlumno.MentorRFC) newErrors.MentorRFC = 'Debe seleccionar un mentor';
    if (!formDataAlumno.EspecialidadID) newErrors.EspecialidadID = 'Debe seleccionar una especialidad';
    
    // Validar formato de fecha (AAAAMMDD)
    if (formDataAlumno.PasswordHash) {
      const dateRegex = /^\d{8}$/;
      if (!dateRegex.test(formDataAlumno.PasswordHash)) {
        newErrors.PasswordHash = 'La fecha debe tener formato AAAAMMDD (8 dígitos)';
      } else {
        // Validar que sea una fecha válida
        const year = parseInt(formDataAlumno.PasswordHash.substring(0, 4));
        const month = parseInt(formDataAlumno.PasswordHash.substring(4, 6));
        const day = parseInt(formDataAlumno.PasswordHash.substring(6, 8));
        
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          newErrors.PasswordHash = 'La fecha no es válida';
        }
      }
    } else {
      newErrors.PasswordHash = 'La fecha de nacimiento es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDataAlumno(prevState => ({
      ...prevState,
      [name]: value
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
      const response = await axios.post(`${apiUrl}/api/setNewAlumno`, formDataAlumno);
      
      if (response.status === 200 || response.status === 201) {
        alert('Estudiante registrado exitosamente');
        navigate('/Admin/estudiantes');
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
        alert('Error al registrar el estudiante');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h1 className='text-center mb-5 mt-3'>Registrar estudiante</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              
              {/* Campo EstudianteID */}
              <div className="mb-3">
                <label htmlFor="EstudianteID" className="form-label">Número de cuenta *</label>
                <input 
                  className={`form-control ${errors.EstudianteID ? 'is-invalid' : ''}`} 
                  id="EstudianteID" 
                  name="EstudianteID" 
                  placeholder="Ejemplo de número de cuenta" 
                  value={formDataAlumno.EstudianteID}
                  onChange={handleChange} 
                  required
                />
                {errors.EstudianteID && <div className="invalid-feedback">{errors.EstudianteID}</div>}
              </div>

              {/* Campo Periodo */}
              <div className="mb-3">
                <label htmlFor="Periodo" className="form-label">Periodo</label>
                <input 
                  className="form-control" 
                  id="Periodo" 
                  name="Periodo" 
                  placeholder="Ejemplo de periodo" 
                  value={formDataAlumno.Periodo}
                  onChange={handleChange} 
                />
              </div>

              {/* Campo Nombre */}
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre(s) *</label>
                <input 
                  className={`form-control ${errors.Nombre ? 'is-invalid' : ''}`} 
                  id="Nombre" 
                  name="Nombre" 
                  placeholder="Ejemplo de nombre" 
                  value={formDataAlumno.Nombre}
                  onChange={handleChange} 
                  required
                />
                {errors.Nombre && <div className="invalid-feedback">{errors.Nombre}</div>}
              </div>

              {/* Campo Apellido Paterno */}
              <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">Apellido paterno *</label>
                <input 
                  className={`form-control ${errors.ApellidoPaterno ? 'is-invalid' : ''}`} 
                  id="ApellidoPaterno" 
                  name="ApellidoPaterno" 
                  placeholder="Ejemplo de apellido" 
                  value={formDataAlumno.ApellidoPaterno}
                  onChange={handleChange} 
                  required
                />
                {errors.ApellidoPaterno && <div className="invalid-feedback">{errors.ApellidoPaterno}</div>}
              </div>

              {/* Campo Apellido Materno */}
              <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">Apellido materno *</label>
                <input 
                  className={`form-control ${errors.ApellidoMaterno ? 'is-invalid' : ''}`} 
                  id="ApellidoMaterno" 
                  name="ApellidoMaterno" 
                  placeholder="Ejemplo de apellido" 
                  value={formDataAlumno.ApellidoMaterno}
                  onChange={handleChange} 
                  required
                />
                {errors.ApellidoMaterno && <div className="invalid-feedback">{errors.ApellidoMaterno}</div>}
              </div>

              {/* Select Mentor - CORREGIDO: name="MentorRFC" */}
              <div className="mb-3">
                <label htmlFor="MentorRFC" className="form-label">Mentor *</label>
                <select 
                  className={`form-select ${errors.MentorRFC ? 'is-invalid' : ''}`} 
                  id="MentorRFC"
                  name="MentorRFC" 
                  value={formDataAlumno.MentorRFC}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un mentor</option>
                  {mentores.map((mentor) => (
                    <option key={mentor.RFC} value={mentor.RFC}>
                      {`${mentor.RFC} - ${mentor.Nombre} ${mentor.ApellidoPaterno} ${mentor.ApellidoMaterno}`}
                    </option>
                  ))}
                </select>
                {errors.MentorRFC && <div className="invalid-feedback">{errors.MentorRFC}</div>}
              </div>

              {/* Campo Correo */}
              <div className="mb-3">
                <label htmlFor="CorreoElectronicoPersonal" className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="CorreoElectronicoPersonal" 
                  name="CorreoElectronicoPersonal" 
                  placeholder="nombre@ejemplo.com" 
                  value={formDataAlumno.CorreoElectronicoPersonal}
                  onChange={handleChange} 
                />
              </div>

              {/* Campo Teléfono */}
              <div className="mb-3">
                <label htmlFor="NumeroTelefono" className="form-label">Teléfono</label>
                <input 
                  className="form-control" 
                  id="NumeroTelefono" 
                  name="NumeroTelefono" 
                  placeholder="Ejemplo de teléfono" 
                  value={formDataAlumno.NumeroTelefono}
                  onChange={handleChange} 
                />
              </div>

              {/* Select Especialidad */}
              <div className='mb-3'>
                <label htmlFor="EspecialidadID" className="form-label">Especialidad *</label>
                <select 
                  className={`form-select ${errors.EspecialidadID ? 'is-invalid' : ''}`} 
                  id="EspecialidadID"
                  name="EspecialidadID" 
                  value={formDataAlumno.EspecialidadID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.EspecialidadID} value={especialidad.EspecialidadID}>
                      {especialidad.Especialidad}
                    </option>
                  ))}
                </select>
                {errors.EspecialidadID && <div className="invalid-feedback">{errors.EspecialidadID}</div>}
              </div>

              {/* Campo Fecha de Nacimiento (PasswordHash) */}
              <div className="mb-3">
                <label htmlFor="PasswordHash" className="form-label">Fecha de nacimiento *</label>
                <input 
                  className={`form-control ${errors.PasswordHash ? 'is-invalid' : ''}`} 
                  id="PasswordHash" 
                  name="PasswordHash" 
                  placeholder="AAAAMMDD (8 dígitos)" 
                  value={formDataAlumno.PasswordHash}
                  onChange={handleChange} 
                  maxLength="8"
                  required
                />
                {errors.PasswordHash && <div className="invalid-feedback">{errors.PasswordHash}</div>}
                <div className="form-text">Formato: AñoMesDía (ej: 20001225 para 25/12/2000)</div>
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
                      link="/Admin/estudiantes"
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