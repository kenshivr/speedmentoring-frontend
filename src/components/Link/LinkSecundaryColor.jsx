import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Definición de props del componente Button
/* 
██████████████████████████████████████████████████████████████████████████████
Este botón/Link es centrado, su color es el secundario. Para direccionar a otras paginas.

⚠️⚠️⚠️ Se debe poner la ruta se debe construir desde la raíz del sitio. Se puede hacer esto comenzando la ruta con una barra /.
██████████████████████████████████████████████████████████████████████████████
*/

function LinkSecundaryC({ text, link }) {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = (e) => {
    e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)'; // Sombra interna al presionar
    e.currentTarget.style.transform = 'scale(0.98)'; // Reducir el tamaño al presionar
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Restaurar sombra al soltar
    e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al soltar
  };

  const handleMouseLeave = (e) => {
    if (pressed) {
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Restaurar sombra al mover el cursor fuera mientras está presionado
      e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al mover el cursor fuera mientras está presionado
    } else {
      // Si no está presionado, aplicar sombra normal al alejar el cursor
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra normal
    }
  }; 

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)'; // Sombreado más oscuro al pasar el ratón
  }
  
  return (
    <div>
        <Link
            type="button"
            className="btn w-100 btn-dark"
            to={link}
            style={{ 
                color: '#fff',
                borderRadius: '10px',
                border: 'none', // Eliminar el borde
          transition: 'box-shadow 0.2s, transform 0.2s', // Transiciones para la sombra y el tamaño
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombreado inicial
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} // Manejar el cursor fuera del botón
        onMouseDown={handleMouseDown} // Manejar el botón presionado
        onMouseUp={handleMouseUp} // Manejar el botón soltado
            >
            {text}
        </Link>
    </div>
  );
}

export default LinkSecundaryC;