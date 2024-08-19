import React from 'react';
import { Link } from 'react-router-dom';

/* 
██████████████████████████████████████████████████████████████████████████████
Este botón/Link es centrado, su color es rojo. Para direccionar a otras paginas.

⚠️⚠️⚠️ Se debe poner la ruta se debe construir desde la raíz del sitio. Se puede hacer esto comenzando la ruta con una barra /.
██████████████████████████████████████████████████████████████████████████████
*/

function LinkAdd_Red({ link }) {
  return (
    <div>
        <Link
            className="btn btn-sm w-20 pt-2 pb-2 pt-2"
            to={link}
            style={{
              backgroundColor: '#db3345',
              borderRadius: '10px',
              transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
        </Link>
    </div>
  );
}

export default LinkAdd_Red;