import React from 'react';
import './Ordenador.css';

function Ordenador({ onOrdenCambio, ordenActual }) {
    return (
        <div className="ordenador-contenedor">
            <span>Ordenar por:</span>

            {/* Boton 1: Alfabeticamente*/}
            <button 
                className={ordenActual === 'titulo' ? 'activo' : ''}
                onClick={() => onOrdenCambio('titulo')}>
                Nombre (A-Z) 
            </button>

            {/* Boton 2: Por Estrellas */}
            <button
                className={ordenActual === 'estrellas' ? 'activo' : ''}
                onClick={() => onOrdenCambio('estrellas')}>
                Mejor Calificados
            </button>
            
            {/* Botón 3: Por Horas */}
            <button
            className={ordenActual === 'horas' ? 'activo' : ''}
            onClick={() => onOrdenCambio('horas')}
            >
            Mas jugados 
            </button>
        </div>
    );
}

export default Ordenador;