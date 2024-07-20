import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ setUser, setUserId, setSpecialty }) {
  const [userCurrent, setUserCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
// <<<<<<< HEAD
//     try {
//       const response = await fetch(`http://localhost:3001/api/login?user=${userCurrent}&password=${password}`);
// =======
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userCurrent, password: password }),
      });
// >>>>>>> temporal

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();

      if (data.userType) {
        setUser(data.userType);
        setUserId(data.userId);
// <<<<<<< HEAD
//         switch(data.userType) {
//           case 'student':
//             navigate('/Estudiante/page');
//             break;
//           case 'mentor':
//             navigate('/Mentor/page');
//             break;
//           case 'admin':
//             navigate('/Admin/page');
//             break;
//           default:
//             setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Usuario o contraseña incorrectos');
//       }

//     } catch (error) {
//       setError('Usuario o contraseña incorrectos');
//     }
// =======
        setSpecialty(data.specialty);
      }

      if (data.userType === 'student') {
        // localStorage.setItem('userType', 'student');
        navigate('/Estudiante/page');
      }

      if (data.userType === 'mentor') {
        // localStorage.setItem('userType', 'mentor');
        navigate('/Mentor/page');
      }

      if (data.userType === 'admin') {
        // localStorage.setItem('userType', 'admin');
        navigate('/Admin/page');
      }
// >>>>>>> temporal
  };

  return (
    <div className="container-sm my-5 help" style={{ backgroundColor: 'rgba(0, 43, 122, 0.8)', borderRadius: '25px' }}>
      <div className="container">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="row w-100 no-gutters">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="container-sm d-flex justify-content-center align-items-center my-4" style={{ backgroundColor: 'rgba(239, 202, 69, 1)', borderRadius: '10px' }}>
              <a className="navbar-brand" href="https://www.acatlan.unam.mx/">
                <img
                  src="https://www.acatlan.unam.mx/identidad-acatlan/img/Logotipos/Escudo/escudo-a.png"
                  alt="Logo Fes Acatlan"
                  className="img-fluid my-4"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </a>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center my-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label text-white responsive-text">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={userCurrent}
                  onChange={(e) => setUserCurrent(e.target.value)}
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
                />
              </div>
              <div className="mb-3">
                <h6 style={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
                  <Link to="/login/buscarCuenta" style={{ color: 'white', textDecoration: 'underline' }}>
                    ¿Has olvidado tu contraseña?
                  </Link>
                </h6>
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{ 
                  backgroundColor: '#EFCA45', 
                  color: '#4F3F05', 
                  border: '1px solid #000',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s, color 0.3s' 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFCA45';
                  e.currentTarget.style.color = '#4F3F05';
                }}>
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
