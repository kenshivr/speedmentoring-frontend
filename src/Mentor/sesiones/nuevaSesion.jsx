import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx';
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';
import LinkPrimaryC from '../../components/Link/LinkPrincipalCentered.jsx';

export default function Page() {
  const [date, setDate] = useState('');
  const [titulo, setTitulo] = useState('');
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]); // Nueva lista para sesiones existentes
  const [messageS, setMessageS] = useState('');
  const [messageE, setMessageE] = useState('');
  const [messageD, setMessageD] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showDateEditor, setShowDateEditor] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Para mostrar la alerta

  const mentorRFC = sessionStorage.getItem('userId');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Normalizador de posibles respuestas
  const normalizeStudents = (maybe) => {
    if (!maybe) return [];
    if (Array.isArray(maybe)) return maybe;
    if (Array.isArray(maybe.data)) return maybe.data;
    if (Array.isArray(maybe.students)) return maybe.students;
    // Si viene un objeto con una propiedad diferente, intenta buscar la que sea array
    for (const key in maybe) {
      if (Array.isArray(maybe[key])) return maybe[key];
    }
    return [];
  };

  useEffect(() => {
    if (mentorRFC) {
      fetchStudents();
      fetchSessions();
    } else {
      // si no hay mentorRFC, deja students vacíos
      setStudents([]);
      setSessions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorRFC]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/getStudentsOfMentor/${mentorRFC}`);
      const data = await response.json();
      const studentsArray = normalizeStudents(data);
      setStudents(studentsArray);
      console.log('DEBUG fetchStudents -> raw:', data);
      console.log('DEBUG fetchStudents -> normalized array length:', studentsArray.length);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]); // fallback seguro
    }
  };

  // Obtener las sesiones existentes para el mentor
  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/showSesionesMentor/${mentorRFC}`);
      const data = await response.json();
      // Tu backend antes usaba data.data, lo respetamos y verificamos
      if (Array.isArray(data.data) && data.data.length > 0) {
        setSessions(data.data);
      } else {
        setSessions([]); // fallback
      }
      console.log('DEBUG fetchSessions ->', data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    }
  };

  const toggleDateEditor = () => {
    setShowDateEditor(!showDateEditor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!titulo) missingFields.push("Título");
    if (!date) missingFields.push("Fecha y Hora");
    if (!descripcion) missingFields.push("Descripción");
    if (!selectedStudent) missingFields.push("Alumno");

    if (missingFields.length > 0) {
      setMessageD(`Campos faltantes: ${missingFields.join(", ")}.`);
      return;
    }

    setMessageD(''); // Limpiar mensaje si no hay campos faltantes

    // Formatear la fecha ingresada a solo la fecha (sin hora) para comparar
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    // Verificar si ya existe una sesión en la misma fecha
    const sameDaySession = sessions.some((session) => {
      const sessionDate = new Date(session.Fecha);
      sessionDate.setHours(0, 0, 0, 0); // Comparar solo la fecha sin hora
      return sessionDate.getTime() === inputDate.getTime();
    });

    if (sameDaySession) {
      setMessageE('Ya existe una sesión en esta fecha. Por favor selecciona otra fecha.');
      return;
    }

    const sessionData = {
      titulo,
      date,
      descripcion,
      studentId: selectedStudent,
      userId: mentorRFC
    };

    fetch(`${apiUrl}/api/insertSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setShowSuccessAlert(true);
          setMessageE('');
          setTitulo('');
          setDate('');
          setDescripcion('');
          setSelectedStudent('');
          fetchSessions(); // Actualizar lista de sesiones después de agregar una nueva
        } else {
          setMessageE('Error al agendar la sesión');
          setMessageS('');
        }
      })
      .catch(error => {
        console.error('Error saving session:', error);
        setMessageE('Error al agendar la sesión');
        setMessageS('');
      });
  };

  const closeErrorAlert = () => setMessageE('');
  const closeWarningAlert = () => setMessageD('');

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        {/* Alerta centralizada */}
        {showSuccessAlert && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div className="container" style={{ width: '80%', maxWidth: '400px',  backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)'  }}>
              <div className="container text-center" >
                <label className='m-4' style={{ color:'white' }}>La sesión ha sido guardada correctamente.</label>
                <div className='mb-4'>
                  <LinkSecundaryCentered text = 'Aceptar' link='/Mentor/inicio'></LinkSecundaryCentered>
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
              <div className="mb-3">
                <label htmlFor="sessionTitulo" className="form-label">Título de la sesión: {date}</label>
                <input
                  type="text"
                  className="form-control"
                  id="sessionTitulo"
                  placeholder="Introduce el título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength="50"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="studentSelect" className="form-label">Selecciona el Alumno</label>
                <select
                  id="studentSelect"
                  className="form-select"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">Selecciona un alumno</option>
                  {students.map(student => (
                    <option
                      key={student.EstudianteID ?? student.Nombre ?? Math.random()}
                      value={student.EstudianteID ?? student.Nombre ?? ''}
                    >
                      {`${student.Nombre ?? ''} ${student.ApellidoPaterno ?? ''} ${student.ApellidoMaterno ?? ''}`}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ maxWidth:'200px' }}>
                <ButtonPrincipalDroppingContent
                  onClick1={toggleDateEditor}
                  show1={showDateEditor}
                  text1='Editar Fecha'
                  text2='Ocultar opciones de fecha'
                />
              </div>
              {showDateEditor && (
                <div className="mb-3">
                  <label htmlFor="sessionDate" className="form-label">Fecha y Hora</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="sessionDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="sessionDescripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="sessionDescripcion"
                  rows="3"
                  placeholder="Introduce una breve descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxLength="5000"
                ></textarea>
              </div>
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
              <div className="row justify-content-end pt-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                  <ButtonPrincipalC text='Guardar' />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2">
                  <LinkSecundaryCentered text='Cancelar' link='/Mentor/inicio'/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
