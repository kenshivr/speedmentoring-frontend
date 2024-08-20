import React from 'react';

// Definición de props del componente Button
/* 
██████████████████████████████████████████████████████████████████████████████
Este botón es centrado, su color es el principal y tipo submit para formularios.
██████████████████████████████████████████████████████████████████████████████
*/

function ButtonPrincipalC({ text }) {
  return (
    <div>
      <button
        type="submit"
        className="btn w-100"
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
      </button>
    </div>
  );
}

export default ButtonPrincipalC;
