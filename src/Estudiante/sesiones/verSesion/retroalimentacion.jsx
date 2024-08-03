import React, { useEffect, useState } from 'react';

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
    preguntasRespondidas: '0'
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        setFormData((prevState) => ({
            ...prevState,
            userId: userId
        }));
    }
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

    console.log(formData);
    
    // Configuración de la solicitud POST
    fetch('http://localhost:3001/api/retro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
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
        <div className="col-md-8">
          <h2>Formulario de Retroalimentación</h2>
          <form onSubmit={handleSubmit}>
            {/* Pregunta 1 */}
            <div className="mb-3">
              <label htmlFor="p1" className="form-label">Califica el desempeño general de tu mentor en esta sesión.</label>
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
            <div className="mb-3">
              <label htmlFor="p2" className="form-label">¿Cómo calificarías la claridad con la que tu mentor explicó los temas discutidos?</label>
              <select
                className="form-select"
                id="p2"
                name="p2"
                value={formData.p2}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Nada claro</option>
                <option value="4">Poco claro</option>
                <option value="6">Adecuado</option>
                <option value="8">Claro</option>
                <option value="10">Muy claro</option>
              </select>
            </div>

            {/* Pregunta 3 */}
            <div className="mb-3">
              <label htmlFor="p3" className="form-label">¿El mentor respondió a tus preguntas de manera comprensible?</label>
              <select
                className="form-select"
                id="p3"
                name="p3"
                value={formData.p3}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Nunca</option>
                <option value="4">Raramente</option>
                <option value="6">A veces</option>
                <option value="8">La mayoría de veces</option>
                <option value="10">Siempre</option>
              </select>
            </div>

            {/* Pregunta 4 */}
            <div className="mb-3">
              <label htmlFor="p4" className="form-label">¿El mentor te proporcionó recursos útiles para tu desarrollo?</label>
              <select
                className="form-select"
                id="p4"
                name="p4"
                value={formData.p4}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">No era necesario</option>
                <option value="4">No proporcionó recursos</option>
                <option value="6">Pocos recursos</option>
                <option value="8">Sí, algunos recursos</option>
                <option value="10">Sí, muchos recursos</option>
              </select>
            </div>

            {/* Pregunta 5 */}
            <div className="mb-3">
              <label htmlFor="p5" className="form-label">¿Te sentiste cómodo(a) comunicándote con tu mentor?</label>
              <select
                className="form-select"
                id="p5"
                name="p5"
                value={formData.p5}
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

            {/* Pregunta 6 */}
            <div className="mb-3">
              <label htmlFor="p6" className="form-label">¿El mentor fue puntual en la sesión?</label>
              <select
                className="form-select"
                id="p6"
                name="p6"
                value={formData.p6}
                onChange={handleInputChange}
              >
                <option value="0">Selecciona...</option>
                <option value="2">Nunca</option>
                <option value="4">Raramente</option>
                <option value="6">A veces</option>
                <option value="8">La mayoría de las veces</option>
                <option value="10">Siempre</option>
              </select>
            </div>

            {/* Pregunta 7 */}
            <div className="mb-3">
              <label htmlFor="p7" className="form-label">¿La sesión estuvo bien organizada y estructurada?</label>
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
            <div className="mb-3">
              <label className="form-label">¿Qué hizo bien tu mentor en la sesión?</label><br />
              <input
                type="checkbox"
                id="p8-1"
                name="p8"
                value="Explicación clara de conceptos"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-1">Explicación clara de conceptos</label><br />
              <input
                type="checkbox"
                id="p8-2"
                name="p8"
                value="Proporcionó recursos útiles"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-2">Proporcionó recursos útiles</label><br />
              <input
                type="checkbox"
                id="p8-3"
                name="p8"
                value="Empatía y apoyo emocional"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-3">Empatía y apoyo emocional</label><br />
              <input
                type="checkbox"
                id="p8-4"
                name="p8"
                value="Organización y estructura de la sesión"
                onChange={handleInputChange}
              />
              <label htmlFor="p8-4">Organización y estructura de la sesión</label><br />
              <label htmlFor="p11">Otro:</label><br />
              <textarea
                id="p11"
                name="p11"
                value={formData.p11}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Pregunta 9 */}
            <div className="mb-3">
              <label htmlFor="comentariosAdicionales" className="form-label">Comentarios adicionales</label>
              <textarea
                className="form-control"
                id="comentariosAdicionales"
                name="comentariosAdicionales"
                value={formData.comentariosAdicionales}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
