import React from 'react';
import './TarjetaJuego.css'; // 4. (Este es el paso 4)

// ¡Aquí están las "ranuras" (props)!
// Estamos diciendo: "Quien me use, me tiene que dar un titulo, una portada y estrellas"
function TarjetaJuego({ id, titulo, portada, estrellas, horas, completado, onEliminarJuego, onToggleCompletado }) {
return (
  <div className="tarjeta">
    <img src={portada} alt={titulo} className="tarjeta-portada" />
    <h3 className="tarjeta-titulo">{titulo}</h3>

    <p className="tarjeta-estrellas">Calificación: {estrellas} ★</p>

    {/* ¡Aquí está lo nuevo! */}
    <p>Horas Jugadas: {horas}h</p>

    <p>
      {/* Esto es un "if" corto. 
        Dice: ¿"completado" es "true"? 
        SI (?), pon 'Completado ✅'. 
        NO (:), pon 'Pendiente ❌'.
      */}
      {completado ? 'Completado ✅' : 'Pendiente ❌'}
    </p>
      {/* ... justo despues del parrafo de "Completado / Pendiente" ... */}

      {/* El boton inteligente */}
      <button className="btn-toggle-completado" onClick={() => onToggleCompletado(id)}>
        {/* Si está "completado" (true), muestra "Marcar Pendiente".
      Si no (!completado), muestra "Marcar Completado".
  */}
  {completado ? 'Marcar Pendiente ❌' : 'Marcar Completado ✅'}
      </button>

      <button
      className="btn-eliminar"
      onClick={() => onEliminarJuego(id)}>
        Eliminar
      </button>
  </div>
);
}

export default TarjetaJuego;