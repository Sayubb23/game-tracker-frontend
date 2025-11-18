import React, { useState, useEffect } from 'react'; // ¡Importamos useState!
import './App.css';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import EstadisticaPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import Buscador from './components/Buscador/Buscador';
import ListaResenas from './components/ListaResenas/ListaResenas';
import FormularioResena from './components/FormularioResena/FormularioResena';
import Ordenador from './components/Ordenador/Ordenador';
import ModoOscuroToggle from './components/ModoOscuroToggle.js/ModoOscuroToggle';
import ModalEditar from './components/ModalEditar/ModalEditar';

// Función para cargar los JUEGOS guardados
const cargarJuegosGuardados = () => {
  const datosGuardados = localStorage.getItem('game-tracker-juegos');
  // Si el cajón NO está vacío...
  if (datosGuardados) {
    console.log('¡Encontré juegos guardados! 😃');
    return JSON.parse(datosGuardados); // ¡Los "des-aplastamos" (parse) y los devolvemos!
  }
  // Si el cajón está vacío, empezamos con una lista vacía.
  console.log('No había juegos guardados. Empezando de cero.');
  return []; 
};

// Función para cargar las RESEÑAS guardadas
const cargarResenasGuardadas = () => {
  const datosGuardados = localStorage.getItem('game-tracker-resenas');
  if (datosGuardados) {
    return JSON.parse(datosGuardados);
  }
  return []; // Empezamos con una lista vacía
};

