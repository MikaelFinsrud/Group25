import './ProductCard.css';
import { useAuth } from '../context/AuthContext';

function ProductCard({ product }) {
  const { isLoggedIn, authChecked } = useAuth();

  if (!authChecked) return null;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">{product.price}</p>
      { isLoggedIn ? (
        <button className="add-to-cart">Add to cart</button>
      ) : (
        <div className="tooltip-wrapper">
          <button className="add-to-cart-disabled">
            Add to cart
          </button>
          <span className="tooltip-text">Log in to add items to cart</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
