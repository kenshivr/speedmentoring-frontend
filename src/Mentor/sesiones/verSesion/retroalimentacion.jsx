import React, { useEffect, useState } from 'react';
import ButtonPrrincipal from '../../../components/Button/ButtonPrincipalC.jsx'; 


export default function Retroalim() {
  const [formData, setFormData] = useState({
    p1: '0',
    p2: '0',
    p3: '0',
    p4: '0',
    p5: '0',
    p6: '0',
    p7: [],
    p8: '',
    p9: '',
    p10: '',
    p11: '',
    comentariosAdicionales: '',
    preguntasRespondidas: '0',
    userId: ''
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        setFormData((prevState) => ({
            ...prevState,
            userId: userId
        }));
    }
    // Object.keys(formData).forEach(key => {
    //   if (formData[key])
    //   console.log(`Key: ${key}, Value: ${formData[key]}`);
    // })
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked ? [...prevState[name], value] : prevState[name].filter((v) => v !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    // Configuración de la solicitud POST
    //fetch(`http://localhost:3001/api/retro`, {
    fetch(`${apiUrl}/api/retro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
        if (data.success) {
            alert('Retroalimentacion guardada con exito!');
        } else {
            alert('Ocurrió un problema con la retroalimentación, por favor intente nuevamente.');
        }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocurrio un error en el envio, intentar mas tarde.');
    });
  };
  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 p-5" style={{ backgroundColor:'#002B7A', color:'white', borderRadius:'25px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <h2>Retroalimentación</h2>
          <form onSubmit={handleSubmit}>
            {/* Pregunta 1 */}
            <div className="my-4">
              <label htmlFor="p1" className="form-label">Califica el desempeño general del estudiante en esta sesión.</label>
              <select
                className="form-select"
                id="p1"
                name="p1"
                value={formData.p1}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Deficiente</option>
                <option value="4">Regular</option>
                <option value="6">Bueno</option>
                <option value="8">Muy bueno</option>
                <option value="10">Excelente</option>
              </select>
            </div>

            {/* Pregunta 2 */}
            <div className="my-4">
              <label htmlFor="p2" className="form-label">¿Cómo calificarías el esfuerzo del estudiante en comprender y aplicar los temas discutidos?</label>
              <select
                className="form-select"
                id="p2"
                name="p2"
                value={formData.p2}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Muy bajo</option>
                <option value="4">Bajo</option>
                <option value="6">Adecuado</option>
                <option value="8">Alto</option>
                <option value="10">Muy alto</option>
              </select>
            </div>

            {/* Pregunta 3 */}
            <div className="my-4">
              <label htmlFor="p3" className="form-label">¿El estudiante demostró una actitud proactiva en su aprendizaje?
              </label>
              <select
                className="form-select"
                id="p3"
                name="p3"
                value={formData.p3}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Totalmente en desacuerdo</option>
                <option value="4">En desacuerdo</option>
                <option value="6">Neutral</option>
                <option value="8">De acuerdo</option>
                <option value="10">Totalmente de acuerdo</option>
              </select>
            </div>

            {/* Pregunta 4 */}
            <div className="my-4">
              <label htmlFor="p4" className="form-label">¿Te sentiste cómodo(a) comunicándote con el estudiante?
              </label>
              <select
                className="form-select"
                id="p4"
                name="p4"
                value={formData.p4}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Muy incómodo(a)</option>
                <option value="4">Incómodo(a)</option>
                <option value="6">Neutro(a)</option>
                <option value="8">Cómodo(a)</option>
                <option value="10">Muy cómodo(a)</option>
              </select>
            </div>

            {/* Pregunta 5 */}
            <div className="my-4">
              <label htmlFor="p5" className="form-label">¿El estudiante fue puntual en la sesión?</label>
              <select
                className="form-select"
                id="p5"
                name="p5"
                value={formData.p5}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Totalmente en desacuerdo</option>
                <option value="4">En desacuerdo</option>
                <option value="6">Neutral</option>
                <option value="8">De acuerdo</option>
                <option value="10">Totalmente de acuerdo</option>
              </select>
            </div>

            {/* Pregunta 6 */}
            <div className="my-4">
              <label htmlFor="p6" className="form-label">¿El estudiante mostró interés y compromiso durante la sesión?</label>
              <select
                className="form-select"
                id="p6"
                name="p6"
                value={formData.p6}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Totalmente en desacuerdo</option>
                <option value="4">En desacuerdo</option>
                <option value="6">Neutral</option>
                <option value="8">De acuerdo</option>
                <option value="10">Totalmente de acuerdo</option>
              </select>
            </div>

            {/* Pregunta 7 */}
            <div className="my-4">
              <label htmlFor="p7" className="form-label">¿Consideras que el estudiante está progresando adecuadamente en su aprendizaje?</label>
              <select
                className="form-select"
                id="p7"
                name="p7"
                value={formData.p7}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Totalmente en desacuerdo</option>
                <option value="4">En desacuerdo</option>
                <option value="6">Neutral</option>
                <option value="8">De acuerdo</option>
                <option value="10">Totalmente de acuerdo</option>
              </select>
            </div>

            {/* Pregunta 8 */}
            <div className="my-4">
              <label className="form-label">¿En qué áreas destacó el estudiante durante la sesión?</label><br />
              <input
                type="checkbox"
                id="p8-1"
                name="p8"
                value="Comprensión de conceptos"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-1" className='px-2'>Comprensión de conceptos</label><br />
              <input
                type="checkbox"
                id="p8-2"
                name="p8"
                value="Participación activa"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-2" className='px-2'>Participación activa</label><br />
              <input
                type="checkbox"
                id="p8-3"
                name="p8"
                value="Habilidades de comunicación"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-3" className='px-2'>Habilidades de comunicación</label><br />
              <input
                type="checkbox"
                id="p8-4"
                name="p8"
                value="Aplicación práctica de conocimientos"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-4" className='px-2'>Aplicación práctica de conocimientos</label><br />
              <label htmlFor="p11">Otro:</label><br />
              <textarea
                className="form-control"
                id="p9"
                name="p9"
                value={formData.p9}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Pregunta 9 */}
            <div className="my-4">
              <label htmlFor="comentariosAdicionales" className="form-label">¿Tienes algún comentario adicional que te gustaría compartir?</label>
              <textarea
                className="form-control"
                id="comentariosAdicionales"
                name="comentariosAdicionales"
                value={formData.comentariosAdicionales}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="d-grid">
              <ButtonPrrincipal 
                text='Enviar'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
