import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isLogin) {
                // Si el email contiene "admin", valida contra el endpoint de admin
                if (formData.email.toLowerCase().includes('admin')) {
                    try {
                        const adminResponse = await fetch('https://prueba-fake-api.onrender.com/admin')
                        if (!adminResponse.ok) {
                            throw new Error('Error al conectar con el servidor de administrador')
                        }
                        const admins = await adminResponse.json()
                        // Compara el input email con username y la contraseña
                        const admin = admins.find(a => 
                            a.username === formData.email && 
                            a.password === formData.password
                        )
                        if (admin) {
                            localStorage.setItem('user', JSON.stringify({
                                ...admin,
                                role: 'admin'
                            }))
                            navigate('/admin')
                            return
                        } else {
                            setError('Credenciales de administrador incorrectas')
                            setLoading(false)
                            return
                        }
                    } catch (adminError) {
                        console.error('Error al verificar administrador:', adminError)
                        setError('Error al verificar credenciales de administrador')
                        setLoading(false)
                        return
                    }
                }
                // Si no es admin, valida contra el endpoint de visitante
                const visitorResponse = await fetch('https://prueba-fake-api.onrender.com/visitor', {
                    method: 'GET'
                })
                if (!visitorResponse.ok) {
                    throw new Error('Error al conectar con el servidor')
                }
                const visitors = await visitorResponse.json()
                // Para visitantes, puede ser username o email
                const visitor = visitors.find(v => 
                    (v.email === formData.email || v.username === formData.email) && 
                    v.password === formData.password
                )
                if (visitor) {
                    localStorage.setItem('user', JSON.stringify({
                        ...visitor,
                        role: 'visitor'
                    }))
                    navigate('/home')
                } else {
                    setError('Credenciales incorrectas')
                }
            } else {
                // Validar que las contraseñas coincidan
                if (formData.password !== formData.confirmPassword) {
                    setError('Las contraseñas no coinciden')
                    setLoading(false)
                    return
                }
                
                // Proceso de registro (siempre como visitante)
                const newUser = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
                
                const response = await fetch('https://prueba-fake-api.onrender.com/visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                
                if (!response.ok) {
                    throw new Error('Error al registrar usuario')
                }
                
                // Registro exitoso, cambiar a modo login
                setIsLogin(true)
                setFormData({
                    name: '',
                    email: formData.email,
                    password: '',
                    confirmPassword: ''
                })
                alert('Registro exitoso. Por favor inicia sesión.')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('Error de conexión: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin)
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    return (
        <div className="form-container">
            <div className="form-box fade-in">
                <h2 className="form-title">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-field">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required={!isLogin}
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className="input-field">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-field">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required={!isLogin}
                                placeholder="Confirmar Contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    <Button 
                        type="submit" 
                        disabled={loading}
                        variant="primary"
                    >
                        {loading 
                            ? 'Procesando...' 
                            : isLogin ? 'Iniciar Sesión' : 'Registrarse'
                        }
                    </Button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                            <Button
                                type="button"
                                onClick={toggleForm}
                                disabled={loading}
                                variant="secondary"
                            >
                                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login