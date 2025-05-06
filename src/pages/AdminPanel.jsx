import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const AdminPanel = () => {
    const [adminData, setAdminData] = useState([]);
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingVisitas, setLoadingVisitas] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch('https://prueba-fake-api.onrender.com/admin');
                if (!response.ok) {
                    throw new Error('Error al obtener datos de administrador');
                }
                const data = await response.json();
                setAdminData(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchVisitas = async () => {
            try {
                const res = await fetch('https://prueba-fake-api.onrender.com/visit');
                if (!res.ok) throw new Error('Error al obtener las visitas');
                const data = await res.json();
                setVisitas(data);
            } catch (err) {
                setError('No se pudieron cargar las visitas');
            } finally {
                setLoadingVisitas(false);
            }
        };

        fetchAdminData();
        fetchVisitas();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Fichar salida
    const handleSalida = async (id) => {
        const now = new Date();
        const horaSalida = now.toLocaleTimeString();
        try {
            const res = await fetch(`https://prueba-fake-api.onrender.com/visit/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ horaSalida }),
            });
            if (!res.ok) throw new Error('Error al fichar salida');
            setVisitas(visitas.map(v => v.id === id ? { ...v, horaSalida } : v));
        } catch (err) {
            setError('No se pudo fichar la salida');
        }
    };

    // Cancelar visita
    const handleCancelar = async (id) => {
        try {
            const res = await fetch(`https://prueba-fake-api.onrender.com/visit/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Error al cancelar la visita');
            setVisitas(visitas.filter(v => v.id !== id));
        } catch (err) {
            setError('No se pudo cancelar la visita');
        }
    };

    return (
        <div className="admin-panel">
            <h1>Panel de Administración</h1>
            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <div className="admin-content">
                    <h2>Datos de Administrador</h2>
                    <div className="admin-data">
                        {adminData.length > 0 ? (
                            <ul>
                                {adminData.map((item, index) => (
                                    <li key={index}>
                                        <strong>ID:</strong> {item.id} | 
                                        <strong>Nombre:</strong> {item.name} | 
                                        <strong>Email:</strong> {item.email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay datos disponibles</p>
                        )}
                    </div>
                </div>
            )}

            <h2>Visitas registradas</h2>
            {error && <p className="error">{error}</p>}
            {loadingVisitas ? (
                <p>Cargando visitas...</p>
            ) : (
                <div className="cards-container">
                    {visitas.length === 0 ? (
                        <p>No hay visitas registradas.</p>
                    ) : (
                        visitas.map((visita) => (
                            <div key={visita.id} className="card">
                                <Card visita={visita} />
                                {!visita.horaSalida && (
                                    <Button
                                        onClick={() => handleSalida(visita.id)}
                                        variant="primary"
                                        className="salida-btn"
                                    >
                                        Fichar salida
                                    </Button>
                                )}
                                <Button
                                    onClick={() => handleCancelar(visita.id)}
                                    variant="secondary"
                                    className="cancelar-btn"
                                >
                                    Cancelar
                                </Button>
                                {visita.horaSalida && (
                                    <p>Hora de salida: {visita.horaSalida}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            <Button 
                onClick={handleLogout}
                variant="primary"
                className="logout-button"
            >
                Cerrar Sesión
            </Button>
        </div>
    );
};

export default AdminPanel;