import React, { useState } from 'react'; // ¡Importamos useState!
import './App.css';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import EstadisticaPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import Buscador from './components/Buscador/Buscador';
import ListaResenas from './components/ListaResenas/ListaResenas';
import FormularioResena from './components/FormularioResena/FormularioResena';

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
  
  // Texto Busqueda
  const [busqueda, setBusqueda] = useState('');

  // Guardar las reseñas que escribamos
  const [resenas, setResenas] = useState([]); 

  const agregarJuegoHandler = (datosDelFormulario) => {

    const juegoNuevo = {
      ...datosDelFormulario, 
      id: Math.random().toString()
    };
    
    setJuegos((juegosAnteriores) =>  {
      return [juegoNuevo, ...juegosAnteriores];
    });
  };

  const agregarResenaHandler = (nuevaResena) => {
    setResenas((resenasAnteriores) => {
      return [nuevaResena, ...resenasAnteriores];
    });
  };

  // Maneja la eliminación de un juego por id
  const eliminarJuegoHandler = (id) => {
    setJuegos((juegosAnteriores) => {
      return juegosAnteriores.filter((juego) => juego.id !== id);
    });
  };
//Esta instruccion se ejecuta al apretar el nuevo boton
  const toggleCompletadoHandler = (idDelJuego) => {
    setJuegos((juegosAnteriores) => {
      // Usamos "map" para crear una lista NUEVA
      return juegosAnteriores.map((juego) => {  
        // Si encontramos el juego que queremos cambiar...    
        if (juego.id === idDelJuego) {
          // ...le devolvemos una COPIA, pero con el valor "completado" al reves
          // (Si era "true" -> "false, si era "false" -> "true")
          return { ...juego, completado: !juego.completado };
        }
        // Si no es el juego que buscamos, lo devolvemos tal como estaba.
        return juego;
      });
    });
  };

  const juegosFiltrados = juegos.filter((juego) => {
    // Convertimos todo a minusculas para que "Mario" y "mario" sean iguales
    return juego.titulo.toLowerCase().includes(busqueda.toLowerCase());
  });


  return (
    <div className="App">
      <h1>¡Hola, Gamer! Este es tu GameTracker.</h1>
      {/* Aqui lo ponemos Y le pasamos la "Caja Maestra" */}
        <EstadisticaPersonales juegos={juegos}/>

        <Buscador
        busqueda={busqueda}
        onBuscar={setBusqueda} 
        />

        <FormularioJuego onAgregarJuego={agregarJuegoHandler} />
      {/* ¡Le pasamos la caja de juegos a la estantería! */}
        <BibliotecaJuegos 
        juegos={juegosFiltrados} 
        onEliminarJuego={eliminarJuegoHandler} 
        onToggleCompletado={toggleCompletadoHandler}/>

        {/* --- ZONA DE RESEÑAS --- */}
        {/* 1. El formulario para escribir.
        ¡Le pasamos la lista de "juegos" para que llene el menú desplegable! */}
        <FormularioResena 
        listaJuegos={juegos} 
        onAgregarResena={agregarResenaHandler} 
        />

        <ListaResenas listaDeResenas={resenas} />
        {/* ----------------------- */}
        {/* Cierre del div "App" */}
    </div> 
  );
}

export default App;