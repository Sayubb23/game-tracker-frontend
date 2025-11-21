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

function App() {
  // ¡La Caja Maestra!
  const [juegos, setJuegos] = useState([]);
  
  // Texto Busqueda
  const [busqueda, setBusqueda] = useState('');

  // Guardar las reseñas que escribamos
  const [resenas, setResenas] = useState([]); 

  const [tipoOrden, setTipOrden] = useState('titulo');

  // Un cajon para sabaer si el modo oscuro esta encendido o apagado
  const [esModoOscuro, setEsModooscuro] = useState(false);

  // Un cajon para guardar el JUEGO que se esta editando
  // Si es "null", el modal esta cerrado.
  const [juegoAEditar, setJuegoAEditar] = useState(null);

// CONEXIÓN CON EL BACKEND 
  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        console.log('📡 Conectando con la cocina (Backend)...');
        // Llamamos al mesero
        const respuesta = await fetch('http://localhost:4000/api/juegos');
        const juegosTraidos = await respuesta.json();
        
        // Guardamos lo que trajo en el estado
        setJuegos(juegosTraidos);
        console.log('✅ ¡Juegos recibidos:', juegosTraidos);
      } catch (error) {
        console.error('❌ Error al conectar con el backend:', error);
      }
    };
    obtenerJuegos();
  }, []); // Se ejecuta solo una vez al inicio
    
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // 1. Cargar Juegos
        const respJuegos = await fetch('http://localhost:4000/api/juegos');
        const juegosData = await respJuegos.json();
        setJuegos(juegosData);

        // 2. Cargar Reseñas 
        const respResenas = await fetch('http://localhost:4000/api/resenas');
        const resenasData = await respResenas.json();
        setResenas(resenasData); // Guardamos las reseñas de la nube
        
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    };
    obtenerDatos();
  }, []);

useEffect(() => {
  document.body.classList.remove('modo-claro', 'modo-oscuro');
  if (esModoOscuro) document.body.classList.add('modo-oscuro');
  else document.body.classList.add('modo-claro');
  localStorage.setItem('game-tracker-modoOscuro', esModoOscuro);
}, [esModoOscuro]);

// Funcion para AGREGAR un juego (POST al Backend)
const agregarJuegoHandler = async (datosDelFormulario) => {
  try{
    const nuevoJuego = {
      ...datosDelFormulario
    };

    // Enviamos el paquete al Backend
    const respuesta = await fetch('http://localhost:4000/api/juegos', {
      method: 'POST', // Metodo para CREAR 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoJuego)
    });

    // Si el Backend responde que todo va bien
    if (respuesta.ok) {
      const juegoGuardado = await respuesta.json();
      console.log('Juego Guardado en la nube:', juegoGuardado);

      // Actualizamos la pantalla
      setJuegos((prev) => [juegoGuardado, ...prev]);
    } else {
      console.error('Error al guardar en el backend');
    }
  } catch (error) {
    console.error(' Error de conexión:', error);
  }
};

const agregarResenaHandler = async (nuevaResena) => {
    try {
      // Enviamos al Backend
      const respuesta = await fetch('http://localhost:4000/api/resenas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaResena)
      });

      if (respuesta.ok) {
        const resenaGuardada = await respuesta.json();
        // Actualizamos la pantalla
        setResenas((prev) => [resenaGuardada, ...prev]);
      }
    } catch (error) {
      console.error('Error al guardar reseña:', error);
    }
  };

// Funcion para ELIMINAR (DELETE al Backend)
const eliminarJuegoHandler = async (idDelJuego) => {
  try {
    // Se llama al backend por medio del metodo DELETE
    const respuesta = await fetch(`http://localhost:4000/api/juegos/${idDelJuego}`, {
      method: 'DELETE',
    });

    // Si el backend nos dice "OK, borrado"...
    if (respuesta.ok) {
      console.log('🗑️ Juego eliminado de la nube');

      // Actualizamos la pantalla
      // Usamos "_id" porque Mongo usa guion bajo, pero nuestro front usaba "id"
      setJuegos((prev) => prev.filter((juego) => (juego._id || juego.id) !== idDelJuego));
    } else {
      console.error('Error al eliminar en el backend');
    }
  } catch (error) {
    console.error(' Error de conexión', error);
  }
};

  // Esta funcion recibe el ID del juego de la tarjeta
  const abrirModalEditarHandler = (idDelJuego) => {
    // 1. Buscamos el juego completo en nuestra lista "juegos"
    const juegoEncontrado = juegos.find((juego) => (juego._id || juego.id) === idDelJuego);
    // 2. Lo ponemos en el "cajon"
    setJuegoAEditar(juegoEncontrado);
  };

