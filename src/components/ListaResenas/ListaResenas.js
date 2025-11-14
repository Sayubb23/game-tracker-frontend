import React from 'react';
import './ListaResenas.css';

function ListaResenas({ listaDeResenas }) {
    return (
        <div className="muro-resenas">
            <h2> Muro de Opiniones </h2>

            {/* Si no hay reseñas, mostramos un mensaje*/}
            {listaDeResenas.length === 0 ? (
                <p>No hay reseñas aun. Se el primero en opinar</p>

            ) : (
                <div className="contenedor-notas">
                    {listaDeResenas.map((resena, index) => (
                        <div key={index} className="nota-resena">
                            <h4>Sobre: {resena.juego} </h4>
                            <p>"{resena.texto}"</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaResenas;