import React, { useState } from 'react';
import axios from 'axios';
import './styles/login.css';
import CDG from './img/Codegord.png';

// Custom hook para manejar la lógica del formulario
function useLoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3010/authroutes/login', { username, password });
            console.log('Login successful:', response.data);
            onLogin(response.data);
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };

    const handleRegister = async () => {
        // ...
        try {
            const response = await axios.post('http://localhost:3010/authroutes/register', { username, password, email });
            console.log('Registration successful:', response.data);
            onLogin(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Registration failed:', error.response.data);
            } else {
                // Maneja el caso en que error.response no está definido
                console.error('Registration failed:', error.message);
            }
        }
    };
    

    const toggleMode = () => setIsLoginMode(!isLoginMode);

    return {
        username, setUsername,
        password, setPassword,
        email, setEmail,
        confirmPassword, setConfirmPassword,
        isLoginMode, toggleMode,
        handleSubmit: isLoginMode ? handleLogin : handleRegister
    };
}

// Componente del formulario
function LoginForm({ onLogin }) {
    const {
        username, setUsername,
        password, setPassword,
        email, setEmail,
        confirmPassword, setConfirmPassword,
        isLoginMode, toggleMode,
        handleSubmit
    } = useLoginForm({ onLogin });

    return (
        <div className='logincont'>
            <div className='logintitle'>
                <h2>Bienvenido al Gestor Académico CDG</h2>
                <img src={CDG} alt="Logo" />
            </div>
            {
                isLoginMode ? (
                    <form className='iniform' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='Usuario' />
                        </label>
                        <label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Contraseña' />
                        </label>
                        <button type="submit">Ingresar <i className="fa-solid fa-right-to-bracket"></i></button>
                    </form>
                ) : (
                    <form className='regform' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='Nuevo Usuario'  />
                        </label>
                        <label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'  />
                        </label>
                        <label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Contraseña'  />
                        </label>
                        <label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder='Confirmar contraseña'
                            />
                        </label>
                        <button type="submit">Registrese <i className="fa-solid fa-circle-info"></i></button>
                    </form>
                )
            }
            <button type="button" onClick={toggleMode} className='changebutton'>
                {isLoginMode ? 'Registrese' : 'Ingresar'}
            </button>
        </div>
    );
}


export default LoginForm;
