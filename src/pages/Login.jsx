import { useState } from 'react'
import './Login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            console.log('Datos de login:', {
                email: formData.email,
                password: formData.password
            })
        } else {
            console.log('Datos de registro:', formData)
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
                            type="email"
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

                    <button type="submit" className="submit-button">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="toggle-form-button"
                            >
                                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login