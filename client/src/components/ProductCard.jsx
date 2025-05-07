import './ProductCard.css';
import { useAuth } from '../context/AuthContext';

// Import all images eagerly from the assets folder
const images = import.meta.glob('../assets/*.webp', { eager: true });

function ProductCard({ product }) {
  const { isLoggedIn, authChecked } = useAuth();
  if (!authChecked) return null;

  const imagePath = images[`../assets/${product.ImageID}.webp`];

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: product.ProductID, quantity: 1 }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add to cart');

      // Optional: show a notification or toast here
      console.log('Added to cart:', data);
    } catch (err) {
      console.error('Add to cart failed:', err.message);
    }
  };

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
      <p className="price">{product.Price} kr</p>
      {isLoggedIn ? (
        <button className="add-to-cart" onClick={handleAddToCart}>Add to cart</button>
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
