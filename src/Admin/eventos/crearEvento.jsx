import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ButtonPrrincipal from '../../components/Button/ButtonPrincipalC.jsx';
import LinkSecundary from '../../components/Link/LinkSecundaryCentered.jsx';
import ButtonPrincipalDroppingContent from '../../components/Button/ButtonPrincipalDroppingContent.jsx';

export default function Page() {
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${apiUrl}/api/especialidades`)
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the specialties!', error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const eventData = {
      eventName,
      specialty,
      description,
      date: date ? date.split('T')[0] : '',
      link: link ? link : ''
    };

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    axios.post(`${apiUrl}/api/newEventAdmin`, eventData)
      .then(response => {
        alert('Evento creado correctamente!');
        setEventName('');
        setSpecialty('');
        setDescription('');
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

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Extrae solo la fecha
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

        <div className="mb-3">
          <label htmlFor="eventDate" className="form-label">Fecha y Hora</label>
          <input
            type="date"
            className="form-control"
            id="eventDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getCurrentDate()}
          />
        </div>

        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ maxWidth: '200px' }}>
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
            <ButtonPrrincipal text="Crear" type="submit" />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <LinkSecundary text="Cancelar" link="/Admin/eventos" />
          </div>
        </div>
      </form>
    </div>
  );
}