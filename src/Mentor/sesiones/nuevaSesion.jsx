import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {
  const [showDateEditor, setShowDateEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  const mentorRFC = localStorage.getItem('userId');

  useEffect(() => {
    // Cargar alumnos desde el servidor filtrados por el mentor actual
    fetch(`http://localhost:3001/api/getStudentsOfMentor/${mentorRFC}`)
      .then(response => {
        // Verifica si la respuesta es exitosa (código de estado 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setStudents(data); // Usa setStudents para actualizar el estado
      })
      .catch(error => console.error('Error fetching students:', error));
  }, [mentorRFC]);  

  const toggleDateEditor = () => {
    setShowDateEditor(!showDateEditor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sessionData = {
      title,
      date,
      description,
      studentId: selectedStudent,
      userId: mentorRFC
    };

    // Enviar datos al servidor
    fetch('http://localhost:3001/api/getStudentsOfMentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Session saved:', data);
        // Redirigir a la página principal o mostrar mensaje de éxito
      })
      .catch(error => console.error('Error saving session:', error));
  };

  return (
    <div className='container p-5 my-5'>
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-12 mt-2'>
              <legend>Crear Nueva Sesión</legend>
            </div>
          </div>
          <div className="card p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="sessionTitle" className="form-label">Título de la Sesión: {date}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sessionTitle"
                    placeholder="Introduce el título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleDateEditor}
                    style={{
                      backgroundColor: '#EFCA45',
                      color: '#4F3F05',
                      borderRadius: '20px',
                      border: '1px solid #000',
                      transition: 'background-color 0.3s, color 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFCA45';
                      e.currentTarget.style.color = '#4F3F05';
                    }}
                  >
                    {showDateEditor ? 'Ocultar opciones de fecha' : 'Editar Fecha'}
                  </button>
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
                  <label htmlFor="sessionDescription" className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    id="sessionDescription"
                    rows="3"
                    placeholder="Introduce una breve descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="row justify-content-end mt-4 mb-3">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <button
                          type="submit"
                          className="btn w-100"
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
                          Guardar
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <Link
                          type="button"
                          className="btn w-100"
                          to="/Mentor/inicio"
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
                          }}>
                          Cancelar
                        </Link>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
