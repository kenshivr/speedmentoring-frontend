import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import ButtonExport from '../../components/Button/ButtonExport.jsx';
import GraphPie from '../../components/stats/GraphPie.jsx';
import GraphBar from '../../components/stats/GraphBar.jsx';

export default function StatisticsPage() {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filtersActive, setFiltersActive] = useState(false); // Estado para controlar el switch
  const pieChartRef = useRef();
  const monthChartRef = useRef();
  const yearChartRef = useRef();
  const statusChartRef = useRef();
  const logoURL = "/images/logo-azul.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const eventsResponse = await axios.get(`${apiUrl}/api/getEventsFull`);
        setEvents(eventsResponse.data);
        setFilteredEvents(eventsResponse.data); // Inicialmente, todos los eventos están filtrados
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const filterEventsByDate = () => {
      if (filtersActive && startDate && endDate) {
        const filtered = events.filter(event => {
          const eventDate = new Date(event.Fecha).toISOString().split('T')[0];
          return eventDate >= startDate && eventDate <= endDate;
        });
        setFilteredEvents(filtered);
      } else {
        setFilteredEvents(events);
      }
    };

    filterEventsByDate();
  }, [startDate, endDate, events, filtersActive]);

  const totalEvents = filteredEvents.length;
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

  // 🔵 Contar eventos vencidos y agendados
  const pastEvents = filteredEvents.filter(event => event.Fecha < today).length;
  const futureEvents = filteredEvents.filter(event => event.Fecha >= today).length;

  // 📊 Agrupaciones de eventos por diferentes criterios
  const eventBySpecialty = filteredEvents.reduce((acc, event) => {
    const specialty = event.EspecialidadNombre || 'No Asignada';
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});

  const eventByMonth = filteredEvents.reduce((acc, event) => {
    const month = new Date(event.Fecha).toLocaleString('es-ES', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const eventByYear = filteredEvents.reduce((acc, event) => {
    const year = new Date(event.Fecha).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const getMaxKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b), '');
  const getMinKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] < obj[b] ? a : b), '');

  const mostFrequentSpecialty = getMaxKey(eventBySpecialty);
  const leastFrequentSpecialty = getMinKey(eventBySpecialty);
  const mostFrequentMonth = getMaxKey(eventByMonth);
  const leastFrequentMonth = getMinKey(eventByMonth);
  const mostFrequentYear = getMaxKey(eventByYear);
  const leastFrequentYear = getMinKey(eventByYear);

  const totalSpecialties = Object.keys(eventBySpecialty).length;
  const avgEventsPerSpecialty = totalSpecialties ? (totalEvents / totalSpecialties).toFixed(2) : 0;
  const avgEventsPerMonth = (totalEvents / 12).toFixed(2);
  const avgEventsPerYear = (totalEvents / Object.keys(eventByYear).length).toFixed(2);

  const singleEventSpecialties = Object.values(eventBySpecialty).filter(count => count === 1).length;
  const singleEventMonths = Object.values(eventByMonth).filter(count => count === 1).length;

  const eventCounts = Object.values(eventBySpecialty);
  const medianEventsPerSpecialty = () => {
    const sorted = [...eventCounts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const addSectionToPDF = async (ref, title) => {
    const canvas = await html2canvas(ref.current, {
      willReadFrequently: true, // Optimización recomendada
      scale: 2, // Mejora la resolución
      useCORS: true, // Evita problemas con imágenes externas
    });
    const imgData = canvas.toDataURL('image/png');
    return { imgData, title };
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Configuración de la fuente
    doc.setFont('Times', 'normal');
    doc.setFontSize(12);
  
    // Logo
    doc.addImage(logoURL, 'PNG', 10, 10, 50, 20);
  
    // Título y subtítulo
    doc.setFontSize(18);
    doc.text("Informe de Estadísticas de Eventos", pageWidth / 2, 40, { align: 'center' });
    doc.setFontSize(14);
    doc.text("Resumen de datos y gráficos", pageWidth / 2, 50, { align: 'center' });
  
    // Fecha de creación
    const creationDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha de creación: ${creationDate}`, pageWidth - 20, 20, { align: 'right' });
  
    // Filtro de fechas utilizado
    doc.setFontSize(12);
    doc.text(`Filtro de fechas aplicado:`, 20, 70);
    doc.text(`Fecha de inicio: ${startDate || 'No especificada'}`, 20, 80);
    doc.text(`Fecha de fin: ${endDate || 'No especificada'}`, 20, 90);
  
    // Contenido
    let yOffset = 100; // Ajustamos el offset para dejar espacio al filtro de fechas
    doc.setFontSize(12);
    doc.text(`Contenido:`, 20, yOffset);
    yOffset += 10;
    doc.text(`Total de Eventos: ${totalEvents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Eventos vencidos: ${pastEvents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Eventos Agendados: ${futureEvents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con más eventos: ${mostFrequentSpecialty}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con menos eventos: ${leastFrequentSpecialty}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Mes con más eventos: ${mostFrequentMonth}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Mes con menos eventos: ${leastFrequentMonth}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Año con más eventos: ${mostFrequentYear}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Año con menos eventos: ${leastFrequentYear}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de eventos por especialidad: ${avgEventsPerSpecialty}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de eventos por mes: ${avgEventsPerMonth}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de eventos por año: ${avgEventsPerYear}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidades con solo un evento: ${singleEventSpecialties}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Meses con solo un evento: ${singleEventMonths}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Mediana de eventos por especialidad: ${medianEventsPerSpecialty()}`, 20, yOffset);
    yOffset += 10;
  
    // Agregar gráficos al PDF
    const sections = [
      await addSectionToPDF(pieChartRef, 'Distribución de Eventos por Especialidad'),
      await addSectionToPDF(monthChartRef, 'Cantidad de Eventos por Mes'),
      await addSectionToPDF(yearChartRef, 'Cantidad de Eventos por Año'),
      await addSectionToPDF(statusChartRef, 'Eventos vencidos y agendados'),
    ];
  
    // Agregar gráficos de pastel en páginas separadas
    doc.addPage();
    doc.setFontSize(18);
    doc.text(sections[0].title, pageWidth / 2, 20, { align: 'center' });
    doc.addImage(sections[0].imgData, 'PNG', 20, 30, 160, 150);
  
    // Agregar gráficos de barras en pares (2 por página)
    for (let i = 1; i < sections.length; i += 2) {
      doc.addPage();
      doc.setFontSize(18);
  
      // Primer gráfico de barras
      doc.text(sections[i].title, pageWidth / 2, 20, { align: 'center' });
      doc.addImage(sections[i].imgData, 'PNG', 20, 30, 160, 80);
  
      // Segundo gráfico de barras (si existe)
      if (i + 1 < sections.length) {
        doc.text(sections[i + 1].title, pageWidth / 2, 120, { align: 'center' });
        doc.addImage(sections[i + 1].imgData, 'PNG', 20, 130, 160, 80);
      }
    }
  
    // Footer con número de página
    const addFooter = (pageNumber) => {
      doc.setFontSize(10);
      doc.text(`Página ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    };
  
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i);
    }
  
    doc.save("Estadisticas_Eventos.pdf");
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', borderRadius: '10px', maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Estadísticas de eventos</h2>

      <div className="mb-3 d-flex align-items-center">
        <legend style={{ color: 'white', marginRight: '10px' }}>Filtros:</legend>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="filterSwitch"
            checked={filtersActive}
            onChange={() => setFiltersActive(!filtersActive)}
          />
          <label className="form-check-label" htmlFor="filterSwitch" style={{ color: '#fff' }}>
            {filtersActive ? 'On' : 'Off'}
          </label>
        </div>
      </div>

      {filtersActive && (
        <>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label" style={{ color: '#fff' }}>Fecha de inicio:</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value || today)} // Evita que quede vacío
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label" style={{ color: '#fff' }}>Fecha de fin:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value || today)}
              required
            />
          </div>
        </>
      )}

      <legend style={{ color: 'white' }}>Contenido:</legend>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Total de eventos: {totalEvents}</li>
          <li className="list-group-item">Eventos vencidos: {pastEvents}</li>
          <li className="list-group-item">Eventos programados: {futureEvents}</li>
          <li className="list-group-item">Especialidad con más eventos: {mostFrequentSpecialty}</li>
          <li className="list-group-item">Especialidad con menos eventos: {leastFrequentSpecialty}</li>
          <li className="list-group-item">Mes con más eventos: {mostFrequentMonth}</li>
          <li className="list-group-item">Mes con menos eventos: {leastFrequentMonth}</li>
          <li className="list-group-item">Año con más eventos: {mostFrequentYear}</li>
          <li className="list-group-item">Año con menos eventos: {leastFrequentYear}</li>
          <li className="list-group-item">Promedio de eventos por especialidad: {avgEventsPerSpecialty}</li>
          <li className="list-group-item">Promedio de eventos por mes: {avgEventsPerMonth}</li>
          <li className="list-group-item">Promedio de eventos por año: {avgEventsPerYear}</li>
          <li className="list-group-item">Especialidades con solo un evento: {singleEventSpecialties}</li>
          <li className="list-group-item">Meses con solo un evento: {singleEventMonths}</li>
          <li className="list-group-item">Mediana de eventos por especialidad: {medianEventsPerSpecialty()}</li>
        </ul>
      </div>

      <div className="my-4" ref={pieChartRef}>
        <GraphPie 
          title='Distribución de Eventos por Especialidad' 
          keys={ Object.keys(eventBySpecialty) } 
          values={ Object.values(eventBySpecialty) } 
        />
      </div>      

      <div className="mb-4" ref={monthChartRef}>
        <GraphBar 
          title='Cantidad de Eventos por Mes'
          keys={ Object.keys(eventByMonth) } 
          title_label='Cantidad' 
          values={ Object.values(eventByMonth) } 
        />
      </div>

      <div className="mb-4" ref={yearChartRef}>
        <GraphBar 
          title='Cantidad de Eventos por Año'
          keys={ Object.keys(eventByYear) } 
          title_label='Cantidad' 
          values={ Object.values(eventByYear) } 
        />
      </div>

      <div className="mb-4" ref={statusChartRef}>
        <GraphBar 
          title='Eventos vencidos y agendados' 
          keys={['Vencidos', 'Agendados']} 
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