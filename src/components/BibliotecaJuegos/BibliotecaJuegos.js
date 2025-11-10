import React from 'react';
import './BibliotecaJuegos.css'; 
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';

// ¡Recibimos "juegos" como un regalo (props)!
function BibliotecaJuegos({ juegos }) {

  return (
    <div className="biblioteca-contenedor">
      <h2>Mi Estantería de Juegos</h2>

      <div className="lista-juegos">

        {/* Recorremos la lista de "juegos" que recibimos
          y creamos una Tarjeta para cada uno.
        */}
        {juegos.map((juego) => (
          <TarjetaJuego
            key={juego.id} // La llave es súper importante para React
            titulo={juego.titulo}
            portada={juego.portada}
            estrellas={juego.estrellas}
          />
        ))}

      </div>
    </div>
  );
}

export default BibliotecaJuegos;