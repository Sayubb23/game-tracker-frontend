import React, { useState } from 'react'; // ¡Importamos useState!
import './App.css';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import EstadisticaPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';


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
  
  const agregarJuegoHandler = (datosDelFormulario) => {

    const juegoNuevo = {
      ...datosDelFormulario, 
      id: Math.random().toString()
    };


    setJuegos((juegosAnteriores) =>  {
      return [juegoNuevo, ...juegosAnteriores];
    });
  };

  // Maneja la eliminación de un juego por id
  const eliminarJuegoHandler = (id) => {
    setJuegos((juegosAnteriores) => {
      return juegosAnteriores.filter((juego) => juego.id !== id);
    });
  };

  return (
    <div className="App">
      <h1>¡Hola, Gamer! Este es tu GameTracker.</h1>
      {/* Aqui lo ponemos Y le pasamos la "Caja Maestra" */}
        <EstadisticaPersonales juegos={juegos}/>
        <FormularioJuego onAgregarJuego={agregarJuegoHandler} />
      {/* ¡Le pasamos la caja de juegos a la estantería! */}
  <BibliotecaJuegos juegos={juegos} onEliminarJuego={eliminarJuegoHandler} />
    </div>
  );
}

export default App;