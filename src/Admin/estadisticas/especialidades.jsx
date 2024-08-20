import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonPrrincipal from '../../components/Button/ButtonPrincipalC.jsx'; 


export default function ManageSpecialties() {
  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius: '5px', maxWidth: '1250px', margin: 'auto' }}>
      <h1 className="text-white">Estadísticas de especialidades</h1>
      
        <ButtonPrrincipal
          texto='Ingresar'
        />

    </div>
  );
}

