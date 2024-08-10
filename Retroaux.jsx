import React from 'react';

export default function Retroalim() {
  return (
    <div className="container my-5" style={{ backgroundColor:'rgb(0, 43, 122, 0.8)', color:'white', borderRadius:'25px' }}>
        <div className="row justify-content-evenly">
            <div className="col-12 col-md-5 order-first order-md-first d-flex flex-column">
                <div class="container mt-5">
                    <h2>Preguntas</h2>

                    <form>
                        <div class="form-group ">
                            <legend>Calificación general</legend>
                            <div className='container p-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                                <label className='mb-3' for="question">Califica el desempeño general de tu mentor en esta sesión.</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                    <label class="form-check-label" for="option1">
                                        Deficiente
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                    <label class="form-check-label" for="option2">
                                        Regular
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                    <label class="form-check-label" for="option3">
                                        Bueno
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                    <label class="form-check-label" for="option4">
                                        Muy bueno
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                    <label class="form-check-label" for="option5">
                                        Excelente
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <legend>Comunicación y claridad</legend>
                            <div className='container p-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                                <label className='mb-3' for="question">¿Cómo calificarías la claridad con la que tu mentor explicó los temas discutidos?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                    <label class="form-check-label" for="option1">
                                        Nada claro
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                    <label class="form-check-label" for="option2">
                                        Poco claro
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                    <label class="form-check-label" for="option3">
                                        Adecuado
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                    <label class="form-check-label" for="option4">
                                        Claro
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                    <label class="form-check-label" for="option5">
                                        Muy claro
                                    </label>
                                </div>
                            </div>
                            <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                                <label className='mb-3' for="question">¿El mentor respondió a tus preguntas de manera comprensible?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                    <label class="form-check-label" for="option1">
                                        Nunca
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                    <label class="form-check-label" for="option2">
                                        Raramente
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                    <label class="form-check-label" for="option3">                                                    
                                        A veces
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                    <label class="form-check-label" for="option4">
                                        La mayoría de las veces
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                    <label class="form-check-label" for="option5">
                                        Siempre
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <legend>Apoyo y recursos</legend>
                            <div className='container p-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                                <label className='mb-3' for="question">¿El mentor te proporcionó recursos útiles para tu desarrollo?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                    <label class="form-check-label" for="option1">
                                        No era necesario
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                    <label class="form-check-label" for="option2">
                                        No proporcionó rescursos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                    <label class="form-check-label" for="option3">
                                        Pocos recursos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                    <label class="form-check-label" for="option4">
                                        Sí, algunos recursos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                    <label class="form-check-label" for="option5">
                                        Sí, muchos recursos
                                    </label>
                                </div>
                            </div>
                            <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                                <label className='mb-3' for="question">¿Se sentiste cómodo(a) comunicándote con tu mentor?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                    <label class="form-check-label" for="option1">
                                        Muy incómodo(a)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                    <label class="form-check-label" for="option2">
                                        Incómodo(a)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                    <label class="form-check-label" for="option3">                                                    
                                        Neutro(a)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                    <label class="form-check-label" for="option4">
                                        Cómodo(a)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                    <label class="form-check-label" for="option5">
                                        Muy cómodo(a)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div className="col-12 col-md-5 order-last order-md-last d-flex flex-column mt-5">
                <form>

                    <div class="form-group mt-5">
                        <legend>Puntualidad y organización</legend>
                        <div className='container p-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                            <label className='mb-3' for="question">¿El mentor fue puntual en la sesión?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                <label class="form-check-label" for="option1">
                                    Nunca
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                <label class="form-check-label" for="option2">
                                    Raramente
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                <label class="form-check-label" for="option3">
                                    A veces
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                <label class="form-check-label" for="option4">
                                    La mayoría de las veces
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                <label class="form-check-label" for="option5">
                                    Siempre
                                </label>
                            </div>
                        </div>
                        <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                            <label className='mb-3' for="question">¿La sesión estuvo bien organizada y estrucutrada?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option1" value="1"/>
                                <label class="form-check-label" for="option1">
                                    Totalmente en desacuerdo
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option2" value="2"/>
                                <label class="form-check-label" for="option2">
                                    En desacuerdo
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option3" value="3"/>
                                <label class="form-check-label" for="option3">                                                    
                                    Neutral
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option4" value="4"/>
                                <label class="form-check-label" for="option4">
                                    De acuerdo
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="options" id="option5" value="5"/>
                                <label class="form-check-label" for="option5">
                                    Totalmente de acuerdo
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-2">
                        <legend>Fortalezas y áreas de mejora</legend>
                        <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                            <label className='mb-3' for="question">¿Qué hizo bien tu mentor en la sesión?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option1" value="1"/>
                                <label class="form-check-label" for="option1">
                                    Explicación clara de conceptos
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option2" value="2"/>
                                <label class="form-check-label" for="option2">
                                    Provisión de recursos útiles
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option3" value="3"/>
                                <label class="form-check-label" for="option3">                                                    
                                    Empatía y apoyo emocional
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option4" value="4"/>
                                <label class="form-check-label" for="option4">
                                    Organización y estructura de la sesión
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option5" value="5"/>
                                <label class="form-check-label" for="option5">
                                    Otro: [especificar]
                                </label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-2">
                        <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                            <label className='mb-3' for="question">¿En qué áreas crees que tu mentor podría mejorar?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option1" value="1"/>
                                <label class="form-check-label" for="option1">
                                    Puntualidad y organización
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option2" value="2"/>
                                <label class="form-check-label" for="option2">
                                    Empatía y comunicación
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option3" value="3"/>
                                <label class="form-check-label" for="option3">                                                    
                                    Provición de recursos
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="options" id="option4" value="4"/>
                                <label class="form-check-label" for="option4">
                                    Claridad en las explicaciones
                                </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="options" id="option5" value="5"/>
                                <label class="form-check-label" for="option5">
                                    Otro: [especificar]
                                </label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-2">
                        <legend>Comentarios adicionales</legend>
                        <div className='container p-3 my-3' style={{ backgroundColor:'#F5E6E8', color:'black', borderRadius:'20px' }}>
                            <label className='mb-3' for="question">¿Tienes algún comentario adicional sobre tu mentor o la sesión en general?</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
        <div className='row p-3'>
            <div className='container d-flex justify-content-end'>
                <div className='mx-1'>
                    <button 
                      className="btn btn-warning btn-outline-dark" 
                      style={{ 
                        backgroundColor: '#EFCA45', 
                        color: '#000', 
                        border: '1px solid #000', 
                        transition: 'background-color 0.3s, color 0.3s' 
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFCA45';
                        e.currentTarget.style.color = '#000';
                      }}
                    >
                      Guardar
                    </button>
                </div>
                <div className='mx-5'>
                    <button 
                      className="btn btn-warning btn-outline-dark" 
                      style={{ 
                        backgroundColor: 'white', 
                        color: '#4F3F05', 
                        border: '1px solid #000', 
                        transition: 'background-color 0.3s, color 0.3s' 
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#4F3F05';
                      }}
                    >
                      Cancelar
                    </button>
                </div>
            </div>
        </div>
  </div>
  );
}
