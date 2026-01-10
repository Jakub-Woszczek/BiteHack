import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './ProductPage.css';
import ReactStars from "react-rating-stars-component";


const ProductPage = () => {
  const { productId } = useParams();

  // 🔧 Symulacja danych z backendu
  const product = {
    id: productId,
    name: "Koszulka",
    category: "Odzież",
    price: 99.99,
    image: "https://via.placeholder.com/400",
    isInStock: true,
  };

  const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(4);  // aktualna ocena
    const maxRating = 5;                      // maksymalna liczba gwiazdek
    const commentText = "Deafult commment";
    const [comments, setComments] = useState([
  {
    id: 1,
    text: "Świetna koszulka, materiał bardzo przyjemny!",
    date: "2026-01-10",
  },
  {
    id: 2,
    text: "Kolor trochę inny niż na zdjęciu, ale ogólnie OK.",
    date: "2026-01-09",
  },
  {
    id: 3,
    text: "Dostawa szybka, wszystko zgodne z opisem.",
    date: "2026-01-08",
  },
]);

  const handleAddToCart = () => {
    console.log('Dodano do koszyka:', {
      productId: product.id,
      quantity,
    });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log('Nowa ocena:', newRating);
  };

  const handleAddToFavorites = () => {
    console.log('Dodano do ulubionych:', product.id);
  };

  return (
    <div className="product-page">
    <div className='product-section'>
        <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>

        <p className="category">Kategoria: {product.category}</p>
        <p className="price">{product.price} zł</p>
        <div className="star-rating">
        {Array.from({ length: maxRating }, (_, i) => (
            <span
            key={i}
            className={`star ${i < rating ? 'filled' : ''}`}
            >
            ★
            </span>
        ))}
        </div>

        <p className={product.isInStock ? 'in-stock' : 'out-of-stock'}>
          {product.isInStock ? 'Dostępny' : 'Brak w magazynie'}
        </p>

        {product.isInStock && (
          <>
            <div className="quantity">
              <label>Ilość:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                Dodaj do koszyka
              </button>

              <button className="add-to-favorites" onClick={handleAddToFavorites}>
                Dodaj do ulubionych
              </button>
            </div>
          </>
        )}
      </div>
    </div>
      

      <div className="comments-section">
        <h2>Komentarze</h2>

        {/* <button onClick={handleAddComment}>
            Dodaj komentarz
        </button> */}

        <div className="comments-list">
            {comments.length === 0 && <p>Brak komentarzy.</p>}

            {comments.map((comment) => (
            <div key={comment.id} className="comment">
                <p>{comment.text}</p>
                <small>{comment.date}</small>
            </div>
            ))}
        </div>
        </div>

    </div>
  );
};

export default ProductPage;
