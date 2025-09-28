import axios from 'axios';
import React, { useState, useEffect } from 'react';

import ButtonPrincipalDroppingContent2 from '../../components/Button/ButtonPrincipalDroppingContent2.jsx';
import LinkSecundaryCentered from '../../components/Link/LinkSecundaryCentered.jsx'; 

export default function Page() {
  const [editableTexto, setEditableTexto] = useState(false);
  const [texto, setTexto] = useState('');
  const [originalTexto, setOriginalTexto] = useState(''); 
  const [fecha, setFecha] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numeroDeSesion, setNumeroDeSesion] = useState('');
  const [reportExist, setReportExist] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sesionId = sessionStorage.getItem('sesionId');

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        if (!sesionId) {
          setErrorMessage('No se encontró la sesión seleccionada.');
          return;
        }

        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/getReportStudent/${sesionId}`);

        if (response.data.success && response.data.data) {
          const data = response.data.data;

          if (data.texto) setReportExist(true);
          setTexto(data.texto || '');
          setOriginalTexto(data.texto || '');
          setFecha(data.fecha || '');
          setNumeroDeSesion(data.numeroDeSesion || '');
          setTitulo(data.titulo || 'Sin título');
          setDescripcion(data.descripcion || 'Sin descripción');
        } else {
          setErrorMessage('No se encontró información del reporte.');
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener detalles del reporte:', error);
        setErrorMessage('Error al cargar la sesión. Intenta de nuevo más tarde.');
      }
    };

    fetchReporte();
  }, [sesionId]);

  const handleEditTextoToggle = (e) => {
    e.preventDefault();
    if (editableTexto) {
      setTexto(originalTexto);
    } else {
      setOriginalTexto(texto);
    }
    setEditableTexto(!editableTexto);
  };

  const handleTextoChange = (event) => {
    setTexto(event.target.value);
  };

  const handleUpdateTexto = async () => {
    try {
      const sesionId = sessionStorage.getItem('sesionId');
      const userId = sessionStorage.getItem('userId');

      if (!sesionId || !userId) {
        setErrorMessage('No se encontró información de sesión o usuario.');
        return;
      }

      const fechanueva = fecha ? new Date(fecha).toISOString().split('T')[0] : null;

      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/setReportStudent/${sesionId}`, {
        userId,
        fecha: fechanueva,
        texto: texto || '',
        titulo: titulo || 'Sin título',
        descripcion: descripcion || 'Sin descripción'
      });

      if (response.data.success) {
        setEditableTexto(false);
        setReportExist(true);
        setSuccessMessage('Reporte guardado exitosamente.');
      } else {
        setErrorMessage('Error al guardar el reporte. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud para actualizar el texto:', error);
      setErrorMessage('Error al actualizar el reporte.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const d = new Date(dateString);
    return isNaN(d) ? 'Fecha inválida' : d.toLocaleDateString();
  };

  return (
    <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="col d-flex align-items-center justify-content-center">
        <header className="text-center mb-4">
          <p
            className="text-uppercase font-weight-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'white', 
              letterSpacing: '2px'
            }}
          >
           Informe
          </p>
        </header>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row g-0 text-center mb-3">
        <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
          <div className='row'>
            <div className='col-sm-6'>
              <legend>{titulo}</legend>
            </div>
            <div className='col-sm-4'>
              <legend>{formatDate(fecha)}</legend>
            </div>
            <div className='col-sm-2'>
              <legend>Sesión #{numeroDeSesion || 'N/A'}</legend>
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
            placeholder="Escribe aquí tu informe de la sesión. Debe contener: Objetivos establecidos y/o logrados, temas discutidos, acciones a seguir, etc."
            rows={10}
          />
          {!reportExist && (
            <div className='container d-flex justify-content-center mt-2'>
              <ButtonPrincipalDroppingContent2
                onClick1={handleUpdateTexto}
                show1={editableTexto}
                text1='Guardar cambios'
                onClick2={handleEditTextoToggle}
                text2='Cancelar'
                text3='Editar'
              />
            </div>
          )}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>

        <div className="container d-flex flex-column align-items-center mt-auto pt-5">
          <div className='pt-3' style={{ minWidth:'199px' }}>
            <LinkSecundaryCentered
              text='Regresar'
              link="/Estudiante/sesiones"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
