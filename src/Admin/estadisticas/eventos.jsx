import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

import ButtonExport from '../../components/Button/ButtonExport.jsx';
import GraphPie from '../../components/stats/GraphPie.jsx';
import GraphBar from '../../components/stats/GraphBar.jsx';

export default function StatisticsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const eventsResponse = await axios.get(`${apiUrl}/api/getEventsFull`);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const totalEvents = events.length;
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

  // 🔵 Contar eventos pasados y futuros
  const pastEvents = events.filter(event => event.Fecha < today).length;
  const futureEvents = events.filter(event => event.Fecha >= today).length;

  // 📊 Agrupaciones de eventos por diferentes criterios
  const eventBySpecialty = events.reduce((acc, event) => {
    const specialty = event.EspecialidadNombre || 'No Asignada';
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});

  const eventByMonth = events.reduce((acc, event) => {
    const month = new Date(event.Fecha).toLocaleString('es-ES', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const eventByYear = events.reduce((acc, event) => {
    const year = new Date(event.Fecha).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Informe de Estadísticas de Eventos", 10, 10);
    doc.text(`Total de Eventos: ${totalEvents}`, 10, 20);
    doc.text(`Eventos Pasados: ${pastEvents}`, 10, 30);
    doc.text(`Eventos Futuros: ${futureEvents}`, 10, 40);
    doc.text(`Distribución de Eventos por Especialidad:`, 10, 50);
    let yOffset = 60;
    Object.entries(eventBySpecialty).forEach(([specialty, count]) => {
      doc.text(`${specialty}: ${count}`, 10, yOffset);
      yOffset += 10;
    });
    doc.save("Estadisticas_Eventos.pdf");
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', borderRadius: '10px', maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Estadísticas de eventos</h2>

      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Total de eventos: {totalEvents}</li>
          <li className="list-group-item">Eventos vencidos: {pastEvents}</li>
          <li className="list-group-item">Eventos programados: {futureEvents}</li>
        </ul>
      </div>

      <div className="my-4">
        <GraphPie 
          title='Distribución de Eventos por Especialidad' 
          keys={ Object.keys(eventBySpecialty) } 
          values={ Object.values(eventBySpecialty) } 
        />
      </div>      

      <div className="mb-4">
        <GraphBar 
          title='Cantidad de Eventos por Mes'
          keys={ Object.keys(eventByMonth) } 
          title_label='Cantidad' 
          values={ Object.values(eventByMonth) } 
        />
      </div>

      <div className="mb-4">
        <GraphBar 
          title='Cantidad de Eventos por Año'
          keys={ Object.keys(eventByYear) } 
          title_label='Cantidad' 
          values={ Object.values(eventByYear) } 
        />
      </div>

      <div className="mb-4">
        <GraphBar 
          title='Eventos Pasados vs. Futuros' 
          keys={['Pasados', 'Futuros']} 
          title_label='Cantidad' 
          values={[pastEvents, futureEvents]} 
        />
      </div>
      
      <div className="pt-3 pb-4 d-grid justify-content-center">
          <ButtonExport text="Exportar a PDF" action={exportToPDF} />
      </div>
    </div>
  );
}
