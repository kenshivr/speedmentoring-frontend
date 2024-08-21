import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*
Boton para mostrar 3 opciones

*/

function DropButton3({ text1, link1, dropOnClick1, text2, dropOnClick2, text3, dropOnClick3 }) {
    const [pressed, setPressed] = useState(false);
    const [linkPressed, setLinkPressed] = useState(false); // Estado para el enlace de edición

    const handleMouseDown = (e) => {
      setPressed(true);
      e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)'; // Sombra interna al presionar
      e.currentTarget.style.transform = 'scale(0.98)'; // Reducir el tamaño al presionar
    };
  
    const handleMouseUp = (e) => {
      setPressed(false);
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)'; // Restaurar sombra al soltar
      e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al soltar
    };
  
    const handleMouseLeave = (e) => {
      if (pressed) {
        e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)'; // Restaurar sombra al mover el cursor fuera mientras está presionado
        e.currentTarget.style.transform = 'scale(1)'; // Restaurar tamaño al mover el cursor fuera mientras está presionado
      }
    };  
  
    const handleLinkMouseDown = (e) => {
      setLinkPressed(true);
      e.currentTarget.style.backgroundColor = '#EFEFEF'; // Cambiar color de fondo del enlace al presionar
    };
  
    const handleLinkMouseUp = (e) => {
      setLinkPressed(false);
      e.currentTarget.style.backgroundColor = 'white'; // Restaurar color de fondo del enlace al soltar
    };
  
    const handleLinkMouseLeave = (e) => {
      if (linkPressed) {
        e.currentTarget.style.backgroundColor = 'white'; // Restaurar color de fondo si se mueve el cursor fuera
        setLinkPressed(false);
      }
    };

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
            color: '#4F3F05',
            borderRadius: '20px',
            border: 'none', // Eliminar el borde
            transition: 'box-shadow 0.2s, transform 0.2s', // Transiciones para la sombra y el tamaño
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)', // Sombreado inicial
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)'; // Sombreado más oscuro al pasar el ratón
          }}
          onMouseLeave={handleMouseLeave} // Manejar el cursor fuera del botón
          onMouseDown={handleMouseDown} // Manejar el botón presionado
          onMouseUp={handleMouseUp} // Manejar el botón soltado
          
      />
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <Link
            className="dropdown-item"
            to={link1}
            onClick={dropOnClick1}
            style={{
              backgroundColor: linkPressed ? '#EFEFEF' : 'white', // Cambiar color de fondo del enlace al presionar
              color: '#4F3F05',
              transition: 'background-color 0.2s ease', // Transición suave
            }}
            onMouseDown={handleLinkMouseDown} // Manejar el enlace presionado
            onMouseUp={handleLinkMouseUp} // Manejar el enlace soltado
            onMouseLeave={handleLinkMouseLeave} // Manejar cuando el cursor sale del enlace
          >
            {text1}
          </Link>
        </li>
        <li>
          <button 
            className="dropdown-item" 
            onClick={dropOnClick2}
          >
            {text2}
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item" 
            onClick={dropOnClick3}
          >
            {text3}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DropButton3;
