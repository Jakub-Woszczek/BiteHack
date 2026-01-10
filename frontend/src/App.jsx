import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Header from './Header';
import ProductGrid from './ProductGrid';
import CartPage from './CartPage';
import WishlistPage from './WishlistPage';
import LoginPage from './LoginPage';     // <--- NOWY IMPORT
import ProfilePage from './ProfilePage'; // <--- NOWY IMPORT
import productImg from "./assets/product.png"; 

// --- Strony ---
const HomePage = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Witamy w LOKALNYM BIZNESIE</h1>
    <p>Sprawdź naszą ofertę w zakładce SKLEP.</p>
  </div>
);

const CategoryPage = () => {
  const { nazwaKategorii } = useParams();
  return (
    <div style={{ padding: '20px' }}>
      <h1>Kategoria: {nazwaKategorii}</h1>
      <ProductGrid categorySlug={nazwaKategorii} />
    </div>
  );
};

const ShopPage = () => (
  <div>
    <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Pełna Oferta</h2>
    <ProductGrid />
  </div>
);

function App() {
  
  // 1. DANE (Koszyk, Ulubione, Rabat - bez zmian)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("myCart");
    return saved ? JSON.parse(saved) : [{ id: 1, title: "Koszulka Sportowa", price: 99.00, image: productImg, quantity: 1 }];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("myWishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [discountRate, setDiscountRate] = useState(() => {
    const saved = localStorage.getItem("myDiscount");
    return saved ? JSON.parse(saved) : 0;
  });

  // 2. STAN UŻYTKOWNIKA (NOWOŚĆ)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("myUser");
    return savedUser ? JSON.parse(savedUser) : null; // null oznacza "niezalogowany"
  });

  // --- EFEKTY ---
  useEffect(() => localStorage.setItem("myCart", JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem("myDiscount", JSON.stringify(discountRate)), [discountRate]);
  useEffect(() => localStorage.setItem("myWishlist", JSON.stringify(wishlistItems)), [wishlistItems]);
  
  // Zapisujemy usera do pamięci
  useEffect(() => {
    if (user) {
      localStorage.setItem("myUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("myUser"); // Usuwamy z pamięci jak wyloguje
    }
  }, [user]);

  // --- FUNKCJE ---
  const removeFromCart = (id) => setCartItems(p => p.filter(i => i.id !== id));
  const updateQuantity = (id, q) => q >= 1 && setCartItems(p => p.map(i => i.id === id ? { ...i, quantity: q } : i));
  const removeFromWishlist = (id) => setWishlistItems(p => p.filter(i => i.id !== id));

  // Funkcje logowania/wylogowania
  const handleLogin = (userData) => {
    setUser(userData); // Ustawiamy usera
  };

  const handleLogout = () => {
    setUser(null); // Czyścimy usera
    setDiscountRate(0); // Opcjonalnie: resetujemy rabat po wylogowaniu
  };

  return (
    <div>
      {/* Przekazujemy 'user' do nagłówka, żeby wiedział jaką ikonkę pokazać */}
      <Header 
        cartCount={cartItems.length} 
        wishlistCount={wishlistItems.length}
        user={user} 
      /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/kategoria/:nazwaKategorii" element={<CategoryPage />} />
        
        <Route 
          path="/koszyk" 
          element={
            <CartPage 
              cartItems={cartItems} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              discountRate={discountRate}
              setDiscountRate={setDiscountRate}
            />
          } 
        />

        <Route 
          path="/ulubione" 
          element={
            <WishlistPage 
              wishlistItems={wishlistItems} 
              removeFromWishlist={removeFromWishlist}
            />
          } 
        />

        {/* --- NOWE TRASY --- */}
        <Route 
          path="/logowanie" 
          element={<LoginPage handleLogin={handleLogin} />} 
        />
        
        <Route 
          path="/profil" 
          element={<ProfilePage user={user} handleLogout={handleLogout} />} 
        />

      </Routes>
    </div>
  );
}

export default App;