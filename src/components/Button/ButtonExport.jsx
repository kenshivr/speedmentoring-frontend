import React, { useState } from 'react';

function ButtonExport({ text, action }) {
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
      <button
        className="btn w-100"
        onClick={action}
        style={{
          backgroundColor: '#EFCA45',
          color: '#4F3F05',
          borderRadius: '20px',
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
      </button>
    </div>
  );
}

export default ButtonExport;
