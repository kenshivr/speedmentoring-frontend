import React, { useState, useEffect } from 'react';

export default function ManageSpecialties() {
  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '5px', maxWidth: '1000px', margin: 'auto' }}>
      <legend className='ms-4' style={{ color: 'white' }}>Estadísticas de mentores</legend>
      <div className="container p-3" style={{ backgroundColor:'purple', color: 'white' }}>
        Una gráfica de pastel
      </div>
    </div>
  );
}
