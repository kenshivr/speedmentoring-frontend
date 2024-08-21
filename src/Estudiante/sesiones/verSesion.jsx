import axios from 'axios';
import React, { useState, useEffect } from 'react';

import LinkPrincipalCentered from '../../components/Link/LinkPrincipalCentered.jsx'; 
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx'; 

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
    <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
        <div className="row p-2" style={{ backgroundColor: 'white', borderRadius:'10px', minHeight:'auto' }}>
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
                <button 
                className="btn w-100 mx-1 mt-2"
                style={{
                  backgroundColor: '#EFCA45',
                  color: '#4F3F05',
                  borderRadius: '20px',
                  maxWidth: '200px',
                  transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
                }} 
                onClick={handleUpdateTexto}>
                  Guardar Cambios
                </button>
              )}
              <button 
                className="btn w-100 mx-1 mt-2"
                style={{
                  backgroundColor: '#EFCA45',
                  color: '#4F3F05',
                  borderRadius: '20px',
                  maxWidth: '200px',
                  transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
                }} 
                onClick={handleEditTextoToggle}>
                {editableTexto ? 'Cancelar' : 'Editar'}
              </button>
            </div>
          </div>
        </div>

        <div className="container d-flex flex-column align-items-center mt-auto pt-5">
          <LinkPrincipalCentered
            text='Feedback para el mentor'
            link="/Estudiante/sesiones/verSesion/retroalimentacion" // Usa el path relativo a tu enrutador
          />
          <div className='pt-3' style={{ minWidth:'199px' }}>
            <LinkSecundaryCentered
              text='Cancelar'
              link="/Estudiante/sesiones" // Usa el path relativo a tu enrutador
            />
          </div>
        </div>
      </div>
    </div>
  );
}
