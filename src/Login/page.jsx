import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonPrrincipal from '../components/Button/ButtonPrincipalC.jsx'; 

export default function  LoginPage({ setUser, setUserId, setSpecialty }) {
  const [userCurrent, setUserCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Resetea el estado de error antes de intentar loguear

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/api/login`, {
      //const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userCurrent, password: password }),
      });

      if (!response.ok || response.status === 401) {
        setError('Usuario o contraseña incorrectos...'); // Maneja el error de autenticación
        return;
      }

      const data = await response.json();

      if (data.userType) {
        setUser(data.userType);
        setUserId(data.userId);
        setSpecialty(data.specialty);

        switch (data.userType) {
          case 'student':
            navigate('/Estudiante/inicio');
            break;
          case 'mentor':
            navigate('/Mentor/inicio');
            break;
          case 'admin':
            navigate('/Admin/eventos');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Error al obtener los datos'); // Maneja el error de datos
      }
    } catch (error) {
      setError('Error en la solicitud al servidor'); // Maneja el error de red
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevenir la redirección
    setShowAlert(true); // Mostrar el mensaje de alerta
  };

  return (
    <div className="container-sm my-5 pt-5" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '25px', maxWidth: '450px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="row align-items-center my-5 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" height="150px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">
          <path d="M228-266q60-38 121.05-57 61.04-19 131-19 69.95 0 132.45 20Q675-302 734-266q41-54 58.5-104.46Q810-420.91 810-480q0-140.25-94.83-235.12-94.82-94.88-235-94.88Q340-810 245-715.12 150-620.25 150-480q0 60 17.53 109.72Q185.05-320.57 228-266Zm251.85-180q-59.01 0-99.43-40.65-40.42-40.64-40.42-99Q340-644 380.57-685q40.56-41 99.58-41 59.01 0 99.43 41.15Q620-643.71 620-585.35q0 58.35-40.57 98.85-40.56 40.5-99.58 40.5Zm-.42 387q-85.98 0-162.89-32.76-76.91-32.75-134.82-91.05T91.4-316.78Q59-392.46 59-480.39q0-86.93 33.21-163.4 33.21-76.46 90.97-134.07 57.75-57.61 133.53-90.88Q392.49-902 480.5-902q87.01 0 163.26 33.74 76.25 33.74 133.54 91.08 57.28 57.34 90.99 133.75Q902-567.03 902-480.27q0 87.93-33.26 163.63-33.27 75.71-90.95 133.46-57.68 57.76-134.35 90.97Q566.77-59 479.43-59Z"/>
        </svg>
        <div className="container pt-5">
          {showAlert && (
            <div
              className="alert alert-warning mt-1"
              role="alert"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px',
                margin: '0 auto',
                textAlign: 'center'
              }}
            >
              Recuerda que tu contraseña es tu homoclave (HHH) si eres un mentor, o tu fecha de nacimiento (AAAAMMDD) si eres un estudiante...
            </div>
          )}
          <div className="col d-flex align-items-center justify-content-center my-4 pt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label text-white responsive-text">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={userCurrent}
                  onChange={(e) => setUserCurrent(e.target.value)}
                  style={{ maxWidth: '100%' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label text-white responsive-text">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ maxWidth: '100%' }}
                />
                {error && (
                  <div className="alert alert-danger mt-3" role="alert" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    {error}
                  </div>
                )}
              </div>
  
              <div className="mb-3">
                <h6 style={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
                  <Link to="#" onClick={handleLinkClick} style={{ color: 'white', textDecoration: 'underline' }}>
                    ¿Has olvidado tu contraseña?
                  </Link>
                </h6>
              </div>
  
              <div className="pt-5">
                <ButtonPrrincipal text="Ingresar" />
              </div>
            </form>
          </div>

  
        </div>
      </div>
    </div>
  );
  
  
}