import React from 'react';

const Page = () => {
  return (
    <div className="container-sm my-1 mt-5 p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-5 m-1 d-flex flex-column p-3">
          <div className='mb-3'>
          <div> 
          <div className="container-sm my-5" style={{ backgroundColor: '#002B7A', borderRadius: '25px', maxWidth: '1000px', margin: 'auto' }}>
            <div className="container">
              <div className="container text-center">
                <div className="row align-items-start p-4">
                  <div className="col">
                  </div>
                  <div className="col" style={{ borderBottom: "2px solid white" }}>
                    <h4 style={{ color: "white" }}>Eventos recientes</h4>
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
                    <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <a
                        type="button"
                        className="btn w-75"
                        href='/Estudiante/eventos'
                        style={{
                          backgroundColor: '#EFCA45',
                          color:'#3A2E01',
                          borderRadius: '20px',
                          fontSize:'10px'
                        }}>
                        Ver más
                      </a>
                    </div>
                    <div className="col">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;