function App() {
  // ¡La Caja Maestra!
  const [juegos, setJuegos] = useState(cargarJuegosGuardados());
  
  // Texto Busqueda
  const [busqueda, setBusqueda] = useState('');

  // Guardar las reseñas que escribamos
  const [resenas, setResenas] = useState(cargarResenasGuardadas()); 

  const [tipoOrden, setTipOrden] = useState('titulo');

  // Un cajon para sabaer si el modo oscuro esta encendido o apagado
  const [esModoOscuro, setEsModooscuro] = useState(false);

  // Un cajon para guardar el JUEGO que se esta editando
  // Si es "null", el modal esta cerrado.
  const [juegoAEditar, setJuegosAEditar] = useState(null);

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

  // Esta funcion recibe el ID del juego de la tarjeta
  const abrirModalEditarHandler = (idDelJuego) => {
    // 1. Buscamos el juego completo en nuestra lista "juegos"
    const juegoEncontrado = juegos.find((juego) => juego.id === idDelJuego);
    // 2. Lo ponemos en el "cajon"
    setJuegosAEditar(juegoEncontrado);
  };

// Función para CERRAR el modal (fácil, solo vaciamos el cajón)
const cerrarModalHandler = () => {
  setJuegosAEditar(null);
};

// Función para GUARDAR los cambios del modal
const guardarCambiosHandler = (datosEditados) => {
  // Usamos "setJuegos" para actualizar la lista
  setJuegos((juegosAnteriores) => {

    // Usamos .map() para crear una lista nueva
    return juegosAnteriores.map((juego) => {
      // Si encontramos el juego que queremos editar...
      if (juego.id === datosEditados.id) {
        // ...¡lo reemplazamos con los "datosEditados" que vienen del modal!
        return datosEditados;
      }
      // Si no es, lo devolvemos como estaba
      return juego;
    });
  });

  // ¡Importante! Cerramos el modal después de guardar
  setJuegosAEditar(null);
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

// --- EFECTOS DE GUARDADO AUTOMATICO ---
// Este "espia" vigila la lista [juegos]
useEffect(() => {
  // Cuando [juegos] cambia, ejecutamos esto:
  console.log('Espia: La lista de juegos cambio. Guardando en el cajón...');
  // Guardamos la lista convertida a texto en el "cajón secreto".
  localStorage.setItem('game-tracker-juegos', JSON.stringify(juegos));
}, [juegos]); // El [juegos] al final significa: "Solo ejecutate si 'juegos' cambia"

// Este "espia" vigila la lista [reseñas]
useEffect(() =>  {
  console.log('Espia: Las reseñas cambiaron. Guardando...');
  localStorage.setItem('game-tracker-resenas', JSON.stringify(resenas));
}, [resenas]); // Solo se ejecuta si 'reseñas' cambia 

// --- BLOQUE MÁGICO: FILTRADO Y ORDENAMIENTO ---

// 1. Primero Filtramos (igual que antes)
  let juegosAProcesar = juegos.filter((juegos) => {
    return juegos.titulo.toLowerCase().includes(busqueda.toLowerCase())
  });

// 2. Después Ordenamos la lista filtrada
  // Usamos ".sort()", que compara pares de juegos (a y b)
  juegosAProcesar.sort((a, b) => {
    if (tipoOrden === 'titulo') {
      // Orden A-Z: Compara letras
      return a.titulo.localeCompare(b.titulo);
    }
    else if (tipoOrden === 'estrellas') {
      // Mayor a menor Estrellas: Restamos b - a 
      return b.estrellas - a.estrellas;
    }
    else if (tipoOrden === 'hora') {
      // Mayor a Menor horas: Restamos b - a 
      return Number(b.horas) - Number(a.horas);
    }

    return 0; // Si no hay orden, no muevas nada
  });

  return (
    <div className="App">
      
      {/* Encabezado */}
      <header className="app-header">
        <h1>¡Hola, Gamer! Este es tu GameTracker.</h1>
        <ModoOscuroToggle 
        esModoOscuro={esModoOscuro}
        onToggle={() => setEsModooscuro(!esModoOscuro)} // La magia para "darle la vuelta" 
        />
      </header>
      
      {/* Aqui lo ponemos Y le pasamos la "Caja Maestra" */}
        <EstadisticaPersonales juegos={juegos}/>

        <Buscador
        busqueda={busqueda}
        onBuscar={setBusqueda} 
        />

        <Ordenador 
        ordenActual={tipoOrden}
        onOrdenCambio={setTipOrden}/>

      {/* --- ¡AQUÍ EMPIEZA LA MAGIA DEL LAYOUT! --- */}
      {/* 1. Creamos un contenedor principal para las columnas */}
      <div className="app-layout">
        {/* 2. Caja de "Barra Laterla Izquierda" */}
        <div className="layout-sidebar">
          <FormularioJuego onAgregarJuego={agregarJuegoHandler} />
           {/* --- ZONA DE RESEÑAS --- */}
        {/* 1. El formulario para escribir.
        ¡Le pasamos la lista de "juegos" para que llene el menú desplegable! */}
          <FormularioResena 
          listaJuegos={juegos} 
          onAgregarResena={agregarResenaHandler} 
          />
        </div>
        {/* 3. Caja de "Contenido Principal Derecho" */}
        <div clasName="layout-main">
          {/* La estanteria va aqui */}
          {/* ¡Le pasamos la caja de juegos a la estantería! */}
          <BibliotecaJuegos 
          juegos={juegosAProcesar} 
          onEliminarJuego={eliminarJuegoHandler} 
          onToggleCompletado={toggleCompletadoHandler}
          onAbrirModalEditar={abrirModalEditarHandler} />
          <ListaResenas listaDeResenas={resenas} />
          {/* ----------------------- */}
          {/* Cierre del div "App" */}
        </div>
      </div> {/* Fin de .app-layout */}
      {/* --- ¡AQUÍ RENDERIZAMOS EL MODAL! --- */}
        {/* Esto es un "renderizado condicional".
          Le decimos a React: Si "juegoAEditar" NO es "null" (&&)...
          ...¡entonces dibuja el componente ModalEditar!
        */}
        {juegoAEditar && (
          <ModalEditar 
            juego={juegoAEditar}         // 1. Pasa el juego que queremos editar
            onCerrar={cerrarModalHandler}  // 2. Pasa la función de cerrar
            onGuardar={guardarCambiosHandler} // 3. Pasa la función de guardar
          />
        )}
    </div> 
  );
}

export default App;