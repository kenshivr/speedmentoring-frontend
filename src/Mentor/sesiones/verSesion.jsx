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
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const sesionId = sessionStorage.getItem('sesionId');

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        if (sesionId) {
          const apiUrl = process.env.REACT_APP_BACKEND_URL;
          const response = await axios.get(`${apiUrl}/api/getReportMentor/${sesionId}`);
          //const response = await axios.get(`http://localhost:3001/api/getReportMentor/${sesionId}`);
          if (response.data.success) {
            if (response.data.data.texto) setReportExist(true);
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
          console.error('No se encontró sesionId en sessionStorage');
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
      const sesionId = sessionStorage.getItem('sesionId');
      const userId = sessionStorage.getItem('userId');
      const fechanueva = new Date(fecha).toISOString().split('T')[0];

      if (sesionId) {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.post(`${apiUrl}/api/setReportMentor/${sesionId}`, {
        //const response = await axios.post(`http://localhost:3001/api/setReportMentor/${sesionId}`, {
          userId: userId,
          fecha: fechanueva,
          texto: texto,
          titulo: titulo,
          descripcion: descripcion
        });

        if (response.data.success) {
          setEditableTexto(false);
          setReportExist(true);
          setSuccessMessage('Reporte guardado exitosamente.'); // Mensaje de éxito
        } else {
          console.error('Error al actualizar el texto:', response.data.message);
        }
      } else {
        console.error('No se encontró sesionId en sessionStorage');
      }
    } catch (error) {
      console.error('Error en la solicitud para actualizar el texto:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };  

  return (
    <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
           Reporte
          </p>
        </header>
      </div>
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
        <div className="row p-2" style={{ backgroundColor: 'white', borderRadius: '10px', minHeight: 'auto' }}>
          <textarea
            className="flex-grow-1 p-2"
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }}
            value={texto || ''}
            onChange={handleTextoChange}
            disabled={!editableTexto}
            placeholder="Escribe aquí tu reporte de la sesión. Debe contener: Objetivos establecidos y/o logrados, temas discutidos, acciones a seguir, etc."
            rows={10}
          />

          {reportExist ? <></> : <div className='container d-flex justify-content-center mt-2'>
                      <ButtonPrincipalDroppingContent2
                        onClick1={handleUpdateTexto}
                        show1={editableTexto}
                        text1='Guardar cambios'
                        onClick2={handleEditTextoToggle}
                        text2='Cancelar'
                        text3='Editar'
                      />
                    </div>}
        
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>} {/* Mostrar mensaje de éxito */}
        </div>
        <div className="container d-flex flex-column align-items-center mt-auto pt-5">
          <div className='pt-3' style={{ minWidth: '199px' }}>
            <LinkSecundaryCentered
              text='Regresar'
              link="/Mentor/sesiones" // Usa el path relativo a tu enrutador
            />
          </div>
        </div>
      </div>
    </div>
  );
}
