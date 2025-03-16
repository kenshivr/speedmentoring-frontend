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

  const loadLogo = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = "/images/logo-azulBis.jpg"; // O usa logo si importaste la imagen
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  };
  

  const exportToPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const currentDate = new Date().toLocaleDateString();
    const logo = await loadLogo();
    if (logo) {
      pdf.addImage(logo, 'JPEG', pdfWidth - 40, 10, 30, 30);
    }


    const addHeader = (title) => {
      if (logo) {
        pdf.addImage(logo, 'JPEG', pdfWidth - 40, 10, 30, 30);
      } else {
        console.error("El logo no se cargó correctamente.");
      }
      pdf.setFontSize(18);
      pdf.text('Nombre de la Institución', 10, 20);
      pdf.setFontSize(14);
      pdf.text(title, 10, 30);
      pdf.line(10, 40, pdfWidth - 10, 40);
    };

    addHeader('Informe de Estadísticas');
    pdf.setFontSize(12);
    pdf.text(`Total de estudiantes: ${totalStudents}`, 10, 50);
    pdf.text(`Estudiantes activos: ${statusCount.active}`, 10, 60);
    pdf.text(`Estudiantes inactivos: ${statusCount.inactive}`, 10, 70);

    const addSectionToPDF = async (elementRef, title) => {
      if (elementRef.current) {
        pdf.addPage();
        addHeader(title);
        const canvas = await html2canvas(elementRef.current);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 50, 190, 0);
      }
    };

    await addSectionToPDF(pieChartRef, 'Distribución de Especialidades');
    await addSectionToPDF(periodChartRef, 'Distribución de Periodos');
    await addSectionToPDF(statusChartRef, 'Distribución de Estatus');

    pdf.setFontSize(10);
    pdf.text(`Fecha de generación: ${currentDate}`, 10, pdfHeight - 10);

    pdf.save('estadisticas.pdf');
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