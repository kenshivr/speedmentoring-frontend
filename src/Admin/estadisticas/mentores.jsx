import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; // Importa html2canvas
import logo from '../../assets/logo.png'; // Asegúrate de tener un logo en la ruta correcta

import ButtonExport from '../../components/Button/ButtonExport.jsx';
import GraphPie from '../../components/stats/GraphPie.jsx';
import GraphBar from '../../components/stats/GraphBar.jsx';

export default function StatisticsPage() {
  const [mentors, setMentors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  // Referencias para los gráficos
  const pieChartRef = useRef();
  const barChartRef1 = useRef();
  const barChartRef2 = useRef();
  const barChartRef3 = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const mentorsResponse = await axios.get(`${apiUrl}/api/mentors`);
        const specialtiesResponse = await axios.get(`${apiUrl}/api/getSpecialties`);
        
        setMentors(mentorsResponse.data);
        setSpecialties(specialtiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const totalMentors = mentors.length;
  
  const specialtyDistribution = mentors.reduce((acc, mentor) => {
    const specialty = specialties.find(s => s.EspecialidadID === mentor.EspecialidadID)?.Especialidad || 'No Asignada';
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});

  const companyDistribution = mentors.reduce((acc, mentor) => {
    acc[mentor.Empresa] = (acc[mentor.Empresa] || 0) + 1;
    return acc;
  }, {});

  const positionDistribution = mentors.reduce((acc, mentor) => {
    acc[mentor.Puesto] = (acc[mentor.Puesto] || 0) + 1;
    return acc;
  }, {});

  const statusCount = mentors.reduce(
    (acc, mentor) => {
      mentor.Estatus === 'Activo' ? acc.active++ : acc.inactive++;
      return acc;
    },
    { active: 0, inactive: 0 }
  );
  
  const getMaxKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b), '');
  const getMinKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] < obj[b] ? a : b), '');

  const specialtyWithMostMentors = getMaxKey(specialtyDistribution);
  const specialtyWithLeastMentors = getMinKey(specialtyDistribution);
  const companyWithMostMentors = getMaxKey(companyDistribution);
  const companyWithLeastMentors = getMinKey(companyDistribution);
  const positionWithMostMentors = getMaxKey(positionDistribution);

  const totalCompanies = Object.keys(companyDistribution).length;
  const totalSpecialties = Object.keys(specialtyDistribution).length;
  const avgMentorsPerCompany = totalCompanies ? (totalMentors / totalCompanies).toFixed(2) : 0;
  const avgMentorsPerSpecialty = totalSpecialties ? (totalMentors / totalSpecialties).toFixed(2) : 0;

  const companiesWithOneMentor = Object.values(companyDistribution).filter(count => count === 1).length;
  const specialtiesWithOneMentor = Object.values(specialtyDistribution).filter(count => count === 1).length;

  const mentorCounts = Object.values(companyDistribution);
  const medianMentorsPerCompany = () => {
    const sorted = [...mentorCounts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  const modeMentorsPerCompany = () => {
    const freq = {};
    let max = 0, mode = null;
    mentorCounts.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > max) {
        max = freq[n];
        mode = n;
      }
    });
    return mode;
  };

  const stdDevMentorsPerCompany = () => {
    const mean = avgMentorsPerCompany;
    const variance = mentorCounts.reduce((acc, count) => acc + Math.pow(count - mean, 2), 0) / mentorCounts.length;
    return Math.sqrt(variance).toFixed(2);
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
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);

    // Título y subtítulo
    doc.setFontSize(18);
    doc.text("Informe de Estadísticas de Mentores", pageWidth / 2, 40, { align: 'center' });
    doc.setFontSize(14);
    doc.text("Resumen de datos y gráficos", pageWidth / 2, 50, { align: 'center' });

    // Fecha de creación
    const creationDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha de creación: ${creationDate}`, pageWidth - 20, 20, { align: 'right' });

    // Contenido
    let yOffset = 70;
    doc.setFontSize(12);
    doc.text(`Total de Mentores: ${totalMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con más mentores: ${specialtyWithMostMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con menos mentores: ${specialtyWithLeastMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Empresa con más mentores: ${companyWithMostMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Empresa con menos mentores: ${companyWithLeastMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Puesto con más mentores: ${positionWithMostMentors}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de mentores por empresa: ${avgMentorsPerCompany}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de mentores por especialidad: ${avgMentorsPerSpecialty}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Mediana de mentores por empresa: ${medianMentorsPerCompany()}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Moda de mentores por empresa: ${modeMentorsPerCompany()}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Empresas con solo un mentor: ${companiesWithOneMentor}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidades con solo un mentor: ${specialtiesWithOneMentor}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Desviación estándar de mentores por empresa: ${stdDevMentorsPerCompany()}`, 20, yOffset);
    yOffset += 10;

    // Agregar gráficos al PDF
    const sections = [
      await addSectionToPDF(pieChartRef, 'Distribución de Especialidades'),
      await addSectionToPDF(barChartRef1, 'Distribución de Empresas'),
      await addSectionToPDF(barChartRef2, 'Distribución de Puestos'),
      await addSectionToPDF(barChartRef3, 'Distribución de Estatus'),
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

    doc.save("Estadisticas_Mentores.pdf");
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', borderRadius: '10px', maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Estadísticas de mentores</h2>

      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Total de mentores: {totalMentors}</li>
          <li className="list-group-item">Especialidad con más mentores: {specialtyWithMostMentors}</li>
          <li className="list-group-item">Especialidad con menos mentores: {specialtyWithLeastMentors}</li>
          <li className="list-group-item">Empresa con más mentores: {companyWithMostMentors}</li>
          <li className="list-group-item">Empresa con menos mentores: {companyWithLeastMentors}</li>
          <li className="list-group-item">Puesto con más mentores: {positionWithMostMentors}</li>
          <li className="list-group-item">Promedio de mentores por empresa: {avgMentorsPerCompany}</li>
          <li className="list-group-item">Promedio de mentores por especialidad: {avgMentorsPerSpecialty}</li>
          <li className="list-group-item">Mediana de mentores por empresa: {medianMentorsPerCompany()}</li>
          <li className="list-group-item">Moda de mentores por empresa: {modeMentorsPerCompany()}</li>
          <li className="list-group-item">Empresas con solo un mentor: {companiesWithOneMentor}</li>
          <li className="list-group-item">Especialidades con solo un mentor: {specialtiesWithOneMentor}</li>
          <li className="list-group-item">Desviación estándar de mentores por empresa: {stdDevMentorsPerCompany()}</li>
        </ul>
      </div>

      <div className="my-4" ref={pieChartRef}>
        <GraphPie 
          title='Distribución de Especialidades' 
          keys={ Object.keys(specialtyDistribution) } 
          values={ Object.values(specialtyDistribution) } 
        />
      </div>

      <div className="mb-4" ref={barChartRef1}>
        <GraphBar 
          title='Distribución de Empresas'
          keys={ Object.keys(companyDistribution) } 
          title_label='Cantidad' 
          values={ Object.values(companyDistribution) } 
        />
      </div>

      <div className="mb-4" ref={barChartRef2}>
        <GraphBar 
          title='Distribución de Puestos'
          keys={ Object.keys(positionDistribution) } 
          title_label='Cantidad' 
          values={ Object.values(positionDistribution) } 
        />
      </div>
      
      <div className="mb-4" ref={barChartRef3}>
        <GraphBar 
          title='Distribución de Estatus'
          keys={ ['Activos', 'Inactivos'] } 
          title_label='Cantidad' 
          values={ [statusCount.active, statusCount.inactive] } 
        />
      </div>
      
      <div className="pt-3 pb-4 d-grid justify-content-center">
          <ButtonExport text="Exportar a PDF" action={exportToPDF} />
      </div>
    </div>
  );
}