import React from 'react';

export default function Footer() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '50vh' }}>

      <div style={{ flex: 1 }}></div>

      <footer className="bg-body-tertiary bg-info text-center text-lg-start mt-auto" style={{ maxHeight: '100%', zIndex: '1', marginTop: 'calc(50px + 1vh)', marginBottom: 'auto' }}>
        <div className="text-center p-3" style={{ background: "#002B7A" }}>
          
          <div className="container">
            <div className="container my-3">
              <h6 style={{ color: 'white', fontSize: '13px' }}>
                Hecho en México, todos los derechos reservados 2024. Esta página puede ser reproducida con fines no lucrativos, siempre y cuando no se mutile, se cite la fuente completa y su dirección electrónica. De otra forma, requiere permiso previo por escrito de la institución.
              </h6>
            </div>

            <h6 style={{ color: 'white', fontSize: '13px' }}>
              Sitio web administrado por: Programa de Matemáticas Aplicadas y Computación. mac@acatlan.unam.mx
            </h6>
          </div>

        </div>
      </footer>

    </div>
  );
}