// import React, { useState } from 'react';

// const Retroalim = () => {
//   const [formData, setFormData] = useState({
//     p1: 0,
//     p2: 0,
//     p3: 0,
//     p4: 0,
//     p5: 0,
//     p6: 0,
//     p7: [],
//     p8: '',
//     p9: '',
//     p10: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí puedes enviar formData al backend
//     console.log('Datos a enviar:', formData);
//     // Lógica para enviar al backend
//   };

//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <h2>Formulario de Retroalimentación</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Pregunta 1 */}
//             <div className="mb-3">
//               <label htmlFor="p1" className="form-label">Califica el desempeño general de tu mentor en esta sesión.</label>
//               <select
//                 className="form-select"
//                 id="p1"
//                 name="p1"
//                 value={formData.p1}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Deficiente</option>
//                 <option value="4">Regular</option>
//                 <option value="6">Bueno</option>
//                 <option value="8">Muy bueno</option>
//                 <option value="10">Excelente</option>
//               </select>
//             </div>

//             {/* Pregunta 2 */}
//             <div className="mb-3">
//               <label htmlFor="p2" className="form-label">¿Cómo calificarías la claridad con la que tu mentor explicó los temas discutidos?</label>
//               <select
//                 className="form-select"
//                 id="p2"
//                 name="p2"
//                 value={formData.p2}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Nada claro</option>
//                 <option value="4">Poco claro</option>
//                 <option value="6">Adecuado</option>
//                 <option value="8">Claro</option>
//                 <option value="10">Muy claro</option>
//               </select>
//             </div>

//             {/* Pregunta 3 */}
//             <div className="mb-3">
//               <label htmlFor="p3" className="form-label">¿El mentor respondió a tus preguntas de manera comprensible?</label>
//               <select
//                 className="form-select"
//                 id="p3"
//                 name="p3"
//                 value={formData.p3}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Nunca</option>
//                 <option value="4">Raramente</option>
//                 <option value="6">A veces</option>
//                 <option value="8">La mayoría de veces</option>
//                 <option value="10">Siempre</option>
//               </select>
//             </div>

//             {/* Pregunta 4 */}
//             <div className="mb-3">
//               <label htmlFor="p4" className="form-label">¿El mentor te proporcionó recursos útiles para tu desarrollo?</label>
//               <select
//                 className="form-select"
//                 id="p4"
//                 name="p4"
//                 value={formData.p4}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">No era necesario</option>
//                 <option value="4">No proporcionó recursos</option>
//                 <option value="6">Pocos recursos</option>
//                 <option value="8">Sí, algunos recursos</option>
//                 <option value="10">Sí, muchos recursos</option>
//               </select>
//             </div>

//             {/* Pregunta 5 */}
//             <div className="mb-3">
//               <label htmlFor="p5" className="form-label">¿Te sentiste cómodo(a) comunicándote con tu mentor?</label>
//               <select
//                 className="form-select"
//                 id="p5"
//                 name="p5"
//                 value={formData.p5}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Muy incómodo(a)</option>
//                 <option value="4">Incómodo(a)</option>
//                 <option value="6">Neutro(a)</option>
//                 <option value="8">Cómodo(a)</option>
//                 <option value="10">Muy cómodo(a)</option>
//               </select>
//             </div>

//             {/* Pregunta 6 */}
//             <div className="mb-3">
//               <label htmlFor="p6" className="form-label">¿El mentor fue puntual en la sesión?</label>
//               <select
//                 className="form-select"
//                 id="p6"
//                 name="p6"
//                 value={formData.puntualidadOrganizacion}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Nunca</option>
//                 <option value="4">Raramente</option>
//                 <option value="6">A veces</option>
//                 <option value="8">La mayoría de las veces</option>
//                 <option value="10">Siempre</option>
//               </select>
//             </div>

