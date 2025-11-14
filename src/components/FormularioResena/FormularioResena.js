import React, { useState } from 'react';
import './FormularioResena.css';

// Recibimos "listaJuegos" para poder elegir el juego en un menu
function FormularioResena({ listaJuegos, onAgregarResena }) {

    const [juegoSeleccionado, setJuegoSeleccionado] = useState('');
    const [texto, setTexto] = useState('');

    const enviarResena = (e) => {
        e.preventDefault();
        // Solo enviamos si eligio un juego y escribio algo
        if (juegoSeleccionado && texto) {
            onAgregarResena({ juego: juegoSeleccionado, texto: texto });
            setTexto(''); // Limpiamos el texto
            setJuegoSeleccionado(''); // Limpiamos la seleccion
        }
    }

    return (
        <form className="form-resena" onSubmit={enviarResena}>
            <h3>Escribe una Reseña</h3>
            {/* Menu desplegable para elegir el juego */}
            <select 
            value={juegoSeleccionado}
            onChange={(e) => setJuegoSeleccionado(e.target.value)} 
            className="input-resena">
                <option value="">Elige un juego para reseñar</option>
                {/* Por cada juego que tienes, creamos una opcion en el menu */}
                {listaJuegos.map((juego) => (
                    <option key={juego.id} value={juego.titulo}> {juego.titulo} </option>
                ))}
            </select>
            {/* Caja grande para escribir la opinion */}
            <textarea 
            placeholder="¿Que te parecio el juego? Cuentanos"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="input-resena area-texto"/> 

            <button type="submit" className="btn-resena">Publicar Opinion</button>
        </form>
    );
}

export default FormularioResena;