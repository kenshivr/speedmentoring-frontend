import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ManageSpecialties() {
  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '5px', maxWidth: '1250px', margin: 'auto' }}>
      <legend className='ms-4' style={{ color: 'white' }}>Estadísticas</legend>
      <div className="container p-3">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de Mentores</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con los mentores.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/mentores"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de Estudiantes</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con los estudiantes.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/estudiantes"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de Sesiones de Mentoría</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con las sesiones de mentoría.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/sesiones"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de Reportes</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con los reportes.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/reportes"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Feedback de Mentores</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con el feedback de los mentores.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/feedbackMentores"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Feedback de Alumnos</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con el feedback de los alumnos.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/feedbackEstudiantes"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de Especialidades</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con las especialidades.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/especialidades"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
              <div className="card-body">
                <h5 className="card-title">Estadísticas de eventos</h5>
                <p className="card-text">Consulta los datos y gráficos relacionados con los eventos.</p>
                <Link
                  className="btn btn-dark"
                  to="/Admin/estadisticas/eventos"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
