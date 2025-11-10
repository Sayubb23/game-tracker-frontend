import React, { useState } from 'react'; // ¡Importamos useState!
import './App.css';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';

// ¡Nuestros datos iniciales!
const DATOS_INICIALES = [
  {
    id: 1,
    titulo: 'Super Mario Odyssey',
    portada: 'https://via.placeholder.com/200x250.png?text=Mario',
    estrellas: 5,
    horas: 60, // Añadido
    completado: true // Añadido 
  },
  {
    id: 2,
    titulo: 'Zelda: Breath of the Wild',
    portada: 'https://via.placeholder.com/200x250.png?text=Zelda',
    estrellas: 5,
    horas: 150, // Añadido 
    completado: true // Añadido 
  },
  {
    id: 3,
    titulo: 'Animal Crossing',
    portada: 'https://via.placeholder.com/200x250.png?text=Animal+Çrossing',
    estrellas: 4,
    horas: 300, // Añadido
    completado: false // Añadido 

  }
]

function App() {
  // ¡La Caja Maestra!
  const [juegos, setJuegos] = useState(DATOS_INICIALES);

  // Esta es la "instrucción" que se ejecuta cuando el formulario "llama"
  const agregarJuegoHandler = (datosDelFormulario) => {

    // Creamos un juego nuevo con los datos del formulario
    const juegoNuevo = {
      ...datosDelFormulario, // Copia el título, portada y estrellas
      id: Math.random().toString() // Le ponemos un ID único (una pegatina)
    };

    // ¡IMPORTANTE! No "empujamos" el juego.
    // Creamos una "lista NUEVA" con el juego nuevo al principio.
    setJuegos((juegosAnteriores) => {
      return [juegoNuevo, ...juegosAnteriores];
    });
  };


  return (
    <div className="App">
      <h1>¡Hola, Gamer! Este es tu GameTracker.</h1>
      <FormularioJuego onAgregarJuego={agregarJuegoHandler} />

      {/* ¡Le pasamos la caja de juegos a la estantería! */}
      <BibliotecaJuegos juegos={juegos} />
    </div>
  );
}

export default App;