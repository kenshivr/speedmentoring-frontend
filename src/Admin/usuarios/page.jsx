import React from 'react';

export default function Page() {
  return (
    <div className="container-sm my-5 p-3" style={{ backgroundColor: '#002B7A', borderRadius:'50px', maxWidth: '1000px', margin: 'auto' }}>
        <div className="container p-3">
          <div className="row g-0 text-center mb-3">
            <div className="col-sm-6 col-md-12">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", color: "black", borderRadius: "15px"}}/>
                <button className="btn btn-outline-success me-2" type="submit" style={{ backgroundColor: "#EFCA45", borderColor: "#EFCA45", borderRadius: "15px"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </button>
                <a className="btn btn-danger btn-outline-light btn-sm" href="/Admin/usuarios/NewUser/page" role="button">Nuevo usuario</a>
              </form>
            </div>
          </div>
          <div className="table-responsive p-2 justify-content-center align-items-center text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Seleccionar</th>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido paterno</th>
                  <th scope="col">Apellido materno</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Especialidad</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Periodo</th>
                  <th scope="col">Fecha de registro</th>
                  <th scope="col">Sesiones</th>
                  <th scope="col">Reportes enviados</th>
                  <th scope="col">Reportes no enviados</th>
                  <th scope="col">Último login</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-light">
                <tr>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>317285361</td>
                  <td>Erick</td>
                  <td>Pérez</td>
                  <td>Mendoza</td>
                  <td>Estudiante</td>
                  <td>5521905108</td>
                  <td>Base de datos</td>
                  <td>317285361@pcpuma.acatlan.unam.mx</td>
                  <td>24-1</td>
                  <td>25/04/2024</td>
                  <td>10</td>
                  <td>6</td>
                  <td>4</td>
                  <td>28/04/2024</td>
                  <td>
                    <button className="btn btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>314485232</td>
                  <td>Bryan</td>
                  <td>Amado</td>
                  <td>Romero</td>
                  <td>Estudiante</td>
                  <td>5515922130</td>
                  <td>Ciencia de datos</td>
                  <td>314485232@pcpuma.acatlan.unam.mx</td>
                  <td>24-2</td>
                  <td>10/04/2024</td>
                  <td>4</td>
                  <td>4</td>
                  <td>0</td>
                  <td>03/05/2024</td>
                  <td>
                    <button className="btn btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                  </td>
                  <td>000000001</td>
                  <td>Luis</td>
                  <td>Soto</td>
                  <td>Gómez</td>
                  <td>Mentor</td>
                  <td>5582603591</td>
                  <td>Desarrollo web</td>
                  <td>luis_soto@gmail.com</td>
                  <td>24-2</td>
                  <td>05/04/2023</td>
                  <td>30</td>
                  <td>28</td>
                  <td>2</td>
                  <td>18/05/2024</td>
                  <td>
                    <button className="btn btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M263.79-408Q234-408 213-429.21t-21-51Q192-510 213.21-531t51-21Q294-552 315-530.79t21 51Q336-450 314.79-429t-51 21Zm216 0Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm216 0Q666-408 645-429.21t-21-51Q624-510 645.21-531t51-21Q726-552 747-530.79t21 51Q768-450 746.79-429t-51 21Z"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}