import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './login';
import Nav from './components/nav';
import Content from './components/content';
import './App.css';
import 'animate.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeContent, setActiveContent] = useState('Home'); // Estado para rastrear el contenido activo

  const loginSuccess = (userData) => {
    setIsLoggedIn(true);
  };

  const handleButtonClick = (contentName) => { // Función para actualizar el contenido activo
    setActiveContent(contentName);
  };


  const logout = () => { // Función para manejar el logout
    fetch('/auth/logout', { method: 'GET' })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(false); // Actualizar el estado para reflejar que el usuario no está logueado
          window.location.href = '/'; // Redirigir al inicio de sesión
        } else {
          throw new Error('Failed to log out');
        }
      })
      .catch(error => console.error('Error:', error));
  };



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/home" /> : <LoginForm onLogin={loginSuccess} />} />
        <Route path="/home" element={isLoggedIn ? (
          <>
            <Nav onButtonClick={handleButtonClick}  onLogout={logout} /> {/* Pasar la función a Nav */}
            <Content activeContent={activeContent} /> {/* Pasar el estado a Content */}
          </>
        ) : <Navigate replace to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;


