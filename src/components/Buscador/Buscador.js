import React from 'react';
import './Buscador.css';

function Buscador({ busqueda, onBuscar }) {
    return (
        <div className="buscador-contenedor">
            <span className="icono-lupa">🔍</span>
            <input type="text" 
            placeholder="Buscar juego por nombre..." 
            value={busqueda} // Cada vez que escribes, avisamos a Papa (App.js) inmediatamente 
            onChange= {(e) => onBuscar(e.target.value)}
        />         
        </div>
    );
}

export default Buscador;
