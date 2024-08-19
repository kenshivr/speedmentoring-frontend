import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import ButtonPrrincipal from '../../components/Button/ButtonPrincipal_Centered_typeSubmit.jsx';
import LinkSecundary from '../../components/Link/LinkSecundary_Centered.jsx';

export default function Page() {
  const [eventId, setEventId] = useState();
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const [link, setLink] = useState('');

  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const eventId = localStorage.getItem('eventId');
    if (eventId) {
      setEventId(eventId);
    }
  }, []);

  useEffect(() => {
    // Obtener especialidades
    axios.get('http://localhost:3001/api/especialidades')
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error('Error al obtener especialidades:', error);
      });

    // Obtener detalles del evento para editar
    if (eventId) {
      axios.get(`http://localhost:3001/api/getEvent/${eventId}`)
        .then(response => {
          const event = response.data;
          setEventId(event.EventoID);
          setEventName(event.Nombre);
          setSpecialty(event.Especialidad);
          setDescription(event.Descripción);
          setDate(event.Fecha.split('T')[0]);
          setHasLink(!!event.Link);
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
      date,
      link: hasLink ? link : ''
    };

    axios.post(`http://localhost:3001/api/updateEvent/${eventId}`, eventData)
      .then(response => {
        alert('¡Evento actualizado exitosamente!');
        navigate('/Admin/eventos'); // Redirige a /Admin/page después del guardado
      })
      .catch(error => {
        alert('Error al actualizar el evento. Por favor, verifique los datos ingresados.');
        console.error('Error al actualizar el evento:', error);
      });
  };

  return (
    <div className="container-sm my-1 mt-5 p-4" style={{ backgroundColor:'#002B7A', color:'white', borderRadius:'20px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <h1 className='text-center mb-5'>Editar evento</h1>


      <div className="row">
        <form>
          <label htmlFor="nombreEvento" className="form-label">Nombre del evento</label>
          <input 
            type="text" 
            className="form-control" 
            id="nombreEvento"
            placeholder="Ejemplo de nombre del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </form>
      </div>



      <div className="row">
        <label htmlFor="especialidadEvento" className="form-label">Especialidad</label>
        <form>
          <select 
            className="form-select" 
            aria-label="Especialidad"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="" disabled>Especialidad</option>
            {specialties.map((spec, index) => (
              <option key={index} value={spec.Especialidad}>{spec.Especialidad}</option>
            ))}
          </select>
        </form>
      </div>




      <div className="row">
        <label htmlFor="fechaEvento" className="form-label">Fecha</label>
        <input 
          type="text" 
          className="form-control" 
          id="fechaEvento" 
          placeholder="Fecha del evento. Ejemplo: 2024-01-01"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>






      <div className="row">
        <label htmlFor="descripcionEvento" className="form-label">Descipción</label>
        <div className="col order-first order-md-last d-flex" style={{ backgroundColor: 'white', borderColor:'#908486', borderWidth: '4px', borderStyle: 'solid', minHeight:'200px' }}>
          <textarea 
            className="flex-grow-1 p-2" 
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }} 
            placeholder="Escribe una descripción del evento que se mostrará a los alumnos ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>






        <div className="row">
          <legend>¿Botón para más información?</legend>
        </div>
        <div className="col-12 col-md-2 d-flex flex-column pt-3">
          <form>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="flexRadioDefault" 
                id="linkYes" 
                checked={hasLink}
                onChange={() => setHasLink(true)}
              />
              <label className="form-check-label" htmlFor="linkYes">
                Sí
              </label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="flexRadioDefault" 
                id="linkNo"
                checked={!hasLink}
                onChange={() => setHasLink(false)}
              />
              <label className="form-check-label" htmlFor="linkNo">
                No
              </label>
            </div>
          </form>
        </div>

        

        <div className="col d-flex flex-column">
          <form>
            <input 
              type="text" 
              className="form-control" 
              id="eventoLink" 
              placeholder="Ejemplo de link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={!hasLink}
            />
          </form>
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
    </div>
  );
}
