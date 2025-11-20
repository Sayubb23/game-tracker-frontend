import React, { useState, useEffect } from 'react';
import './ModalEditar.css';
// Reutilizaremos el CSS del formulario que ya teniamos 
import '../FormularioJuego/FormularioJuego.css';

// 1. Recibimos el "juego" a editar y las funciones "onCerrar" y "onGuardar"
function ModalEditar({ juego, onCerrar, onGuardar }) {

  // 2. Creamos "cajones" (estado) INTERNOS para el formulario
    const [titulo, setTitulo] = useState('');
    const [portada, setPortada] = useState('');
    const [estrellas, setEstrellas] = useState(1);
    const [horas, setHoras] = useState(0);
    const [completado, setCompletado] = useState(false);

    // 3. ¡LA MAGIA! Usamos useEffect para "vigilar" el "juego" que recibimos.
  // Cuando el modal se abre (y recibe un "juego")...
    useEffect(() => {
    // ...¡llenamos los cajones internos con los datos de ese juego!
    if (juego) {
        setTitulo(juego.titulo);
        setPortada(juego.portada);
        setEstrellas(juego.estrellas);
        setHoras(juego.horas);
        setCompletado(juego.completado);
        }
  }, [juego]); // Este efecto se ejecuta CADA VEZ que el "juego" (prop) cambia

  // 4. Función para manejar el guardado
    const manejarGuardado = (e) => {
    e.preventDefault();
    const idReal = juego._id || juego.id;

    const datosEditados = {
      _id: idReal, // Guardamos el ID real en el paquete
      id: idReal,  // (Opcional) Lo ponemos también como 'id' por si acaso
      titulo,
      portada,
      estrellas,
      horas,
      completado
    };
    onGuardar(datosEditados); // Llamamos al "teléfono" de Papá (App.js)
};
// Si no hay juego, no mostramos nada (esto es una seguridad)
    if (!juego) {
    return null;
}

  // 5. El Renderizado
return (
    // El fondo oscuro
    <div className="modal-overlay" onClick={onCerrar}>
      {/* La caja (detenemos la propagación para que el clic aquí NO cierre el modal) */}
        <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-btn-cerrar" onClick={onCerrar}>&times;</button>
        
        {/* Reutilizamos el formulario de "FormularioJuego" */}
        <form className="formulario-juego" onSubmit={manejarGuardado}>
        <h3>✏️ Editando: {juego.titulo}</h3>  
        <div className="form-grupo">
            <label>Título del Juego:</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>

        <div className="form-grupo">
            <label>URL de la Portada:</label>
            <input type="text" value={portada} onChange={(e) => setPortada(e.target.value)} />
            </div>

            <div className="form-grupo">
            <label>Puntuación (Estrellas):</label>
            <input type="number" min="1" max="5" value={estrellas} onChange={(e) => setEstrellas(e.target.value)} />
            </div>
            <div className="form-grupo">
            <label>Horas Jugadas:</label>
            <input type="number" min="0" value={horas} onChange={(e) => setHoras(e.target.value)} />
            </div>

            <div className="form-grupo-check">
            <label>¿Completado?</label>
            <input type="checkbox" checked={completado} onChange={(e) => setCompletado(e.target.checked)} />
            </div>

            <button type="submit" className="btn-agregar">
            Guardar Cambios
            </button>
        </form>
        </div>
    </div>
    );
}

export default ModalEditar;