import React from 'react';
import './ModoOscuroToggle.css';

// 1. Recibimos Los "regalos" (props)
function  ModoOscuroToggle({ esModoOscuro, onToggle }) {
    return (
        <div className="toggle-contenedor">
            <span className="icono-sol">☀️</span>

            {/* 2. El interruptor (un checkbox disfrazado) */}
            <label className="toggle-switch">
                <input
                type="checkbox"
                checked={esModoOscuro} // 3. El estado (marcado/desmarcado)
                onChange={onToggle} // 4. La funcion a llamar al hacer clic
                /> 
                <span className="slider round"></span>
            </label>

            <span className="icono-luna">🌙</span>
        </div>
    );
}

export default ModoOscuroToggle;