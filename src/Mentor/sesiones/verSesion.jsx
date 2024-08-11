import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Page() {
  
  const [texto, setTexto] = useState('');
  const [Fecha, setFecha] = useState('');
  const [Titulo, setTitulo] = useState('');
  const [originalTexto, setOriginalTexto] = useState(''); 
  const [editableTexto, setEditableTexto] = useState(false);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const sesionId = localStorage.getItem('sesionId');
        if (sesionId) {
          const response = await axios.get(`http://localhost:3001/api/reporte/${sesionId}`);
          if (response.data.success) {
            setTexto(response.data.data.texto || '');
            setOriginalTexto(response.data.data.texto || '');
            setFecha(response.data.data.Fecha || '');
            setTitulo(response.data.data.Titulo || '');
          } else {
            console.error('Error al obtener detalles del reporte:', response.data.message);
          }
        } else {
          console.error('No se encontró sesionId en localStorage');
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener detalles del reporte:', error);
      }
    };

    fetchReporte();
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  const handleEditTextoToggle = (e) => {
    e.preventDefault();
    if (editableTexto) {
      setTexto(originalTexto); // Restaurar el texto original si se cancela la edición
    } else {
      setOriginalTexto(texto); // Guardar el texto actual al comenzar a editar
    }
    setEditableTexto(!editableTexto);
  };

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
  };

  const handleUpdateTexto = async () => {
    try {
      const sesionId = localStorage.getItem('sesionId');

      if (sesionId) {
        const response = await axios.post(`http://localhost:3001/api/reporte/${sesionId}`, {
          texto: texto
        });

        if (response.data.success) {
          console.log('Texto actualizado con éxito');
          setEditableTexto(false);
        } else {
          console.error('Error al actualizar el texto:', response.data.message);
        }
      } else {
        console.error('No se encontró sesionId en localStorage');
      }
    } catch (error) {
      console.error('Error en la solicitud para actualizar el texto:', error);
    }
  };

  return (
    <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1800px', minHeight: '600px', margin: 'auto' }}>
      <div className="row justify-content-evenly">

        <div className="col-12 col-md-4 order-last order-md-first m-1 d-flex flex-column" style={{ backgroundColor: 'rgba(213,213,213,0.8)', borderColor: '#908486', borderRadius: '20px', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
          
          <div className='container p-3'>
            <h2>{formatDate(Fecha)}</h2>
            <h6>Título - {Titulo}</h6>
          </div>

          <div className="container d-flex flex-column align-items-center mt-auto p-4">
            <Link
              to="/Mentor/sesiones/verSesion/retroalimentacion" // Usa el path relativo a tu enrutador
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#EFCA45', 
                color: '#3A2E01', 
                border: '1px solid #000',
                borderRadius: '20px',
                transition: 'background-color 0.3s, color 0.3s', 
                textAlign: 'center', 
                textDecoration: 'none', 
                padding: '0.5rem 1rem', 
                maxWidth: '250px' // Manteniendo la propiedad original
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFCA45';
                e.currentTarget.style.color = '#3A2E01';
              }}
            >
              Retroalimentación del alumno
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor: '#908486', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
          <textarea
            className="flex-grow-1 p-2"
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }}
            value={texto || ''}
            onChange={handleTextoChange}
            disabled={!editableTexto}
            placeholder="Escribe aquí tu reporte de la sesión. Debe contener: Objetivos establecidos y/o logrados, temas discutidos, acciones a seguir, ..."
            rows={10}
          />

          <div className="d-flex justify-content-center p-4">
            {editableTexto && (
              <button className="btn btn-warning btn-outline-dark" onClick={handleUpdateTexto}>
                Guardar Cambios
              </button>
            )}
            <button className="btn btn-warning btn-outline-dark ms-2" onClick={handleEditTextoToggle}>
              {editableTexto ? 'Cancelar' : 'Editar'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
