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
  const [students, setStudents] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const reportRef = useRef();
  const pieChartRef = useRef();
  const periodChartRef = useRef();
  const statusChartRef = useRef();
  const logoURL = "/images/logo-azul.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const studentsResponse = await axios.get(`${apiUrl}/api/students`);
        const specialtiesResponse = await axios.get(`${apiUrl}/api/getSpecialties`);
        
        setStudents(studentsResponse.data);
        setSpecialties(specialtiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const totalStudents = students.length;
  
  const periodDistribution = students.reduce((acc, student) => {
    acc[student.Periodo] = (acc[student.Periodo] || 0) + 1;
    return acc;
  }, {});

  const statusCount = students.reduce(
    (acc, student) => {
      student.Estatus === 'Activo' ? acc.active++ : acc.inactive++;
      return acc;
    },
    { active: 0, inactive: 0 }
  );

  const specialtyDistribution = students.reduce((acc, student) => {
    const specialty = specialties.find(s => s.EspecialidadID === student.EspecialidadID)?.Especialidad || 'No Asignada';
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});

  const getMaxKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b), '');
  const getMinKey = (obj) => Object.keys(obj).reduce((a, b) => (obj[a] < obj[b] ? a : b), '');

  const specialtyWithMostStudents = getMaxKey(specialtyDistribution);
  const specialtyWithLeastStudents = getMinKey(specialtyDistribution);
  const periodWithMostStudents = getMaxKey(periodDistribution);
  const periodWithLeastStudents = getMinKey(periodDistribution);

  const totalSpecialties = Object.keys(specialtyDistribution).length;
  const totalPeriods = Object.keys(periodDistribution).length;
  const avgStudentsPerSpecialty = totalSpecialties ? (totalStudents / totalSpecialties).toFixed(2) : 0;
  const avgStudentsPerPeriod = totalPeriods ? (totalStudents / totalPeriods).toFixed(2) : 0;

  const specialtiesWithOneStudent = Object.values(specialtyDistribution).filter(count => count === 1).length;

  const studentCounts = Object.values(specialtyDistribution);
  const medianStudentsPerSpecialty = () => {
    const sorted = [...studentCounts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  const modeStudentsPerSpecialty = () => {
    const freq = {};
    let max = 0, mode = null;
    studentCounts.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > max) {
        max = freq[n];
        mode = n;
      }
    });
    return mode;
  };

  const stdDevStudentsPerSpecialty = () => {
    const mean = avgStudentsPerSpecialty;
    const variance = studentCounts.reduce((acc, count) => acc + Math.pow(count - mean, 2), 0) / studentCounts.length;
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
    doc.addImage(logoURL, 'PNG', 10, 10, 50, 20);

    // Título y subtítulo
    doc.setFontSize(18);
    doc.text("Informe de Estadísticas de Estudiantes", pageWidth / 2, 40, { align: 'center' });
    doc.setFontSize(14);
    doc.text("Resumen de datos y gráficos", pageWidth / 2, 50, { align: 'center' });

    // Fecha de creación
    const creationDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha de creación: ${creationDate}`, pageWidth - 20, 20, { align: 'right' });

    // Contenido
    let yOffset = 70;
    doc.setFontSize(12);
    doc.text(`Total de Estudiantes: ${totalStudents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Estudiantes Activos: ${statusCount.active}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Estudiantes Inactivos: ${statusCount.inactive}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con más estudiantes: ${specialtyWithMostStudents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidad con menos estudiantes: ${specialtyWithLeastStudents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Período con más estudiantes: ${periodWithMostStudents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Período con menos estudiantes: ${periodWithLeastStudents}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de estudiantes por especialidad: ${avgStudentsPerSpecialty}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Promedio de estudiantes por período: ${avgStudentsPerPeriod}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Mediana de estudiantes por especialidad: ${medianStudentsPerSpecialty()}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Moda de estudiantes por especialidad: ${modeStudentsPerSpecialty()}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Especialidades con solo un estudiante: ${specialtiesWithOneStudent}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Desviación estándar de estudiantes por especialidad: ${stdDevStudentsPerSpecialty()}`, 20, yOffset);
    yOffset += 10;

    // Agregar gráficos al PDF
    const sections = [
      await addSectionToPDF(pieChartRef, 'Distribución de Especialidades'),
      await addSectionToPDF(periodChartRef, 'Distribución de Periodos'),
      await addSectionToPDF(statusChartRef, 'Distribución de Estatus'),
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

    doc.save("Estadisticas_Estudiantes.pdf");
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', borderRadius: '10px', maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <div ref={reportRef}>
        <h2 className="text-left mb-4" style={{ color: '#fff' }}>Estadísticas de estudiantes</h2>
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Total de estudiantes: {totalStudents}</li>
            <li className="list-group-item">Estudiantes activos: {statusCount.active}</li>
            <li className="list-group-item">Estudiantes inactivos: {statusCount.inactive}</li>
            <li className="list-group-item">Especialidad con más estudiantes: {specialtyWithMostStudents}</li>
            <li className="list-group-item">Especialidad con menos estudiantes: {specialtyWithLeastStudents}</li>
            <li className="list-group-item">Período con más estudiantes: {periodWithMostStudents}</li>
            <li className="list-group-item">Período con menos estudiantes: {periodWithLeastStudents}</li>
            <li className="list-group-item">Promedio de estudiantes por especialidad: {avgStudentsPerSpecialty}</li>
            <li className="list-group-item">Promedio de estudiantes por período: {avgStudentsPerPeriod}</li>
            <li className="list-group-item">Mediana de estudiantes por especialidad: {medianStudentsPerSpecialty()}</li>
            <li className="list-group-item">Moda de estudiantes por especialidad: {modeStudentsPerSpecialty()}</li>
            <li className="list-group-item">Especialidades con solo un estudiante: {specialtiesWithOneStudent}</li>
            <li className="list-group-item">Desviación estándar de estudiantes por especialidad: {stdDevStudentsPerSpecialty()}</li>
          </ul>
        </div>
        <div className="my-4" ref={pieChartRef}>
          <GraphPie 
            title='Distribución de Especialidades' 
            keys={ Object.keys(specialtyDistribution) } 
            values={ Object.values(specialtyDistribution) } 
          />
        </div>
        <div className="mb-4" ref={periodChartRef}>
          <GraphBar 
            title='Distribución de Periodos'
            keys={ Object.keys(periodDistribution) } 
            title_label='Cantidad' 
            values={ Object.values(periodDistribution) } 
          />
        </div>
        <div className="mb-4" ref={statusChartRef}>
          <GraphBar 
            title='Distribución de Estatus'
            keys={ ['Activos', 'Inactivos'] } 
            title_label='Cantidad' 
            values={ [statusCount.active, statusCount.inactive] } 
          />
        </div>
      </div>
      <div className="pt-3 pb-4 d-grid justify-content-center">
        <ButtonExport text="Exportar a PDF" action={exportToPDF} />
      </div>
    </div>
  );
}