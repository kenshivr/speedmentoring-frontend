import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEventsFull');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(events.length / itemsPerPage)));
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-sm my-1 mt-5 p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
          <div className='mb-3'>
            <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto' }}>
              <div className="container">
                <div className="container text-center">
                  <div className="row align-items-start p-4">
                    <div className="col">
                    </div>
                    <div className="col" style={{ borderBottom: "2px solid white" }}>
                      <h4 style={{ color: "white" }}>Eventos recientes</h4>
                    </div>
                    <div className="col">
                    </div>
                  </div>
                </div>
                <div className="container p-2" style={{ color: 'white' }}>
                  <ul className="list-group">
                    {selectedEvents.map(event => (
                      <li key={event.EventoID} className="list-group-item" style={{ backgroundColor: '#002B7A', border: 'none', color: 'white' }}>
                        <div className="row my-5">
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
                      </li>
                    ))}
                  </ul>
                  <div className="row my-5">
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          className="btn w-75"
                          onClick={handlePrevious}
                          disabled={currentPage === 0}
                          style={{
                            backgroundColor: '#EFCA45',
                            color: '#3A2E01',
                            borderRadius: '20px',
                            fontSize: '10px'
                          }}
                        >
                          Anterior
                        </button>
                        <button
                          className="btn w-75 mt-2"
                          onClick={handleNext}
                          disabled={startIndex + itemsPerPage >= events.length}
                          style={{
                            backgroundColor: '#EFCA45',
                            color: '#3A2E01',
                            borderRadius: '20px',
                            fontSize: '10px'
                          }}
                        >
                          Siguiente
                        </button>
                      </div>
                      <div className="col">
                      </div>
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
}
