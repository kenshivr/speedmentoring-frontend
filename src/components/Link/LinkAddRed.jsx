import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* 
██████████████████████████████████████████████████████████████████████████████
Este botón/Link es centrado, su color es rojo. Para direccionar a otras paginas.

⚠️⚠️⚠️ Se debe poner la ruta se debe construir desde la raíz del sitio. Se puede hacer esto comenzando la ruta con una barra /.
██████████████████████████████████████████████████████████████████████████████
*/


function LinkAddRed({ text, link }) {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = (e) => {
    setPressed(true);
    e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)'; // Sombra interna al presionar
    e.currentTarget.style.transform = 'scale(0.98)'; // Reducir el tamaño al presionar
  };

  const handleMouseUp = (e) => {
    setPressed(false);
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Restaurar sombra al soltar
    e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al soltar
  };

  const handleMouseLeave = (e) => {
    if (pressed) {
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Restaurar sombra al mover el cursor fuera mientras está presionado
      e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al mover el cursor fuera mientras está presionado
    }
  };  

  
  return (
    <div>
        <Link
            className="btn btn-sm w-20 pt-2 pb-2 pt-2"
            to={link}
            style={{
              backgroundColor: '#db3345',
              color: '#4F3F05',
              borderRadius: '20px',
              border: 'none', // Eliminar el borde
              transition: 'box-shadow 0.2s, transform 0.2s', // Transiciones para la sombra y el tamaño
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombreado inicial
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro al pasar el ratón
            }}
            onMouseLeave={handleMouseLeave} // Manejar el cursor fuera del botón
            onMouseDown={handleMouseDown} // Manejar el botón presionado
            onMouseUp={handleMouseUp} // Manejar el botón soltado
            >
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

export default LinkAddRed;