// Función para CERRAR el modal (fácil, solo vaciamos el cajón)
const cerrarModalHandler = () => {
  setJuegoAEditar(null);
};

// Función para GUARDAR EDICIÓN TOTAL (PUT al Backend)
  const guardarCambiosHandler = async (datosEditados) => {
    try {
      // Mongo usa "_id", pero a veces el front tiene "id". Usamos el que exista.
      const id = datosEditados._id || datosEditados.id;

      const respuesta = await fetch(`http://localhost:4000/api/juegos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEditados)
      });

      if (respuesta.ok) {
        const juegoFinal = await respuesta.json();
        console.log('✏️ Juego editado en la nube:', juegoFinal);

        // Actualizamos la lista visual
        setJuegos((prev) => prev.map((juego) => {
          if ((juego._id || juego.id) === id) {
            return juegoFinal;
          }
          return juego;
        }));

        // Cerramos el modal
        setJuegoAEditar(null);
      }
    } catch (error) {
      console.error('❌ Error al guardar edición:', error);
    }
  };

// Funcion para cambiar COMPLETADO (PUT al Backend)
const toggleCompletadoHandler = async (idDelJuego) => {
  // Buscamos el juego en nuestra lista actual para saber como esta
  const juegoActual = juegos.find((j) => (j._id || j.id) === idDelJuego);
  if (!juegoActual) return; 
  
  const nuevoEstado = !juegoActual.completado;

  try {
    // Enviamos SOLO el cambio al backend
    const respuesta = await fetch(`http://localhost:4000/api/juegos/${idDelJuego}`, {
      method: 'PUT', // Metodo para EDITAR
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completado: nuevoEstado }) // Enviamos unicamnete lo que cambio
    });

    if (respuesta.ok) {
      const juegoActualizado = await respuesta.json();
      console.log(' Estado actualizado en la nube:', juegoActualizado);

      // Actualizamos la pantalla
      setJuegos((prev) => prev.map((juego) => {
        if((juego._id || juego.id) === idDelJuego) {
          return juegoActualizado; // Remplazamos con lo que devolvio el backend
        }
        return juego;
      }));
    }
  } catch (error) {
    console.error('Error al actualizar estado:', error);
  }
};

  const eliminarResenaHandler = async (idResena) => {
    try {
      const resp = await fetch(`http://localhost:4000/api/resenas/${idResena}`, { method: 'DELETE' });
      if (resp.ok) {
        setResenas((prev) => prev.filter((r) => (r._id || r.id) !== idResena));
      }
    } catch (error) { console.error(error); }
  };

  const editarResenaHandler = async (idResena, nuevoTexto) => {
    try {
      const resp = await fetch(`http://localhost:4000/api/resenas/${idResena}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: nuevoTexto })
      });
      if (resp.ok) {
        const resenaActualizada = await resp.json();
        setResenas((prev) => prev.map((r) => 
          (r._id || r.id) === idResena ? resenaActualizada : r
        ));
      }
    } catch (error) { console.error(error); }
  };

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
        <h1>¡Hola, Gamer! Este es tu GameTracker de confianza.</h1>
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
        <div className="layout-main">
          {/* La estanteria va aqui */}
          {/* ¡Le pasamos la caja de juegos a la estantería! */}
          <BibliotecaJuegos 
          juegos={juegosAProcesar} 
          onEliminarJuego={eliminarJuegoHandler} 
          onToggleCompletado={toggleCompletadoHandler}
          onAbrirModalEditar={abrirModalEditarHandler} />
          <ListaResenas 
          listaDeResenas={resenas} 
          onEliminar={eliminarResenaHandler}
          onEditar={editarResenaHandler} />
          {/* ----------------------- */}
          {/* Cierre del div "App" */}
        </div>
      </div> {/* Fin de .app-layout */}
      {/* --- ¡AQUÍ RENDERIZAMOS EL MODAL! --- */}
        {/* Esto es un "renderizado condicional".
          Le decimos a React: Si "juegoAEditar" NO es "null" (&&)
          entonces dibuja el componente ModalEditar
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