import React from 'react';

// Definición de props del componente Card
function Card({ imagen, texto, textoboton, titulo }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imagen} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{texto}</p>
        <a href="#" className="btn btn-primary">{textoboton}</a>
      </div>
    </div>
  );
}

export default Card;