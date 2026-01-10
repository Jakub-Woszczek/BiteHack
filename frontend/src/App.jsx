import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom'; // Import routera
import Header from './Header';

// --- PROSTE KOMPONENTY (STRONY) ---
// Normalnie trzymałbyś je w osobnych plikach, ale na Hackathon wrzucam tu dla szybkości

// 1. Strona Główna
const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Strona Główna</h1>
    <p>Tu będą kafelki z polecanymi produktami.</p>
  </div>
);

// 2. Strona Kategorii (uniwersalna dla Title_1, Title_2 itd.)
const CategoryPage = () => {
  const { nazwaKategorii } = useParams(); // To wyciąga końcówkę z adresu URL
  return (
    <div style={{ padding: '20px' }}>
      <h1>Kategoria: {nazwaKategorii}</h1>
      <p>Tu wyświetlimy produkty tylko z tej kategorii.</p>
    </div>
  );
};

// 3. Strona Koszyka
const CartPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Twój Koszyk</h1>
    <p>Lista zakupów...</p>
  </div>
);

// --- GŁÓWNA APLIKACJA ---
function App() {
  return (
    <div>
      <Header />
      
      {/* Tutaj decydujemy co wyświetlić pod nagłówkiem */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* :nazwaKategorii to zmienna - złapie cokolwiek wpiszesz po ukośniku */}
        <Route path="/kategoria/:nazwaKategorii" element={<CategoryPage />} />
        
        <Route path="/koszyk" element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App;