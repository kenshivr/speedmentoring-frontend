import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function EventStatisticsPage() {
  const [eventos, setEventos] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [specialtyWithMostEvents, setSpecialtyWithMostEvents] = useState(null);
  const [specialtyWithLessEvents, setSpecialtyWithLessEvents] = useState(null);
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEventsFull');
        if (response.data) {
          const sortedEventos = response.data.sort((a, b) => b.EventoID - a.EventoID);
          setEventos(sortedEventos);
          calculateStats(sortedEventos);
        } else {
          console.error('Error al obtener eventos:', response.data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener eventos:', error);
      }
    };

    const calculateStats = (eventos) => {
      // Total de eventos
      setTotalEvents(eventos.length);

      // Contar eventos por especialidad
      const eventsBySpecialty = eventos.reduce((acc, evento) => {
        const specialtyName = evento.EspecialidadNombre;
        if (!acc[specialtyName]) {
          acc[specialtyName] = 0;
        }
        acc[specialtyName]++;
        return acc;
      }, {});

      // Crear datos para el gráfico de pastel
      const labels = Object.keys(eventsBySpecialty);
      const data = Object.values(eventsBySpecialty);
      setPieData({
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#F25F5C', '#FF9F40', '#FF6F61'],
        }]
      });

      // Especialidad con más eventos
      const maxEventsSpecialtyName = Object.keys(eventsBySpecialty).reduce((a, b) => eventsBySpecialty[a] > eventsBySpecialty[b] ? a : b);
      setSpecialtyWithMostEvents({ 
        EspecialidadNombre: maxEventsSpecialtyName, 
        eventCount: eventsBySpecialty[maxEventsSpecialtyName] 
      });
    };

    fetchEventos();
  }, []);

  const generatePDF = async () => {
    const input = document.getElementById('report-content');
    const canvas = await html2canvas(input, { scale: 2 });

    const doc = new jsPDF('p', 'mm', 'a4');

    // Información
    doc.setFontSize(12);
    doc.text('Matemáticas Aplicadas y Computación - SpeedMentoring', 10, 10);
    doc.setFontSize(12);
    doc.text(`Reporte de eventos: ${new Date().toLocaleDateString()}`, 10, 20);

    doc.text(`Total de eventos: ${totalEvents}`, 10, 30)

    // Guardar el PDF
    doc.save('reporte-estadisticas.pdf');
  };

  return (
    <div className="container my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '900px', margin: 'auto' }}>
      <h1 className="text-center text-white mb-5">Estadísticas de eventos</h1>

      <div id="report-content">
        {/* Total de Eventos */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Total de Eventos</h5>
            <p className="card-text">{totalEvents}</p>
          </div>
        </div>

        {/* Especialidad con Más Eventos */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Especialidad con más eventos</h5>
            <p className="card-text">
              {specialtyWithMostEvents ? `${specialtyWithMostEvents.EspecialidadNombre} con ${specialtyWithMostEvents.eventCount} eventos` : 'Cargando...'}
            </p>
          </div>
        </div>

        {/* Especialidad con Menos Eventos */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Especialidad con menos eventos</h5>
            <p className="card-text">
              {specialtyWithLessEvents ? `${specialtyWithLessEvents.EspecialidadNombre} con ${specialtyWithLessEvents.eventCount} eventos` : 'Cargando...'}
            </p>
          </div>
        </div>

        {/* Gráfico de Pastel */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title text-center">Número de Eventos por Especialidad</h5>
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Botón para generar el PDF */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={generatePDF}>
          Generar Reporte en PDF
        </button>
      </div>
    </div>
  );
}
