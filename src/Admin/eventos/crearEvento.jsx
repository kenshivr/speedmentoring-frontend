import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ButtonPrrincipal from '../../components/Button/ButtonPrincipal_Centered_typeSubmit.jsx';
import LinkSecundary from '../../components/Link/LinkSecundary_Centered.jsx';

export default function Page() {
  const [eventName, setEventName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [description, setDescription] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const [link, setLink] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/especialidades')
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

    axios.post('http://localhost:3001/api/newEventAdmin', eventData)
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

  return (
    <div className="container-sm my-1 mt-5 p-4" style={{ backgroundColor:'#002B7A', color:'white', borderRadius:'20px' }}>
      <h1 className='text-center mb-5'>Nuevor evento</h1>
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
              <option value="" disabled>Especialidad</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec.Especialidad}>{spec.Especialidad}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <legend className="row mt-4 ms-4">Descripción</legend>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor:'#908486', borderWidth: '4px', borderStyle: 'solid', minHeight:'250px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
    </div>
  );
}
