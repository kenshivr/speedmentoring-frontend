import React from 'react';

export default function Page() {
  return (
        <div className="container-sm my-5 p-5" style={{ backgroundColor: '#002B7A', borderRadius: '50px', maxWidth: '1800px', minHeight:'600px', margin: 'auto' }}>
            <div className="row justify-content-evenly">
                <div className="col-12 col-md-4 order-last order-md-first m-1 d-flex flex-column" style={{ backgroundColor: '#F5E6E8', borderColor: '#908486', borderRadius: '20px', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
                  <div className='container p-3'>
                    <h2>05/Enero/2024</h2>
                    <h6>Hora de inicio - 16:51</h6>
                    <h6>Mentor - Alejandro García Hernández</h6>
                  </div>
                  <form className="d-flex flex-column align-items-center mt-auto p-4">
                    <label style={{ fontSize:'60px' }}>10</label>
                    <a className="btn btn-warning btn-outline-dark mt-2" role="button" style={{ borderRadius: '20px' }}>Modificar calificación</a>
                  </form>
                </div>
                <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor: '#908486', borderWidth: '4px', borderStyle: 'solid', minHeight: '600px' }}>
                    <textarea className="flex-grow-1 p-2" style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }}>
                        Posiblemente son descendientes del muflón salvaje de 
                        Europa y Asia y fueron uno de los primeros animales en 
                        ser domesticados para fines agrícolas, criados 
                        principalmente por su lana, carne y leche. La lana de 
                        oveja es la fibra animal más utilizada y, por lo general, 
                        se recoge mediante esquila. Su carne recibe el nombre 
                        de carne de cordero cuando es de un animal joven y de 
                        ovino mayor cuando proviene de animales de más de 
                        un año. También se crían como organismo modelo para 
                        la investigación científica.
                    </textarea>
                    <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-warning btn-outline-dark">Editar</button>
                    </div>
                </div>
            </div>
        </div>
  );
}