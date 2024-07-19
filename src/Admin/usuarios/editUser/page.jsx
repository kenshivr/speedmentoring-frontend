import React, { useState } from 'react';

export default function Page() {
  const [userType, setUserType] = useState('none');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <div className='container mt-5 p-1' style={{ maxWidth: '950px' }}>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ backgroundColor: '#EFCA45', color: '#4F3F05', maxWidth: '500px' }}
          onChange={handleUserTypeChange}
          value={userType}
        >
          <option value="none">Tipo de usuario</option>
          <option value="estudiante">Estudiante</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <div className="container-sm my-1" style={{ backgroundColor: 'white', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight:'410px', margin: 'auto' }}>
        {userType === 'estudiante' && (
          <div className="row justify-content-evenly pt-3" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', margin: 'auto' }}>
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Número de cuenta</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Ejemplo de número de cuenta" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Mentor</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Mentor</option>
                  <option value="1">José Luis Mejia Soto</option>
                  <option value="2">Brayan Vidal Romero</option>
                  <option value="3">Janine Farfan Romero</option>
                </select>
              </div>
              
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3 pt-5">
              <div className='mb-3' style={{ maxWidth: '500px' }}>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Especialidad</option>
                  <option value="1">Ciencia de datos</option>
                  <option value="2">Desarrollo web</option>
                  <option value="3">Base de datos</option>
                </select>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">Contraseña (HASH)</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Contraseña escrita en HASH'/>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
                <button
                  type="submit"
                  className="btn w-75"
                  style={{
                    backgroundColor: '#EFCA45',
                    color: '#4F3F05',
                    borderColor: '#EFCA45',
                    borderRadius: '20px'
                  }}>
                  Editar
                </button>
              </div>
            </div>
          </div>
        )}
        {userType === 'mentor' && (
          <div className="row justify-content-evenly" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '50px', color: 'white', maxWidth: '1000px', minHeight:'410px', margin: 'auto' }}>
            <div className="col-12 col-md-5 order-first order-md-first m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre(s)</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Ejemplo de nombre" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Apellido paterno</label>
                <input className="form-control" id="exampleFormControlInput2" placeholder="Ejemplo de apellido" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Apellido materno</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de apellido" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Empresa</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de empresa" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">RFC</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de RFC" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Maestría</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label class="form-check-label" for="flexRadioDefault1">
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                  <label class="form-check-label" for="flexRadioDefault2">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last m-1 d-flex flex-column p-3">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput5" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="exampleFormControlInput5" placeholder="nombre@ejemplo.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput6" className="form-label">Teléfono</label>
                <input className="form-control" id="exampleFormControlInput6" placeholder="Ejemplo de teléfono" />
              </div>
              <div className='mb-4 mt-4' style={{ maxWidth: '500px' }}>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Especialidad</option>
                  <option value="1">Ciencia de datos</option>
                  <option value="2">Desarrollo web</option>
                  <option value="3">Base de datos</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Puesto</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de puesto" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Grado académico</label>
                <input className="form-control" id="exampleFormControlInput3" placeholder="Ejemplo de grado académico" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">Contraseña (HASH)</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Contraseña escrita en HASH'/>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '100px' }}>
                <button
                  type="submit"
                  className="btn w-75"
                  style={{
                    backgroundColor: '#EFCA45',
                    color: '#4F3F05',
                    borderColor: '#EFCA45',
                    borderRadius: '20px'
                  }}>
                  Editar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
