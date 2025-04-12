import './ProductCard.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Import all images eagerly from the assets folder
const images = import.meta.glob('../assets/*.webp', { eager: true });

function ProductCard({ product }) {

  const { addToCart } = useCart();
  const { isLoggedIn, authChecked } = useAuth();
  if (!authChecked) return null;

  // Use ImageID to find the correct image
  const imagePath = images[`../assets/${product.ImageID}.webp`];

  return (
    <div className="product-card">
      {imagePath && (
        <img
          src={imagePath.default}
          alt={product.Name}
          className="product-image"
        />
      )}
      <h3>{product.Name}</h3>
      <p>{product.Description}</p>
      <p className="price">{product.Price}</p>
      {isLoggedIn ? (
        <button className="add-to-cart" onClick={ () => addToCart(product) }>Add to cart</button>
      ) : (
        <div className="tooltip-wrapper">
          <button className="add-to-cart-disabled">Add to cart</button>
          <span className="tooltip-text">Log in to add items to cart</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
