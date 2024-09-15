import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState, useEffect } from 'react';
import ButtonPrrincipal from '../../components/Button/ButtonPrincipalC.jsx';
import LinkSecundary from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';

export default function Page() {
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [eventId, setEventId] = useState();
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const eventId = sessionStorage.getItem('eventId');
    if (eventId) {
      setEventId(eventId);
    }
  }, []);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${apiUrl}/api/especialidades`)
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error('Error al obtener especialidades:', error);
      });

    if (eventId) {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      axios.get(`${apiUrl}/api/getEvent/${eventId}`)
        .then(response => {
          const event = response.data[0];
          setEventId(event.EventoID);
          setEventName(event.Nombre);
          setSpecialty(event.Especialidad);
          setDescription(event.Descripcion);
          setDate(event.Fecha.split('T')[0]);
          setLink(event.Link || '');
        })
        .catch(error => {
          console.error('Error al obtener los detalles del evento:', error);
        });
    }
  }, [eventId]);

  const handleSave = (event) => {
    event.preventDefault();

    const eventData = {
      eventName,
      specialty,
      description,
      date
    };

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    axios.put(`${apiUrl}/api/updateEvent/${eventId}`, eventData)
      .then(response => {
        alert('¡Evento actualizado exitosamente!');
        navigate('/Admin/eventos');
      })
      .catch(error => {
        alert('Error al actualizar el evento. Por favor, verifique los datos ingresados.');
        console.error('Error al actualizar el evento:', error);
      });
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', color: 'white', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h1 className="text-center mb-4">Editar Evento</h1>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="nombreEvento" className="form-label">Nombre del Evento</label>
          <input 
            type="text" 
            className="form-control" 
            id="nombreEvento"
            placeholder="Ejemplo de nombre del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="especialidadEvento" className="form-label">Especialidad</label>
          <select 
            className="form-select" 
            aria-label="Especialidad"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="" disabled>Selecciona una especialidad</option>
            {specialties.map((spec, index) => (
              <option key={index} value={spec.Especialidad}>{spec.Especialidad}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="descripcionEvento" className="form-label">Descripción</label>
          <textarea 
            className="form-control" 
            id="descripcionEvento"
            rows="4"
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
              text1="Editar link"
              text2="Ocultar opción"
            />
          </div>
          {showEditor && (
            <div className="mt-2">
              <input 
                type="text" 
                className="form-control" 
                id="eventoLink" 
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
                text='Guardar'
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