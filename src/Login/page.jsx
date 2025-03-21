import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonPrrincipal from '../components/Button/ButtonPrincipalC.jsx'; 

export default function LoginPage({ setUser, setUserId, setSpecialty, setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [userCurrent, setUserCurrent] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL; 
      const response = await fetch(`${apiUrl}/api/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userCurrent, password: password }),
        credentials: 'include'
      });

      if (!response.ok || response.status === 401) {
        setError('Usuario o contraseña incorrectos...');
        return;
      }

      const data = await response.json();

      if (data.userType) {
        setUser(data.userType);
        setUserId(data.userId);
        setSpecialty(data.specialty);
        setIsAuthenticated(true);

        // Asegúrate de que la redirección ocurra después de que isAuthenticated se establezca en true.
        switch (data.userType) {
          case 'student':
            setTimeout(() => navigate('/Estudiante/inicio'), 100);
            break;
          case 'mentor':
            setTimeout(() => navigate('/Mentor/inicio'), 100);
            break;
          case 'admin':
            setTimeout(() => navigate('/Admin/eventos'), 100);
            break;
          default:
            navigate('/login');
        }
      } else {
        setError('Error al obtener los datos');
      }
    } catch (error) {
      setError('Error en la solicitud al servidor');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75 px-3 mt-4">
      <div className="card shadow-lg w-100" style={{ maxWidth: '400px', borderRadius: '25px', backgroundColor: 'rgba(0, 43, 122, 0.9)' }}>
        <div className="card-body p-4">
          <div className="text-center my-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" fill="#e8eaed">
              <path d="M228-266q60-38 121.05-57 61.04-19 131-19 69.95 0 132.45 20Q675-302 734-266q41-54 58.5-104.46Q810-420.91 810-480q0-140.25-94.83-235.12-94.82-94.88-235-94.88Q340-810 245-715.12 150-620.25 150-480q0 60 17.53 109.72Q185.05-320.57 228-266Zm251.85-180q-59.01 0-99.43-40.65-40.42-40.64-40.42-99Q340-644 380.57-685q40.56-41 99.58-41 59.01 0 99.43 41.15Q620-643.71 620-585.35q0 58.35-40.57 98.85-40.56 40.5-99.58 40.5Zm-.42 387q-85.98 0-162.89-32.76-76.91-32.75-134.82-91.05T91.4-316.78Q59-392.46 59-480.39q0-86.93 33.21-163.4 33.21-76.46 90.97-134.07 57.75-57.61 133.53-90.88Q392.49-902 480.5-902q87.01 0 163.26 33.74 76.25 33.74 133.54 91.08 57.28 57.34 90.99 133.75Q902-567.03 902-480.27q0 87.93-33.26 163.63-33.27 75.71-90.95 133.46-57.68 57.76-134.35 90.97Q566.77-59 479.43-59Z" />
            </svg>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-white text-center d-block">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={userCurrent}
                onChange={(e) => setUserCurrent(e.target.value)}
                style={{ borderRadius: '25px' }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white text-center d-block">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '25px' }}
                required
              />
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>

            <div className="pt-3 pb-4 d-grid justify-content-center">
              <ButtonPrrincipal text="Ingresar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
