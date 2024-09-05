import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';

export default function Page() {
  const [showDateEditor, setShowDateEditor] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [date, setDate] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [messageS, setMessageS] = useState(''); // Estado para el mensaje de éxito
  const [messageE, setMessageE] = useState(''); // Estado para el mensaje de ERROR
  const [messageD, setMessageD] = useState(''); // Estado para el mensaje de advertencia

  const mentorRFC = localStorage.getItem('userId');

  useEffect(() => {
    // Cargar alumnos desde el servidor filtrados por el mentor actual
    fetch(`http://localhost:3001/api/getStudentsOfMentor/${mentorRFC}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, [mentorRFC]);

  // Función para obtener la fecha y hora actuales en formato ISO para el atributo min
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
  };

  const toggleDateEditor = () => {
    setShowDateEditor(!showDateEditor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!titulo || !date || !descripcion || !selectedStudent) {
      setMessageD('Todos los campos son obligatorios.'); // Mensaje de advertencia
      return;
    }

    setMessageD(''); // Limpiar mensaje de advertencia

    const sessionData = {
      titulo,
      date,
      descripcion,
      studentId: selectedStudent,
      userId: mentorRFC
    };

    fetch('http://localhost:3001/api/insertSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessageS('Sesión agendada'); // Mostrar mensaje de éxito
          setMessageE(''); // Limpiar mensaje de error si existe
          // Limpiar los campos después de guardar
          setTitulo('');
          setDate('');
          setDescripcion('');
          setSelectedStudent('');
        } else {
          setMessageE('Error al agendar la sesión'); // Mensaje en caso de error
          setMessageS(''); // Limpiar mensaje de éxito si existe
        }
      })
      .catch(error => {
        console.error('Error saving session:', error);
        setMessageE('Error al agendar la sesión'); // Mensaje en caso de error
        setMessageS(''); // Limpiar mensaje de éxito si existe
      });
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
          <div className='col-12 mt-2'>
            <legend>Crear Nueva Sesión</legend>
          </div>
        </div>
        <div className="card p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
          <div className="card-body">
            {messageS && (
              <div className="alert alert-success" role="alert">
                {messageS}
              </div>
            )}
            {messageE && (
              <div className="alert alert-danger" role="alert">
                {messageE}
              </div>
            )}
            {messageD && (
              <div className="alert alert-warning" role="alert">
                {messageD}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="sessionTitulo" className="form-label">Título de la Sesión: {date}</label>
                <input
                  type="text"
                  className="form-control"
                  id="sessionTitulo"
                  placeholder="Introduce el título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength="50" // Limitar a 50 caracteres
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
                    <option key={student.Nombre} value={student.Nombre}>{student.Nombre}</option>
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
                    //min={getCurrentDateTime()} // Establecer fecha mínima
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
                  maxLength="5000" // Limitar a 5000 caracteres
                ></textarea>
              </div>
              <div className="row justify-content-end pt-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                  <ButtonPrincipalC
                    text='Guardar'
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2">
                  <LinkSecundaryCentered
                    text='Cancelar'
                    link="/Mentor/inicio"
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
