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
                <div className="col-12 col-md-7 order-first order-md-last m-1 d-flex flex-column" style={{ backgroundColor: 'white', borderColor:'#908486', borderWidth: '4px', borderStyle: 'solid', minHeight:'600px' }}>
                    <textarea className="flex-grow-1 p-2" style={{ border: 'none', resize: 'none', outline: 'none', width: '100%' }} placeholder="Escribe aquí tu reporte de la sesión. Debe contener: Objetivos establecidos y/o logrados, temas discutidos, acciones a seguir, ..."></textarea>
                    <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-warning btn-outline-dark">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
  );
}