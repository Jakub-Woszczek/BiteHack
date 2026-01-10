import React from 'react';
import './Header.css';
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Dodajemy prop 'user'
const Header = ({ cartCount, wishlistCount, user }) => {
  const menuItems = [
    { id: 1, label: 'Sklep', path: '/shop', isSpecial: true },
    { id: 2, label: 'Rezerwacje', path: '/kategoria/title-2' },
    { id: 3, label: 'O nas', path: '/kategoria/title-3' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'black' }}>
          LOGO_FIRMY
        </Link>
        <nav>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link 
                  to={item.path} 
                  className={item.isSpecial ? 'link-special' : 'link-regular'}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Szukaj..." />
          <FiSearch className="search-icon" />
        </div>

        <div className="user-actions">
          
          {/* --- IKONA UŻYTKOWNIKA (LOGIKA) --- */}
          <div className="icon-wrapper">
            {/* Jeśli user istnieje -> idź do profilu, jeśli nie -> idź do logowania */}
            <Link to={user ? "/profil" : "/logowanie"}>
              <FiUser className="icon" />
            </Link>
            
            {/* Jeśli user jest zalogowany -> pokaż zieloną kropkę "Online" */}
            {user && <span className="badge-online"></span>}
          </div>

          <div className="icon-wrapper">
             <Link to="/ulubione">
               <FiHeart className="icon" />
             </Link>
             {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </div>

          <div className="icon-wrapper">
            <Link to="/koszyk">
                <FiShoppingBag className="icon" />
            </Link>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;