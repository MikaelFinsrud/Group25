import './ProductCard.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const images = import.meta.glob('../assets/*.webp', { eager: true });

function ProductCard({ product }) {
  const { isLoggedIn, authChecked } = useAuth();
  const { cart, addToCart } = useCart();
  const imagePath = images[`../assets/${product.ImageID}.webp`];

  const cartItem = cart.find(item => item.ProductID === product.ProductID);
  const quantityInCart = cartItem ? cartItem.Quantity : 0;
  const [stock, setStock] = useState(product.StockQuantity - quantityInCart);

  useEffect(() => {
    setStock(product.StockQuantity - quantityInCart);
  }, [cart]);

  if (!authChecked) return null;

  const handleAddToCart = async () => {
    const result = await addToCart(product.ProductID, 1);
    if (result.success) {
      setStock(prev => prev - 1);
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="product-card">
      {imagePath && (
        <img src={imagePath.default} alt={product.Name} className="product-image" />
      )}
      <h3>{product.Name}</h3>
      <p>{product.Description}</p>
      <p className="price">{product.Price} kr</p>
      <p className="stock">In stock: {stock}</p>

      {isLoggedIn ? (
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          {stock > 0 ? 'Add to cart' : 'Out of stock'}
        </button>
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
