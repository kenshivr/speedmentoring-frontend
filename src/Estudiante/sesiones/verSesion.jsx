import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Page() {
  const [editableTexto, setEditableTexto] = useState(false);
  const [texto, setTexto] = useState('');
  const [originalTexto, setOriginalTexto] = useState(''); 
  const [fecha, setFecha] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numeroDeSesion, setNumeroDeSesion] = useState('');

  const sesionId = localStorage.getItem('sesionId');

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        if (sesionId) {
          const response = await axios.get(`http://localhost:3001/api/getReportStudent/${sesionId}`);
          if (response.data.success) {
            setTexto(response.data.data.texto || '');
            setOriginalTexto(response.data.data.texto || '');
            setFecha(response.data.data.fecha || '');
            setNumeroDeSesion(response.data.data.numeroDeSesion || '');
            setTitulo(response.data.data.titulo || '');
            setDescripcion(response.data.data.descripcion || '');
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
  }, [sesionId]);

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
      const userId = localStorage.getItem('userId');
      const fechanueva = new Date(fecha).toISOString().split('T')[0];

      if (sesionId) {
        const response = await axios.post(`http://localhost:3001/api/setReportStudent/${sesionId}`, {
          userId: userId,
          fecha: fechanueva,
          texto: texto,
          titulo: titulo,
          descripcion: descripcion
        });

        if (response.data.success) {
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
    <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto' }}>
      <div className="row g-0 text-center mb-3">
          <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
            <div className='row'>
              <div className='col-sm-6'>
                <legend>{titulo}</legend>
              </div>
              <div className='col-sm-4'>
                <legend>{new Date(fecha).toLocaleDateString()}</legend>
              </div>
              <div className='col-sm-2'>
                <legend>Sesión #{numeroDeSesion}</legend>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <p>{descripcion}</p>
              </div>
            </div>
          </div>
        </div>

      <div className="row justify-content-evenly px-3">
        <div className="row p-2" style={{ backgroundColor: 'white', borderColor: '#908486', borderRadius:'10px', borderWidth: '10px', borderStyle: 'solid', minHeight:'auto' }}>
          <textarea
            className="flex-grow-1 p-2"
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }}
            value={texto || ''}
            onChange={handleTextoChange}
            disabled={!editableTexto}
            placeholder="Escribe aquí tu reporte de la sesión. Debe contener: Objetivos establecidos y/o logrados, temas discutidos, acciones a seguir, etc."
            rows={10}
          />
          <div className="d-flex justify-content-center">
            <div className='container d-flex justify-content-center'>
              {editableTexto && (
                <button className="btn btn-warning btn-outline-dark" style={{ 
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
                }} onClick={handleUpdateTexto}>
                  Guardar Cambios
                </button>
              )}
              <button className="btn btn-warning btn-outline-dark ms-2" style={{ 
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
            }} onClick={handleEditTextoToggle}>
                {editableTexto ? 'Cancelar' : 'Editar'}
              </button>
            </div>
          </div>
        </div>

        <div className="container d-flex flex-column align-items-center mt-auto pt-5">
          <Link
            to="/Estudiante/sesiones/verSesion/retroalimentacion" // Usa el path relativo a tu enrutador
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
            FeedBack para el mentor
          </Link>
        </div>
      </div>
    </div>
  );
}
