import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Użyjemy tych samych stylów

const ProfilePage = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/'); // Po wylogowaniu wracamy na główną
  };

  // Zabezpieczenie: jak ktoś wejdzie tu wpisując adres z palca, a nie jest zalogowany
  if (!user) {
    return (
      <div className="auth-container">
        <h2>Nie jesteś zalogowany.</h2>
        <button className="auth-btn" onClick={() => navigate('/logowanie')}>
          Przejdź do logowania
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Witaj, {user.name}!</h1>
        <p>To jest Twój panel klienta.</p>
      </div>

      <div className="profile-content">
        {/* Sekcja Danych */}
        <div className="profile-card">
          <h3>Twoje Dane</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> Aktywny</p>
          <button className="logout-btn" onClick={onLogout}>WYLOGUJ SIĘ</button>
        </div>

        {/* Sekcja Zamówień (Placeholder) */}
        <div className="profile-card">
          <h3>Ostatnie Zamówienia</h3>
          <ul className="orders-list">
            <li>
              <span>Zamówienie #12345</span>
              <span className="status-done">Zrealizowane</span>
            </li>
            <li>
              <span>Zamówienie #12348</span>
              <span className="status-pending">W trakcie</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;