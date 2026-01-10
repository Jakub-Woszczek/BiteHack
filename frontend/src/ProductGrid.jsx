import ProductCard from "./ProductCard.jsx";
import "./shop.css";
import productImg from "./assets/product.png";
import "./ProductGrid.css"
import Select from 'react-select'
import { useState, useMemo } from "react";

const products = [
  { id: 1, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 2, title: "Bluza", type: "bluza", price: 199, image: productImg },
  { id: 3, title: "Buty", type: "buty", price: 349, image: productImg },
  { id: 4, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 5, title: "Bluza", type: "bluza", price: 199, image: productImg },
  { id: 6, title: "Buty", type: "buty", price: 349, image: productImg },
  { id: 7, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 8, title: "Bluza", type: "bluza", price: 199, image: productImg },
  { id: 9, title: "Buty", type: "buty", price: 349, image: productImg }
]
;


function ProductGrid() {
  console.log("Renderuje shop")
  // Trzeba sfetchować typy z bazki
  const options = useMemo(() => {
    const uniqueTitles = [...new Set(products.map(p => p.title))];
    return uniqueTitles.map(t => ({ value: t, label: t }));
  }, []);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const onSort = (order) => {
    setSortOrder(order);
  };

  const handleTypeChange = (selected) => {
    setSelectedTypes(selected || []);
  };

  const visibleProducts = useMemo(() => {
    let result = [...products];

    // FILTR
    if (selectedTypes.length > 0) {
      const allowedTypes = selectedTypes.map(o => o.value);
      result = result.filter(p => allowedTypes.includes(p.title));
    }

    // SORT
    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedTypes, sortOrder]);

  return (
    <div>
      
     <div className="filters-header">
        <div>
            <Select
              defaultValue={[]}
              isMulti
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleTypeChange}
            />
        </div>
        <div>
          <span>Sortuj: </span>
          <button
            className={sortOrder === "asc" ? "sort-btn active" : "sort-btn"}
            onClick={() => onSort("asc")}
          >
            Cena rosnąco
          </button>

          <button
            className={sortOrder === "desc" ? "sort-btn active" : "sort-btn"}
            onClick={() => onSort("desc")}
          >
            Cena malejąco
          </button>
        </div>
      </div>
      <div className="product-grid">
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
  </div>
  );
}

export default ProductGrid;
