import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ButtonPrrincipal from '../../components/Button/ButtonPrincipalC.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';
import LinkSecundary from '../../components/Link/LinkSecundaryCentered.jsx';

export default function Page() {
  const [showEditor, setShowEditor] = useState(false);
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const [link, setLink] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${apiUrl}/api/especialidades`)
    //axios.get(`http://localhost:3001/api/especialidades`)
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the specialties!', error);
      });
  }, []);

  const handleSave = () => {
    const eventData = {
      eventName,
      specialty,
      description,
      date: new Date().toISOString().split('T')[0],
      link: hasLink ? link : ''
    };

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    //axios.post(`http://localhost:3001/api/newEventAdmin`, eventData)
    axios.post(`${apiUrl}/api/newEventAdmin`, eventData)
      .then(response => {
        alert('Evento creado correctamente!');
        setEventName('');
        setSpecialty('');
        setDescription('');
        setHasLink(false);
        setLink('');
        navigate('/Admin/eventos');
      })
      .catch(error => {
        alert('Verificar si los datos están en el formato correcto, no fue posible agregar el nuevo evento.');
        console.error('Hubo un error al guardar el evento!', error);
      });
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };
  
  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', color: 'white', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h1 className="text-center mb-4">Crear evento</h1>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="nombreEvento" className="form-label">Nombre del Evento</label>
          <input 
            type="text" 
            className="form-control" 
            id="eventoID_1" 
            placeholder="Ejemplo de nombre del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="especialidadEvento" className="form-label">Especialidad</label>
          <select 
              className="form-select" 
              aria-label="Default select example"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="" disabled>Especialidad</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec.Especialidad}>{spec.Especialidad}</option>
              ))}
            </select>
        </div>

        <div className="mb-3">
          <label htmlFor="descripcionEvento" className="form-label">Descripción</label>
          <textarea 
            className="flex-grow-1 p-2" 
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }} 
            placeholder="Escribe una descripción del evento que se mostrará a los alumnos ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ maxWidth:'200px'}}>
            <ButtonPrincipalDroppingContent
              onClick1={toggleEditor}
              show1={showEditor}
              text1="Agregar link"
              text2="Ocultar opción"
            />
          </div>
          {showEditor && (
            <div className="mt-2">
              <input 
                type="text" 
                className="form-control" 
                id="eventoLink_1" 
                placeholder="Ejemplo de link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="row justify-content-end mt-4 mb-3 mx-2">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
            <form onSubmit={handleSave}>
              <ButtonPrrincipal
                text='Crear'
              />
            </form>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <LinkSecundary
              text='Cancelar'
              link='/Admin/eventos'
            />
          </div>
        </div>
      </form>
    </div>
  );
}
