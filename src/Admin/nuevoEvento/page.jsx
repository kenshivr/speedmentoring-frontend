import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    axios.get('/api/specialties')
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
      link: hasLink ? link : ''
    };

  
    axios.post('/api/events', eventData)
      .then(response => {
        alert('Event saved successfully!');
        setEventName('');
        setSpecialty('');
        setDescription('');
        setHasLink(false);
        setLink('');
      })
      .catch(error => {
        console.error('There was an error saving the event!', error);
      });
  };

  return (
    <div className="container-sm my-1 mt-5 p-4" style={{ backgroundColor:'#002B7A', color:'white', borderRadius:'20px' }}>
      <h1 className='ms-4'>Nuevo evento</h1>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-6 d-flex flex-column">
          <form>
            <label htmlFor="nombreEvento" className="form-label">Nombre del evento</label>
            <input 
              type="text" 
              className="form-control" 
              id="eventoID_1" 
              placeholder="Ejemplo de nombre del evento"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </form>
        </div>
        <div className="col-12 col-md-5 d-flex flex-column pt-4 mt-2">
          <form>
            <select 
              className="form-select" 
              aria-label="Default select example"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option selected>Especialidad</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <legend className="row mt-4 ms-4">Descripción</legend>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor:'#908486', borderWidth: '4px', borderStyle: 'solid', minHeight:'250px' }}>
          <textarea 
            className="flex-grow-1 p-2" 
            style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }} 
            placeholder="Escribe una descripción del evento que se mostrará a los alumnos ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="row justify-content-evenly mt-4">
        <div className="col-12 col-md-3 d-flex flex-column">
          <legend>¿Botón para más información?</legend>
        </div>
        <div className="col-12 col-md-2 d-flex flex-column pt-3">
          <form>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="flexRadioDefault" 
                id="flexRadioDefault1" 
                checked={hasLink}
                onChange={() => setHasLink(true)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Si
              </label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="flexRadioDefault" 
                id="flexRadioDefault2"
                checked={!hasLink}
                onChange={() => setHasLink(false)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                No
              </label>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column pt-4">
          <form>
            <input 
              type="text" 
              className="form-control" 
              id="eventoLink_1" 
              placeholder="Ejemplo de link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={!hasLink}
            />
          </form>
        </div>
      </div>
      <div className="row justify-content-end mt-4 mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <form onSubmit={handleSave}>
            <button
              type="submit"
              className="btn w-100"
              style={{ 
                backgroundColor: '#EFCA45', 
                color: '#4F3F05', 
                border: '1px solid #000',
                borderRadius: '20px',
                transition: 'background-color 0.3s, color 0.3s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFCA45';
                e.currentTarget.style.color = '#4F3F05';
              }}>
              Guardar
            </button>
          </form>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <a
            type="button"
            className="btn w-100"
            href="/Admin/page"
            style={{ 
              backgroundColor: '#EBE4CA', 
              color: '#4F3F05', 
              border: '1px solid #000',
              borderRadius: '20px',
              transition: 'background-color 0.3s, color 0.3s' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#EBE4CA';
              e.currentTarget.style.color = '#4F3F05';
            }}>
            Cancelar
          </a>
        </div>
      </div>
    </div>
  );
}
