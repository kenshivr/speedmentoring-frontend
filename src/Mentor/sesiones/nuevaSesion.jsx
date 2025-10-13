import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx';
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';

export default function Page() {
  const [date, setDate] = useState('');
  const [titulo, setTitulo] = useState('');
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [messageS, setMessageS] = useState('');
  const [messageE, setMessageE] = useState('');
  const [messageD, setMessageD] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showDateEditor, setShowDateEditor] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mentorRFC = sessionStorage.getItem('userId');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Normalizador seguro de estudiantes
  const normalizeStudents = (data) => {
    try {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.students)) return data.students;
      
      // Buscar cualquier propiedad que sea array
      for (const key in data) {
        if (Array.isArray(data[key])) return data[key];
      }
      
      return [];
    } catch (error) {
      console.error('Error normalizando estudiantes:', error);
      return [];
    }
  };

  // Validar que un estudiante tenga la estructura esperada
  const isValidStudent = (student) => {
    return student && 
           typeof student === 'object' && 
           (student.EstudianteID || student.Nombre) && // Al menos debe tener ID o Nombre
           student.EstudianteID !== undefined &&
           student.EstudianteID !== null;
  };

  // Generar texto para mostrar del estudiante
  const getStudentDisplayText = (student) => {
    if (!student) return 'Estudiante desconocido';
    
    const nombre = student.Nombre || '';
    const apellidoPaterno = student.ApellidoPaterno || '';
    const apellidoMaterno = student.ApellidoMaterno || '';
    
    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim() || `Estudiante ${student.EstudianteID || 'sin nombre'}`;
  };

  useEffect(() => {
    if (mentorRFC) {
      fetchStudents();
      fetchSessions();
    } else {
      setStudents([]);
      setSessions([]);
      setMessageE('No se encontró el ID del mentor. Por favor, inicie sesión nuevamente.');
    }
  }, [mentorRFC]);

  const fetchStudents = async () => {
    try {
      if (!mentorRFC) {
        setMessageE('No hay mentor autenticado');
        return;
      }

      const response = await fetch(`${apiUrl}/api/getStudentsOfMentor/${mentorRFC}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const studentsArray = normalizeStudents(data);
      
      // Filtrar solo estudiantes válidos
      const validStudents = studentsArray.filter(isValidStudent);
      
      setStudents(validStudents);
      
      if (validStudents.length === 0) {
        setMessageD('No hay estudiantes asignados a este mentor.');
      } else {
        setMessageD('');
      }

    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      setMessageE('Error al cargar los estudiantes. Intente nuevamente.');
    }
  };

  const fetchSessions = async () => {
    try {
      if (!mentorRFC) return;

      const response = await fetch(`${apiUrl}/api/showSesionesMentor/${mentorRFC}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Manejar diferentes estructuras de respuesta
      let sessionsArray = [];
      if (Array.isArray(data)) {
        sessionsArray = data;
      } else if (Array.isArray(data.data)) {
        sessionsArray = data.data;
      } else if (data && typeof data === 'object') {
        // Buscar cualquier propiedad array
        for (const key in data) {
          if (Array.isArray(data[key])) {
            sessionsArray = data[key];
            break;
          }
        }
      }

      setSessions(sessionsArray);

    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    }
  };

  const toggleDateEditor = () => {
    setShowDateEditor(!showDateEditor);
  };

  // Validaciones del formulario
  const validateForm = () => {
    const errors = [];

    if (!titulo.trim()) errors.push("Título");
    if (!date) errors.push("Fecha y Hora");
    if (!descripcion.trim()) errors.push("Descripción");
    if (!selectedStudent) errors.push("Alumno");

    // Validar fecha futura
    if (date) {
      const selectedDate = new Date(date);
      const now = new Date();
      if (selectedDate <= now) {
        errors.push("La fecha debe ser futura");
      }
    }

    // Validar longitud de campos
    if (titulo.length > 50) errors.push("El título no puede exceder 50 caracteres");
    if (descripcion.length > 5000) errors.push("La descripción no puede exceder 5000 caracteres");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setMessageE('');
    setMessageD('');

    // Validaciones
    const errors = validateForm();
    if (errors.length > 0) {
      setMessageD(`Errores: ${errors.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    // Verificar que hay estudiantes disponibles
    if (students.length === 0) {
      setMessageE('No hay estudiantes disponibles para agendar sesión');
      setIsSubmitting(false);
      return;
    }

    // Verificar si el estudiante seleccionado existe
    const getStudentId = (student) => {
  return student?.EstudianteID ?? student?.estudianteId ?? student?.id ?? null;
};

const selectedStudentObj = students.find(
  s => String(getStudentId(s)) === String(selectedStudent)
);

    if (!selectedStudentObj) {
      setMessageE('El estudiante seleccionado no es válido');
      setIsSubmitting(false);
      return;
    }

    // Verificar conflicto de fechas
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    const sameDaySession = sessions.some((session) => {
      if (!session.Fecha) return false;
      const sessionDate = new Date(session.Fecha);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === inputDate.getTime();
    });

    if (sameDaySession) {
      setMessageE('Ya existe una sesión programada para esta fecha. Por favor seleccione otra fecha.');
      setIsSubmitting(false);
      return;
    }

    // Preparar datos para enviar
    const sessionData = {
      titulo: titulo.trim(),
      date: date,
      descripcion: descripcion.trim(),
      studentId: selectedStudent,
      userId: mentorRFC
    };
    console.log('API base:', apiUrl);
const url = `${apiUrl}/api/insertSession`;
console.log('POST a:', url);
console.log('Payload:', sessionData);


    try {
      const response = await fetch(`${apiUrl}/api/insertSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setShowSuccessAlert(true);
        // Limpiar formulario
        setTitulo('');
        setDate('');
        setDescripcion('');
        setSelectedStudent('');
        setShowDateEditor(false);
        // Actualizar sesiones
        await fetchSessions();
      } else {
        setMessageE(data.message || 'Error al agendar la sesión');
      }

    } catch (error) {
      console.error('Error saving session:', error);
      setMessageE('Error al conectar con el servidor. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeErrorAlert = () => setMessageE('');
  const closeWarningAlert = () => setMessageD('');

  // Función para formatear fecha mínima (hora actual + 1 hora)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Mínimo 1 hora en el futuro
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        {/* Alerta de éxito */}
        {showSuccessAlert && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="container" style={{ width: '80%', maxWidth: '400px', backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
              <div className="container text-center">
                <label className='m-4' style={{ color:'white' }}>La sesión ha sido guardada correctamente.</label>
                <div className='mb-4'>
                  <LinkSecundaryCentered text='Aceptar' link='/Mentor/inicio' />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
          <div className='col-12 mt-2'>
            <legend>Crear nueva sesión</legend>
          </div>
        </div>
        
        <div className="card p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Campo Título */}
              <div className="mb-3">
                <label htmlFor="sessionTitulo" className="form-label">
                  Título de la sesión * 
                  <small className="text-muted"> ({titulo.length}/50)</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sessionTitulo"
                  placeholder="Introduce el título de la sesión"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength="50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Campo Alumno */}
              <div className="mb-3">
                <label htmlFor="studentSelect" className="form-label">Selecciona el Alumno *</label>
                <select
                  id="studentSelect"
                  className="form-select"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                  disabled={isSubmitting || students.length === 0}
                >
                  <option value="">{students.length === 0 ? 'No hay estudiantes disponibles' : 'Selecciona un alumno'}</option>
                  {students.map(student => (
                    <option
                      key={student.EstudianteID}
                      value={student.EstudianteID}
                    >
                      {getStudentDisplayText(student)}
                    </option>
                  ))}
                </select>
                {students.length === 0 && (
                  <div className="form-text text-warning">
                    No hay estudiantes asignados a este mentor.
                  </div>
                )}
              </div>

              {/* Selector de Fecha */}
              <div style={{ maxWidth:'200px' }}>
                <ButtonPrincipalDroppingContent
                  onClick1={toggleDateEditor}
                  show1={showDateEditor}
                  text1='Seleccionar Fecha'
                  text2='Ocultar selector de fecha'
                  disabled={isSubmitting}
                />
              </div>
              
              {showDateEditor && (
                <div className="mb-3">
                  <label htmlFor="sessionDate" className="form-label">Fecha y Hora *</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="sessionDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getMinDateTime()}
                    required
                    disabled={isSubmitting}
                  />
                  <div className="form-text">
                    La fecha debe ser al menos 1 hora en el futuro
                  </div>
                </div>
              )}

              {/* Campo Descripción */}
              <div className="mb-3">
                <label htmlFor="sessionDescripcion" className="form-label">
                  Descripción * 
                  <small className="text-muted"> ({descripcion.length}/5000)</small>
                </label>
                <textarea
                  className="form-control"
                  id="sessionDescripcion"
                  rows="3"
                  placeholder="Introduce una descripción detallada de la sesión"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxLength="5000"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Alertas de error y advertencia */}
              {messageE && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {messageE}
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeErrorAlert}></button>
                </div>
              )}
              
              {messageD && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                  {messageD}
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeWarningAlert}></button>
                </div>
              )}

              {/* Botones */}
              <div className="row justify-content-end pt-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                  <ButtonPrincipalC 
                    text={isSubmitting ? 'Guardando...' : 'Guardar'} 
                    type="submit"
                    disabled={isSubmitting || students.length === 0}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2">
                  <LinkSecundaryCentered 
                    text='Cancelar' 
                    link='/Mentor/inicio'
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}