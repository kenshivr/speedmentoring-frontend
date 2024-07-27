import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function EditSpecialty() {
  const { id } = useParams(); // Suponiendo que el ID de la especialidad se pasa como parámetro en la URL
  const [specialtyName, setSpecialtyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar la especialidad cuando el componente se monta
  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/specialties/${id}`);
        if (response.data) {
          setSpecialtyName(response.data.name);
        } else {
          setErrorMessage('No se pudo cargar la especialidad.');
        }
      } catch (error) {
        setErrorMessage('Error en la solicitud.');
        console.error('Error:', error);
      }
    };

    fetchSpecialty();
  }, [id]);

  const handleChange = (e) => {
    setSpecialtyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/updateSpecialty/${id}`, { name: specialtyName });
      if (response.data.success) {
        setSuccessMessage('Especialidad actualizada con éxito.');
      } else {
        setErrorMessage('Error al actualizar la especialidad.');
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5 p-3' style={{ maxWidth: '950px' }}>
      <div className='container-sm my-3 p-4' style={{ backgroundColor: '#002B7A', borderRadius: '50px', color: 'white' }}>
        <h1 className='text-center mb-5'>Editar Especialidad</h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <label htmlFor="specialtyName" className="form-label">Nombre de la Especialidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="specialtyName"
                  name="specialtyName"
                  placeholder="Nombre de la especialidad"
                  value={specialtyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
                  <button
                    type="submit"
                    className="btn btn-sm w-50 my-4 mx-3"
                    style={{ 
                      backgroundColor: '#EFCA45', 
                      color: '#4F3F05', 
                      border: '1px solid #000',
                      borderRadius:'20px',
                      transition: 'background-color 0.3s, color 0.3s' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFCA45';
                      e.currentTarget.style.color = '#4F3F05';
                    }}
                  >
                    Editar
                  </button>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center my-2">
                  <Link
                    type="button"
                    className="btn btn-sm w-50 mx-3"
                    to="/Admin/especialidades/page"
                    style={{ 
                      backgroundColor: '#EBE4CA', 
                      color: '#4F3F05', 
                      border: '1px solid #000',
                      borderRadius: '20px',
                      transition: 'background-color 0.3s, color 0.3s' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EBE4CA';
                      e.currentTarget.style.color = '#4F3F05';
                    }}
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
