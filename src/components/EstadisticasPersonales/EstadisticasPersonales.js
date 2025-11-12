import React from 'react';
import './EstadisticasPersonales.css'; // Conectamos las pinturas

// 1. Recibimos la "Caja Maestra" (La lista de juegos) como un regalo
function EstadisticasPersonales({ juegos }) {


    const totalHoras = juegos.reduce(
        (total, juego) => total + Number(juego.horas), 
        0 // Empezamos la suma en 0 
    );
// usamos ".filter()" (un colador) para contar solo los completos.
    const totalCompletados = juegos.filter(
        (juego) => juego.completado === true
    ).length; // .legth nos da el numero de juegos que pasaron el colador 
    
    return (
        <div className='estadisticas-contenedor'>
            <h3> Mi Salon de Trofeos </h3>

            <div className='stats-lista'>
                {/* 3. Mostramos los resultado */}
            <div className='stat-item'>
                <p>Juegos Totales:</p>
                <span> {juegos.length} </span> {/* El numero de juegos en la lista*/ }
            </div>

            <div className='stat-item'>
                <p>Juegos Completados:</p>
                <span> {totalCompletados} </span>
            </div>

            <div className='stat-item'>
                <p>Horas de juego Totales:</p>
                <span> {totalHoras}h </span>
            </div>
        </div>
    </div>
    );
}

export default EstadisticasPersonales;
