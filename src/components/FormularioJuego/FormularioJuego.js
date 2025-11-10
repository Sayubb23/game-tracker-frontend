import React, { useState } from 'react';
import './FormularioJuego.css';

function FormularioJuego({ onAgregarJuego }) { 
// ¡Debe tener { onAgregarJuego } aquí!
  
  const [titulo, setTitulo] = useState('');
  const [portada, setPortada] = useState('');
  const [estrellas, setEstrellas] = useState(1);
  const [horas, setHoras] = useState(0); // Un cajón para las horas, empieza en 0
  const [completado, setCompletado] = useState(false); // Un cajón para saber si está completo (false = no)

const manejarEnvio = (evento) => {
  evento.preventDefault();

  const datosDelJuego = {
    titulo: titulo,
    portada: portada,
    estrellas: estrellas,
    horas: horas, // lo añadimos al paquete 
    completado: completado // Lo añadimos al paquete
  };

  // ¡AQUÍ ESTÁ LA MAGIA!
  console.log('Formulario: ¡Llamando a Papá con este juego!', datosDelJuego); // ¡Añade esta línea!
  onAgregarJuego(datosDelJuego); // ¿Está esta línea?

  // Y limpiamos la mesa DESPUÉS de llamar
  setTitulo('');
  setPortada('');
  setEstrellas(1);
  setHoras(0); // Limpiamos las horas
  setCompletado(false); // Reiniciamos el checkbox
};



return (
    // ¡Aquí conectamos la función!
    <form className="formulario-juego" onSubmit={manejarEnvio}>
      <h3>¡Agrega un Juego Nuevo!</h3>
      
      {/* ... (todos tus inputs siguen igual que antes) ... */}
      <div className="form-grupo">
        <label>Título del Juego:</label>
        <input 
          type="text" 
          placeholder="Ej: Super Mario" 
          value={titulo} 
          onChange={(evento) => setTitulo(evento.target.value)} 
        />
      </div>
      <div className="form-grupo">
        <label>URL de la Portada:</label>
        <input 
          type="text" 
          placeholder="https://..." 
          value={portada} 
          onChange={(evento) => setPortada(evento.target.value)} 
        />
      </div>
      <div className="form-grupo">
        <label>Puntuación (Estrellas):</label>
        <input 
          type="number" 
          min="1" 
          max="5" 
          value={estrellas} 
          onChange={(evento) => setEstrellas(evento.target.value)} 
        />
      </div>
      {/* ... después del div de estrellas ... */}

      <div className="form-grupo">
        <label>Horas Jugadas:</label>
        <input 
          type="number" 
          min="0" 
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
        />
      </div>

      <div className="form-grupo-check"> {/* Le ponemos un nombre de clase diferente */}
        <label>¿Completado?</label>
        <input 
          type="checkbox" 
          checked={completado}
          onChange={(e) => setCompletado(e.target.checked)} // ¡OJO! Un checkbox usa "checked"
        />
      </div>

{/* ... aquí viene el botón verde ... */}
      <button type="submit" className="btn-agregar">
        + Agregar Juego
      </button>
    </form>
  );
}

export default FormularioJuego;