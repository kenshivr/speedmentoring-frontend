import React, { useState } from 'react';
import axios from 'axios';
import ButtonPrrincipal from '../../components/Button/ButtonPrincipalC.jsx';
import LinkSecundary from '../../components/Link/LinkSecundaryCentered.jsx';

export default function BuscarCuentaPage() {
  const [id, setId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/buscar`, { id });
      //const response = await axios.post('http://localhost:3001/api/buscar', { id });

      if (response.data.success) {
        alert('Se ha enviado un correo con la nueva contraseña.');
      } else {
        console.log('No existe el correo en la base de datos');
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Error al buscar el correo:', error);
    }
  };

  return (
    <div className="container-sm my-5 pt-5" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '25px', maxWidth: '450px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="row align-items-center my-5 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" height="150px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">
          <path d="M228-266q60-38 121.05-57 61.04-19 131-19 69.95 0 132.45 20Q675-302 734-266q41-54 58.5-104.46Q810-420.91 810-480q0-140.25-94.83-235.12-94.82-94.88-235-94.88Q340-810 245-715.12 150-620.25 150-480q0 60 17.53 109.72Q185.05-320.57 228-266Zm251.85-180q-59.01 0-99.43-40.65-40.42-40.64-40.42-99Q340-644 380.57-685q40.56-41 99.58-41 59.01 0 99.43 41.15Q620-643.71 620-585.35q0 58.35-40.57 98.85-40.56 40.5-99.58 40.5Zm-.42 387q-85.98 0-162.89-32.76-76.91-32.75-134.82-91.05T91.4-316.78Q59-392.46 59-480.39q0-86.93 33.21-163.4 33.21-76.46 90.97-134.07 57.75-57.61 133.53-90.88Q392.49-902 480.5-902q87.01 0 163.26 33.74 76.25 33.74 133.54 91.08 57.28 57.34 90.99 133.75Q902-567.03 902-480.27q0 87.93-33.26 163.63-33.27 75.71-90.95 133.46-57.68 57.76-134.35 90.97Q566.77-59 479.43-59Z"/>
        </svg>
        <div className="container pt-3">
          <div className="alert alert-info m-4" role="alert" style={{ boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            Para recuperar su contraseña, ingresa tu RFC si eres un mentor o tu número de cuenta si eres un estudiante...
          </div>
          <div className="col d-flex align-items-center justify-content-center pt-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="emailInput" className="form-label text-white responsive-text">Usuario</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="emailInput" 
                  value={id} 
                  onChange={(e) => setId(e.target.value)} 
                />
              </div>
              <div className='pt-3'>
                <ButtonPrrincipal 
                  text='Buscar'
                />
              </div>
              <div className='pb-4 mt-4'>
                <LinkSecundary
                  text='Cancelar'
                  link='/login'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
