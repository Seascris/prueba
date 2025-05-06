import React, { useState } from 'react';

const Card = ({ visita }) => {
    const [horaSalida, setHoraSalida] = useState(null);

    const handleSalida = () => {
        const now = new Date();
        const hora = now.toLocaleTimeString();
        setHoraSalida(hora);
        // Si quieres enviar la hora de salida a la API, aquí puedes hacer un fetch PATCH/PUT
    };

    return (
        <div className="card">
            <h3>Visita de: {visita.name || visita.username}</h3>
            {visita.email && <p>Email: {visita.email}</p>}
            {visita.fecha && <p>Fecha: {visita.fecha}</p>}
            {visita.motivo && <p>Motivo: {visita.motivo}</p>}
            <p>ID: {visita.id}</p>
            {horaSalida ? (
                <p>Hora de salida: {horaSalida}</p>
            ) : (
                <button onClick={handleSalida}>Salida</button>
            )}
        </div>
    );
};

export default Card;