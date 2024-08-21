import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* 
██████████████████████████████████████████████████████████████████████████████
Este botón/Link es centrado, su color es el principal. Para direccionar a otras paginas.

⚠️⚠️⚠️ Se debe poner la ruta se debe construir desde la raíz del sitio. Se puede hacer esto comenzando la ruta con una barra /.
██████████████████████████████████████████████████████████████████████████████
*/

function LinkPrimaryC({ text, link }) {
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
            type="button"
            className="btn w-100"
            to={link}
            style={{
              backgroundColor: '#EFCA45',
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
            {text}
        </Link>
    </div>
  );
}

export default LinkPrimaryC;