import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PaginationButtons from '../components/Button/PaginationButtons.jsx'; 
import DropButton2 from '../components/Button/DropButton2.jsx'; 
import SearchBar from '../components/Search/SearchBar.jsx'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Page() {
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Mostrar registros por página

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEventsFull');
        if (response.data) {
          const sortedEventos = response.data.sort((a, b) => b.EventoID - a.EventoID);
          setEventos(sortedEventos);
        } else {
          console.error('Error al obtener eventos:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const getEventsFull = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getEventsFull');
      if (response.data) {
        const sortedEventos = response.data.sort((a, b) => b.EventoID - a.EventoID);
        setEventos(sortedEventos);
      } else {
        console.error('Error al obtener eventos:', response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud para obtener eventos:', error);
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (eventoID) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/deleteEvent/${eventoID}`);
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Ocurrio un error en la eliminacion del evento');
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }

    getEventsFull();
  };

  const handleEventEdit = (id) => {
    localStorage.setItem('eventId', id);
  }

  // Filtrar eventos basado en el término de búsqueda
  const filteredEventos = eventos.filter(evento => {
    const formattedDate = new Date(evento.Fecha).toLocaleDateString();
    const searchTermLower = searchTerm.toLowerCase();

    return (
      evento.Nombre.toLowerCase().includes(searchTermLower) ||
      evento.Descripción.toLowerCase().includes(searchTermLower) ||
      evento.Especialidad?.toLowerCase().includes(searchTermLower) || 
      evento.EventoID.toString().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  // Obtener los eventos correspondientes a la página actual
  const startIndex = currentPage * itemsPerPage;
  const selectedEventos = filteredEventos.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredEventos.length / itemsPerPage)));
  };

  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1000px', margin: 'auto', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="container p-3">
        <SearchBar
        legendText= 'Eventos'
        searchPlaceholder= 'Buscar evento'
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        buttonLink= '/Admin/eventos/crearEvento'
        />
        <div className="table-responsive p-2 justify-content-center align-items-center text-center">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha</th>
                <th scope="col">Descripción</th>
                <th scope="col">Link</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-light">
              {selectedEventos.map((evento) => (
                <tr key={evento.EventoID}>
                  <td>{evento.EventoID}</td>
                  <td>{evento.Nombre}</td>
                  <td>{new Date(evento.Fecha).toLocaleDateString()}</td>
                  <td>{evento.Descripción}</td>
                  <td>
                    {evento.Link && evento.Link.trim() ? (
                      <a
                        href={evento.Link.startsWith('http') ? evento.Link : `http://${evento.Link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {evento.Link}
                      </a>
                    ) : (
                      <span>Sin link</span>
                    )}
                  </td>
                  <td>
                    <DropButton2
                      text1 ='Editar'
                      link1='/Admin/eventos/editarEvento'
                      dropOnClick1= {() => handleEventEdit(evento.EventoID)}
                      text2 ='Eliminar'
                      dropOnClick2={() => handleDelete(evento.EventoID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationButtons
            onPrevious = {handlePrevious}
            onNext = {handleNext}
            isPreviousDisabled = {currentPage === 0}
            isNextDisabled = {startIndex + itemsPerPage >= filteredEventos.length}
          />
        </div>
      </div>
    </div>
  );
}
