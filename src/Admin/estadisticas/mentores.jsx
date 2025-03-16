import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

import ButtonExport from '../../components/Button/ButtonExport.jsx';

import GraphPie from '../../components/stats/GraphPie.jsx';
import GraphBar from '../../components/stats/GraphBar.jsx';

export default function StatisticsPage() {
  const [mentors, setMentors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Informe de Estadísticas de Mentores", 10, 10);
    doc.text(`Total de Mentores: ${totalMentors}`, 10, 20);
    doc.text(`Distribución de Especialidades:`, 10, 30);
    let yOffset = 40;
    Object.entries(specialtyDistribution).forEach(([specialty, count]) => {
      doc.text(`${specialty}: ${count}`, 10, yOffset);
      yOffset += 10;
    });
    doc.save("Estadisticas_Mentores.pdf");
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: '#002B7A', borderRadius: '10px', maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Estadísticas de mentores</h2>

      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Total de mentores: {totalMentors}</li>
        </ul>
      </div>

      <div className="my-4">
        <GraphPie 
          title='Distribución de Especialidades' 
          keys={ Object.keys(specialtyDistribution) } 
          values={ Object.values(specialtyDistribution) } 
        />
      </div>

      <div className="mb-4">
        <GraphBar 
          title='Distribución de Empresas'
          keys={ Object.keys(companyDistribution) } 
          title_label='Cantidad' 
          values={ Object.values(companyDistribution) } 
        />
      </div>

      <div className="mb-4">
        <GraphBar 
          title='Distribución de Puestos'
          keys={ Object.keys(positionDistribution) } 
          title_label='Cantidad' 
          values={ Object.values(positionDistribution) } 
        />
      </div>
      
      <div className="mb-4">
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
