import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Page() {
  
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');bgt5fv4r
  const [nombre, setNombre] = useState('');
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
            setFecha(response.data.data.fecha || '');
            setNombre(response.data.data.nombre || '');
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

        <div className="col-12 col-md-4 order-last order-md-first m-1 d-flex flex-column" style={{ backgroundColor: '#F5E6E8', borderColor: '#908486', borderRadius: '20px', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
          
          <div className='container p-3'>
            <h2>{new Date(fecha).toLocaleDateString()}</h2>
            <h6>Mentor - {nombre}</h6>
          </div>

        </div>

        <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor: '#908486', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
          
          <textarea
            className="flex-grow-1 p-2"
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }}
            value={texto || ''}
            onChange={handleTextoChange}
            disabled={!editableTexto}
            placeholder="Escribe el texto del reporte..."
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