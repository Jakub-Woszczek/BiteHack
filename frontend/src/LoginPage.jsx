import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Zaraz stworzymy ten CSS

const LoginPage = ({ handleLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Proste stany formularza
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Symulacja logowania (na Hackathon wystarczy)
    // Tworzymy obiekt użytkownika
    const userData = {
      name: name || "Użytkownik", // Jak nie poda imienia, to "Użytkownik"
      email: email,
      isLoggedIn: true
    };

    // Wywołujemy funkcję logowania z App.jsx
    handleLogin(userData);
    
    // Przekierowujemy na profil
    navigate('/profil');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegistering ? 'ZAREJESTRUJ SIĘ' : 'ZALOGUJ SIĘ'}</h2>
        
        <form onSubmit={onSubmit}>
          {isRegistering && (
            <div className="input-group">
              <label>Imię</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Hasło</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            {isRegistering ? 'ZAŁÓŻ KONTO' : 'ZALOGUJ SIĘ'}
          </button>
        </form>

        <p className="toggle-text">
          {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? ' Zaloguj się' : ' Zarejestruj się'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;