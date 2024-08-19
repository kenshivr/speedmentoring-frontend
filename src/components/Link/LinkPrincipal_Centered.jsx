import React from 'react';
import { Link } from 'react-router-dom';

/* 
██████████████████████████████████████████████████████████████████████████████
Este botón/Link es centrado, su color es el principal. Para direccionar a otras paginas.

⚠️⚠️⚠️ Se debe poner la ruta se debe construir desde la raíz del sitio. Se puede hacer esto comenzando la ruta con una barra /.
██████████████████████████████████████████████████████████████████████████████
*/

function LinkPrimaryC({ text, link }) {
  return (
    <div>
        <Link
            type="button"
            className="btn w-100"
            to={link}
            style={{
                backgroundColor: '#EFCA45',
                color: '#4F3F05',
                borderRadius: '20px',
                transition: 'box-shadow 0.3s' // Se enfoca en el sombreado
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombreado más ligero
            }}>
            {text}
        </Link>
    </div>
  );
}

export default LinkPrimaryC;