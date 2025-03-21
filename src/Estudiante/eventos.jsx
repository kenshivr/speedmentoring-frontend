import React, { useState, useEffect } from 'react';
import PaginationButtons from '../components/Button/PaginationButtons.jsx'; 

export default function EventsPage() {
  const itemsPerPage = 3;
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      fetch(`${apiUrl}/api/getEventsFull`)
        .then(response => response.json())
        .then(response => {
          if (response && Array.isArray(response)) {
            // Filtrar solo eventos futuros
            const today = new Date();
            const futureEvents = response.filter(event => new Date(event.Fecha) >= today);

            setEvents(futureEvents);
          } else {
            setEvents([]); 
          }
        })
        .catch(error => console.error('Error fetching events:', error));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
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
    <div className="container-sm p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
          <div className='mb-3'>
            <div className="container-sm mt-3" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
              <div className="container">
                <div className="container text-center">
                  <div className="row align-items-start p-4">
                    <div className="col"></div>
                    <div className="col" style={{ borderBottom: "2px solid white" }}>
                      <h4 style={{ color: "white" }}>Próximos eventos</h4>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                
                {/* Mostrar mensaje si no hay eventos */}
                <div className="container p-2" style={{ color: 'white' }}>
                  {selectedEvents.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'white' }}>No hay nuevos eventos próximamente.</p>
                  ) : (
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
                                  Fecha del evento: {new Date(event.Fecha).toLocaleDateString()}
                                </h6>
                              </div>
                              <div className="row">
                                <div className='d-flex justify-content-start'>
                                  <a href={event.Link} target="_blank" rel="noopener noreferrer" style={{ color: '#EFCA45', fontSize: '12px' }}>
                                    {event.Link}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Botones de paginación */}
                  <div className="row my-5">
                    <PaginationButtons
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      isPreviousDisabled={currentPage === 0 || selectedEvents.length === 0}
                      isNextDisabled={startIndex + itemsPerPage >= events.length || selectedEvents.length === 0}
                    />
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
