import React, { useState } from 'react';
import './ListaResenas.css';

function ListaResenas({ listaDeResenas, onEliminar, onEditar }) {
  // Estado local para saber qué reseña se está editando ahora mismo
    const [idEditando, setIdEditando] = useState(null);
    const [textoEditado, setTextoEditado] = useState("");

    const activarEdicion = (resena) => {
        setIdEditando(resena._id || resena.id);
        setTextoEditado(resena.texto);
    };

    const guardarEdicion = (id) => {
        onEditar(id, textoEditado);
        setIdEditando(null); // Dejamos de editar
    };

    return (
        <div className="muro-resenas">
        <h2>💬 Muro de Opiniones</h2>
        <div className="contenedor-notas">
            {listaDeResenas.map((resena) => (
            <div key={resena._id || resena.id} className="nota-resena">
                <h4>{resena.juego}</h4>
                
                {/* Si estamos editando ESTA nota, mostramos un input. Si no, el texto normal */}
                {idEditando === (resena._id || resena.id) ? (
                <textarea 
                    value={textoEditado} 
                    onChange={(e) => setTextoEditado(e.target.value)}
                    className="input-edicion-resena"
                />
                ) : (
                <p>"{resena.texto}"</p>
                )}

                <div className="acciones-resena">
                {idEditando === (resena._id || resena.id) ? (
                    <button onClick={() => guardarEdicion(resena._id || resena.id)}>💾 Guardar</button>
                ) : (
                    <>
                    <button onClick={() => activarEdicion(resena)}>✏️</button>
                    <button onClick={() => onEliminar(resena._id || resena.id)}>🗑️</button>
                    </>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default ListaResenas;