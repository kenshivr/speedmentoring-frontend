import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Page = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);

  // const userId = localStorage.getItem('userId');

  const fetchSpecialty = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getSpecialties/${userId}`);
      setSpecialty(response.data[0].EspecialidadID);
    } catch (error) {
      alert('Error al obtener la especialidad del alumno: ' + error);
    }
  }, [userId]);

  const fetchEvents = useCallback(async () => {
    if (specialty === null) return;

    try {
      const response = await axios.get(`http://localhost:3001/api/getEventsStudent/${specialty}`);
      setEvents(response.data.slice(0, 3)); // Mostrar solo los primeros 3 eventos
    } catch (error) {
      alert('Error al obtener los eventos: ' + error);
    } finally {
      setLoading(false);
    }
  }, [specialty]);

  useEffect(() => {
    fetchSpecialty();
  }, [fetchSpecialty]);

  useEffect(() => {
    fetchEvents();
  }, [specialty, fetchEvents]);

  if (loading) {
    return (<div className="container-sm my-1 mt-5 p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
          <div className='mb-3'>
            <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto' }}>
              <div className="container">
                <div className="container text-center">{/*_______________________ ___________________________________________________|*/}
                  <div className="row align-items-start p-4">
                    <div className="col"></div>
                    <div className="col" style={{ borderBottom: "2px solid white" }}>
                      <h4 style={{ color: "white" }}>Eventos recientes</h4>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="container p-2" style={{ color: 'white' }}>
                  {events.length > 0 ? (
                    events.map(event => (
                      <div key={event.EventoID} className="row my-5">
                        <div className="col">
                          <div className="row">
                            <div className="col">
                              <h5>{event.Nombre}</h5>
                            </div>
                          </div>
                          <div className="row">
                            <h6 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px' }}>
                              {event.Descripción}
                            </h6>
                          </div>
                          <div className="row">
                            <h6 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                              Fecha de publicación: {new Date(event.Fecha).toLocaleDateString()} a las {new Date(event.Fecha).toLocaleTimeString()}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="row my-5">
                      <div className="col text-center">
                        <h6>Cargando...</h6>
                      </div>
                    </div>
                  )}
                  <div className="row my-5">
                    <div className="row">
                      <div className="col"></div>
                      <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Link
                          type="button"
                          className="btn w-75"
                          to="/Estudiante/eventos/page"
                          style={{
                            backgroundColor: '#EFCA45',
                            color: '#3A2E01',
                            borderRadius: '20px',
                            fontSize: '10px'
                          }}
                        >
                          Ver más
                        </Link>
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }

  return (
    <div className="container-sm my-1 mt-5 p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
          <div className='mb-3'>
            <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto' }}>
              <div className="container">
                <div className="container text-center">{/*_______________________ ___________________________________________________|*/}
                  <div className="row align-items-start p-4">
                    <div className="col"></div>
                    <div className="col" style={{ borderBottom: "2px solid white" }}>
                      <h4 style={{ color: "white" }}>Eventos recientes</h4>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="container p-2" style={{ color: 'white' }}>
                  {events.length > 0 ? (
                    events.map(event => (
                      <div key={event.EventoID} className="row my-5">
                        <div className="col">
                          <div className="row">
                            <div className="col">
                              <h5>{event.Nombre}</h5>
                            </div>
                          </div>
                          <div className="row">
                            <h6 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px' }}>
                              {event.Descripción}
                            </h6>
                          </div>
                          <div className="row">
                            <h6 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                              Fecha de publicación: {new Date(event.Fecha).toLocaleDateString()} a las {new Date(event.Fecha).toLocaleTimeString()}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="row my-5">
                      <div className="col text-center">
                        <h6>No existen eventos asociados a tu especialidad, se aconseja revisar todos los eventos.</h6>
                      </div>
                    </div>
                  )}
                  <div className="row my-5">
                    <div className="row">
                      <div className="col"></div>
                      <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Link
                          type="button"
                          className="btn w-75"
                          to="/Estudiante/eventos/page"
                          style={{
                            backgroundColor: '#EFCA45',
                            color: '#3A2E01',
                            borderRadius: '20px',
                            fontSize: '10px'
                          }}
                        >
                          Ver más
                        </Link>
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
