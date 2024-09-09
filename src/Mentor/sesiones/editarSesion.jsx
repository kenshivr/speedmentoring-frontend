import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalC from '../../components/Button/ButtonPrincipalC.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';

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
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (!sesionId) {
      setErrorMessage('No se encontró el ID de sesión.');
      return;
    }

    const fetchSession = async () => {
      try {    
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getSesionMentor/${sesionId}`);
        //const response = await axios.get(`http://localhost:3001/api/getSesionMentor/${sesionId}`);
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

  // Función para obtener la fecha y hora actuales en formato ISO para el atributo min
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (!title || !date || !description || !selectedStudent) {
      setWarningMessage('Todos los campos son obligatorios.'); // Mensaje de advertencia
      return;
    }

    // Validar longitud de los campos
    if (title.length > 50) {
      setWarningMessage('El título no puede tener más de 50 caracteres.');
      return;
    }

    if (description.length > 5000) {
      setWarningMessage('La descripción no puede tener más de 5000 caracteres.');
      return;
    }

    setWarningMessage(''); // Limpiar mensaje de advertencia

    try {
      const sessionData = { date, title, description };
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(`${apiUrl}/api/putSesionMentor/${sesionId}`, sessionData);
      //const response = await axios.put(`http://localhost:3001/api/putSesionMentor/${sesionId}`, sessionData);
      if (response.data.success) {
        setSuccessMessage('Sesión actualizada con éxito.');
        setErrorMessage(''); // Limpiar mensaje de error si existe
      } else {
        setErrorMessage('Error al actualizar la sesión.');
        setSuccessMessage(''); // Limpiar mensaje de éxito si existe
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      setSuccessMessage(''); // Limpiar mensaje de éxito si existe
      console.error('Error:', error);
    }
  };

  return (
      <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='col-12 mt-2'>
              <legend>Editar Sesión</legend>
            </div>
          </div>
          <div className="card p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
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
                    maxLength="50" // Limitar a 50 caracteres
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
                <div style={{ maxWidth:'200px' }}>
                  <ButtonPrincipalDroppingContent
                    onClick1={() => setShowDateEditor(!showDateEditor)}
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
                      min={getCurrentDateTime()} // Establecer fecha mínima
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
                    maxLength="5000" // Limitar a 5000 caracteres
                  ></textarea>
                </div>
                <div className="row justify-content-end mt-4 mb-3">
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
