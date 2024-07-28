import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Page() {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Por favor, selecciona un archivo CSV.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/importUsers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setSuccessMessage('Archivo importado con éxito.');
        setFile(null);
      } else {
        setErrorMessage('Error al importar el archivo.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white' }}>
        <div className='row mb-5 m-2'>
            <div className="container mt-3" style={{ backgroundColor:''}}>
            <h1 className="mb-4">Instrucciones para la Importación de Usuarios</h1>
            <div className="alert alert-info" role="alert">
                Para importar usuarios a través de un archivo CSV, asegúrate de seguir las siguientes especificaciones para que el proceso sea exitoso:
            </div>

            <h3>1. Formato del Archivo:</h3>
            <ul>
                <li>El archivo debe estar en formato CSV.</li>
                <li>Cada campo debe estar separado por una coma.</li>
                <li>Asegúrate de que el archivo esté correctamente codificado en UTF-8.</li>
            </ul>

            <h3>2. Datos necesarios para Alumnos:</h3>
            <ul>
                <li><strong>Número de cuenta</strong></li>
                <li><strong>Nombre y apellidos</strong></li>
                <li><strong>Periodo</strong></li>
                <li><strong>Especialidad a la que desean enfocarse</strong></li>
                <li><strong>Mentor asignado</strong></li>
                <li><strong>Número de teléfono</strong></li>
            </ul>
            <pre style={{ backgroundColor:'lightgrey', color:'black' }}><code className='p-1'>
                Número de cuenta,Nombre,apellido paterno,apellido materno,Periodo,Especialidad,Mentor asignado,Número de teléfono
            </code></pre>

            Ejemplo:
            <pre style={{ backgroundColor:'lightgrey', color:'black' }}><code className='p-1'>
                123456789,Juan,Pérez,López,2024-1,Desarrollo Web,María Gómez,5520309010
            </code></pre>

            <h3>3. Datos necesarios para Mentores:</h3>
            <ul>
                <li><strong>RFC:</strong></li>
                <li><strong>Nombre y apellidos:</strong></li>
                <li><strong>Especialidad a la que se han enfocado:</strong></li>
                <li><strong>Empresa:</strong></li>
                <li><strong>Puesto:</strong></li>
                <li><strong>Grado académico:</strong></li>
                <li><strong>Maestría:</strong>(1 o 0, 1 para si y 0 para no)</li>
                <li><strong>Correo electrónico:</strong></li>
                <li><strong>Número de teléfono:</strong></li>
            </ul>
            <pre style={{ backgroundColor:'lightgrey', color:'black' }}><code className='p-1'>
                RFC,Nombre,apellido paterno,apellido materno,Especialidad,Empresa,Puesto,Grado académico,Maestría,Correo electrónico,Número de teléfono
            </code></pre>
            <pre style={{ backgroundColor:'lightgrey', color:'black' }}><code className='p-1'>
                ABC123456789,Laura,Martínez,García,Ciencia de datos,TechCorp,Analista,1,laura.martinez@techcorp.com,5510203040
            </code></pre>

            <div className="alert alert-warning mt-4" role="alert">
                <strong>Nota:</strong> Asegúrate de que cada columna esté correctamente alineada y de que no haya filas vacías o datos incorrectos. Los errores en el formato del archivo pueden provocar problemas durante la importación.
            </div>

            <p>Si necesitas más información o asistencia, no dudes en contactarnos: speedmentoringMAC@gmail.com</p>
        </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
              {/* Espacio para otras acciones si es necesario */}
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
              <button
                type="submit"
                className="btn btn-sm w-50 my-4 mx-3"
                style={{
                  backgroundColor: '#EFCA45',
                  color: '#4F3F05',
                  border: '1px solid #000',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s, color 0.3s',
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
                Guardar
              </button>
              <Link
                type="button"
                className="btn btn-sm w-50 mx-3"
                to="/admin/usuarios/page"
                style={{
                  backgroundColor: '#A0BAEB',
                  color: '#4F3F05',
                  border: '1px solid #000',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A0BAEB';
                  e.currentTarget.style.color = '#4F3F05';
                }}
              >
                Cancelar
              </Link>
            </div>
          </div>
        </form>
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>
    </div>
  );
}
