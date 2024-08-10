import React from 'react';
import styles from '../../Styles/Header.css'

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#002B7A' }}>
        <div className="container">
          <div className="row w-100 no-gutters py-2 ms-2">

            <div className="col-4 d-flex align-items-center justify-content-start">
              <a className="navbar-brand" href="https://www.acatlan.unam.mx/">
                <img 
                  src="https://www.acatlan.unam.mx/identidad-acatlan/img/Logotipos/Logotipo/logo-blancoBis.png" 
                  alt="Logo Fes Acatlan" 
                  className={`d-inline-block align-text-start img-fluid ${styles.logoImg}`}
                  style={{ minHeight:'50px', minWidth:'150px'}}
                />
              </a>
            </div>

            <div className="col-4 d-flex align-items-center justify-content-center">
            </div>

            <div className="col-4 d-flex align-items-center justify-content-end">
              <a className="navbar-brand" href="https://mac.acatlan.unam.mx/">
                <img 
                  src="https://dl.dropboxusercontent.com/s/z2maoh5yf7apv9ogvbt3m/logomac1-blanco.png?rlkey=rb71mpzb7uz1olo87d2vt2qmq&st=0828oyl6" 
                  alt="Logo MAC" 
                  className={`d-inline-block align-text-top img-fluid logo-mac`}
                />
              </a>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}
