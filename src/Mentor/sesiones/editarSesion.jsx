import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EditSessionPage() {
  const sesionId = localStorage.getItem('sesionId');
  const [datos, setDatos] = useState({});
  const [showDateEditor, setShowDateEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!sesionId) {
      setErrorMessage('No se encontró el ID de sesión.');
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getSesionMentor/${sesionId}`);
        if (response.data) {
          const data = response.data;
          setDatos(data);
          setTitle(data.Titulo || ''); 
          setDescription(data.Descripcion || ''); // Asegúrate de que el nombre sea correcto
          const studentName = `${data.Nombre || ''} ${data.ApellidoPaterno || ''} ${data.ApellidoMaterno || ''}`.trim();
          setSelectedStudent(studentName);
  
          const sessionDate = new Date(data.Fecha);
          const year = sessionDate.getFullYear();
          const month = String(sessionDate.getMonth() + 1).padStart(2, '0');
          const day = String(sessionDate.getDate()).padStart(2, '0');
          const hours = String(sessionDate.getHours()).padStart(2, '0');
          const minutes = String(sessionDate.getMinutes()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
          setDate(formattedDate);
        } else {
          setErrorMessage('No se pudo cargar la sesión.');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud.');
        console.error('Error:', error);
      }
    };

    fetchSession();
  }, [sesionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionData = { date, title, description };
      const response = await axios.put(`http://localhost:3001/api/putSesionMentor/${sesionId}`, sessionData);
      if (response.data.success) {
        setSuccessMessage('Sesión actualizada con éxito.');
      } else {
        setErrorMessage('Error al actualizar la sesión.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container p-5 my-5'>
      <div className="container-sm p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-12 mt-2'>
              <legend>Editar Sesión</legend>
            </div>
          </div>
          <div className="card p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="sessionTitle" className="form-label">Título de la Sesión</label>
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
                  <label htmlFor="studentName" className="form-label">Alumno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    value={selectedStudent}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDateEditor(!showDateEditor)}
                    style={{
                      backgroundColor: '#EFCA45',
                      color: '#4F3F05',
                      borderRadius: '20px',
                      border: '1px solid #000',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
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
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
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
                      Modificar
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
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
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
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
