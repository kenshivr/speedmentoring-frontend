import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CardMenu from '../components/Card/CardMenu.jsx';

export default function ManageSpecialties() {
  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '5px', maxWidth: '1250px', margin: 'auto' }}>
      <h2 className="text-center mb-4 pt-3" style={{ color: '#fff' }}>Estadísticas</h2>
      <div className="container p-3">
        <div className="row g-4">
          <div className="col-md-4">
              <CardMenu 
                title='Estadísticas de Mentores' 
                text='Consulta los datos y gráficos relacionados con los mentores.' 
                button_text='Ver' 
                button_link='/Admin/estadisticas/mentores'
              />
          </div>

          <div className="col-md-4">
              <CardMenu 
                title='Estadísticas de Estudiantes' 
                text='Consulta los datos y gráficos relacionados con los estudiantes.' 
                button_text='Ver' 
                button_link='/Admin/estadisticas/estudiantes'
              />
          </div>

          <div className="col-md-4">
              <CardMenu 
                title='Estadísticas de eventos' 
                text='Consulta los datos y gráficos relacionados con los eventos.' 
                button_text='Ver' 
                button_link='/Admin/estadisticas/eventos'
              />
          </div>

        </div>
      </div>
    </div>
  );
}
