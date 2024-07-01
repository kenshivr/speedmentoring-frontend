import React from 'react';
import Layout from '../../Components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="student">
      <div> 
        <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto' }}>
          <div className="container">
            <div className="container text-center">
              <div className="row align-items-start p-4">
                <div className="col">
                </div>
                <div className="col" style={{ borderBottom: "2px solid white" }}>
                  <h3 style={{ color: "white" }}>Eventos recientes</h3>
                </div>
                <div className="col">
                </div>
              </div>
            </div>
            <div className="container p-2"  style={{ color: 'white'}}>
              <div className="row my-5">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h5>Taller de geometría avanzada</h5>
                    </div>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px' }}>
                      A la comunidad MAC se le invita al taller de ...
                    </h6>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                      Fecha de publicación: 13 de Febrero de 2024 a las 08:42
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row my-5">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h5>Taller de geometría avanzada</h5>
                    </div>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px' }}>
                      A la comunidad MAC se le invita al taller de ...
                    </h6>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                      Fecha de publicación: 13 de Febrero de 2024 a las 08:42
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row my-5">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h5>Taller de geometría avanzada</h5>
                    </div>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px' }}>
                      A la comunidad MAC se le invita al taller de ...
                    </h6>
                  </div>
                  <div className="row">
                    <h6 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                      Fecha de publicación: 13 de Febrero de 2024 a las 08:42
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row my-5">
                <div className="row">
                  <div className="col">
                  </div>
                  <div className="col" style={{ backgroundColor: '#EFCA45', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="row">
                      <div className='col'>
                        <a href="#" className="btn btn-link" style={{ color: "#3A2E01", fontSize: '14px' }}>Anterior</a>
                      </div>
                      <div className='col'>
                        <a href="#" className="btn btn-link" style={{ color: "#3A2E01", fontSize: '14px' }}>Siguiente</a>
                      </div>
                    </div>
                    <div className='row'>
                      <h6 style={{ color: '#231B00', fontSize: '12px', fontWeight: 'bold' }}>Página 1 de 5</h6>
                    </div>
                  </div>
                  <div className="col">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}