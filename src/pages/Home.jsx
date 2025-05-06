import { useEffect, useState } from 'react';
import './Home.css';
import Card from '../components/Card';

const Home = () => {
    const [visitas, setVisitas] = useState([]);
    const [form, setForm] = useState({ name: '', motivo: '', fecha: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    let user = JSON.parse(localStorage.getItem('user'));

    // Obtener las visitas al cargar el componente
    useEffect(() => {
        const fetchVisitas = async () => {
            try {
                const res = await fetch('https://prueba-fake-api.onrender.com/visit');
                if (!res.ok) throw new Error('Error al obtener las visitas');
                const data = await res.json();
                setVisitas(data);
            } catch (error) {
                console.log(error);
                setError('No se pudieron cargar las visitas');
            }
        };
        fetchVisitas();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crear una nueva cita
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const nuevaVisita = {
                ...form,
                userId: user?.id || '',
            };
            const res = await fetch('https://prueba-fake-api.onrender.com/visit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaVisita),
            });
            if (!res.ok) throw new Error('Error al crear la cita');
            const visitaCreada = await res.json();
            setVisitas([...visitas, visitaCreada]);
            setForm({ name: '', motivo: '', fecha: '' });
        } catch (error) {
            setError('No se pudo crear la cita');
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Panel de Usuario</h1>
            <p>Bienvenido {user?.name || user?.username}</p>

            <button
                className="button-universal logout-button"
                onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }}
            >
                Cerrar Sesión
            </button>

            <section>
                <h2>Tus citas</h2>
                {error && <p className="error">{error}</p>}
                <div className="cards-container">
                    {visitas.filter(v => v.userId === user?.id).length === 0 ? (
                        <p>No hay citas registradas.</p>
                    ) : (
                        visitas
                            .filter(v => v.userId === user?.id)
                            .map((v) => <Card key={v.id} visita={v} />)
                    )}
                </div>
            </section>

            <section>
                <h2>Crear nueva cita</h2>
                <form onSubmit={handleSubmit} className="form-cita">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="motivo"
                        placeholder="Motivo"
                        value={form.motivo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="button-universal"
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear cita'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Home;