import React from 'react';

// Componente para la página no encontrada
export default function NotFound(){
    return(
        <div className="text-center pt-5">
          <h1 className='fw-bold mb-3 pt-5' style={{ color: '#EFCA45', fontSize: '15vw' }}>¡Oops!</h1>
          <h2 style={{ color: '#4F3F05' }}>404 - Página no encontrada</h2>
          <p style={{ color: '#4F3F05' }}>La página que estás buscando no existe.</p>
          <div className='container pt-5'>
            <a
              type="button"
              className="btn w-75"
              href='/'
              style={{ 
                backgroundColor: '#002B7A', 
                color: 'white', 
                border: '1px solid #000',
                borderRadius:'20px',
                maxWidth:'250px',
                transition: 'background-color 0.3s, color 0.3s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#002B7A';
                e.currentTarget.style.color = '#white';
              }}
              >
              Ir a la página principal
            </a>
          </div>
        </div>
    );
};