//             {/* Pregunta 7 */}
//             <div className="mb-3">
//               <label htmlFor="p7" className="form-label">¿La sesión estuvo bien organizada y estructurada?</label>
//               <select
//                 className="form-select"
//                 id="p7"
//                 name="p7"
//                 value={formData.estructuraSesion}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Totalmente en desacuerdo</option>
//                 <option value="4">En desacuerdo</option>
//                 <option value="6">Neutral</option>
//                 <option value="8">De acuerdo</option>
//                 <option value="10">Totalmente de acuerdo</option>
//               </select>
//             </div>

//             {/* Pregunta 8 */}
//             <div className="mb-3">
//               <label className="form-label">¿Qué hizo bien tu mentor en la sesión?</label><br />
//               <input
//                 type="checkbox"
//                 id="p8-1"
//                 name="p8-1"
//                 value="Explicación clara de conceptos"
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="p8-1">Explicación clara de conceptos</label><br />
//               <input
//                 type="checkbox"
//                 id="p8-2"
//                 name="p8-2"
//                 value="Proporcionó recursos útiles"
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="p8-2">Proporcionó recursos útiles</label><br />
//               <input
//                 type="checkbox"
//                 id="p8-3"
//                 name="p8-3"
//                 value="Empatía y apoyo emocional"
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="p8-3">Empatía y apoyo emocional</label><br />
//               <input
//                 type="checkbox"
//                 id="p8-4"
//                 name="p8-4"
//                 value="Organización y estructura de la sesión"
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="p8-4">Organización y estructura de la sesión</label><br />

//               <label htmlFor="p8-5"> Otro:</label><br />
            
//             <textarea name="p8-5" value={formData.areasMejorar} onChange={handleInputChange}></textarea>
            
//             </div>

//             {/* Pregunta 9 */}
//             <div className="mb-3">
//               <label htmlFor="comentariosAdicionales" className="form-label">¿Tienes algún comentario adicional que te gustaría compartir?</label>
//               <textarea
//                 className="form-control"
//                 id="comentariosAdicionales"
//                 name="comentariosAdicionales"
//                 placeholder='textArea'
//                 value={formData.comentariosAdicionales}
//                 onChange={handleInputChange}
//               ></textarea>
//             </div>

//             {/* Pregunta 10 */}
//             <div className="mb-3">
//               <label htmlFor="preguntasRespondidas" className="form-label">¿Todas tus preguntas fueron respondidas satisfactoriamente?</label>
//               <select
//                 className="form-select"
//                 id="preguntasRespondidas"
//                 name="preguntasRespondidas"
//                 value={formData.preguntasRespondidas}
//                 onChange={handleInputChange}
//               >
//                 <option value="0">Selecciona...</option>
//                 <option value="2">Nunca</option>
//                 <option value="4">Raramente</option>
//                 <option value="6">A veces</option>
//                 <option value="8">La mayoría de veces</option>c
//                 <option value="10">Siempre</option>
//               </select>
//             </div>

//             <button type="submit" className="btn btn-primary">Enviar Retroalimentación</button>
//           </form>
//         </div>

//         <div className='row p-3'>
//             <div className='container d-flex justify-content-end'>
//                 <div className='mx-1'>
//                     <button 
//                       className="btn btn-warning btn-outline-dark" 
//                       style={{ 
//                         backgroundColor: '#EFCA45', 
//                         color: '#000', 
//                         border: '1px solid #000', 
//                         transition: 'background-color 0.3s, color 0.3s' 
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = '#000';
//                         e.currentTarget.style.color = 'white';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = '#EFCA45';
//                         e.currentTarget.style.color = '#000';
//                       }}
//                     >
//                       Guardar
//                     </button>
//                 </div>
//                 <div className='mx-2'>
//                     <a
//                       type="button"
//                       className="btn w-75"
//                       href='/Estudiante/sesiones/verSesion'
//                       style={{ 
//                         backgroundColor: 'white', 
//                         color: '#4F3F05', 
//                         border: '1px solid #000', 
//                         minWidth: '100px',
//                         transition: 'background-color 0.3s, color 0.3s' 
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = '#000';
//                         e.currentTarget.style.color = 'white';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = 'white';
//                         e.currentTarget.style.color = '#4F3F05';
//                       }}
//                       >
//                       Cancelar
//                     </a>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };