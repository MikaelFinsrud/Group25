import './OrderCard.css';
import { useCart } from '../context/CartContext';

const images = import.meta.glob('../assets/*.webp', { eager: true });

function OrderCard({ product, quantity }) {
  const { removeFromCart } = useCart();
  const imagePath = images[`../assets/${product.ImageID}.webp`];

  const subtotal = (product.Price * quantity).toFixed(2);

  return (
    <div className="order-card">
      {imagePath && (
        <img
          src={imagePath.default}
          alt={product.Name}
          className="order-image"
        />
      )}
      <div className="order-info">
        <h4>{product.Name}</h4>
        <p>Quantity: {quantity}</p>
        <p>Price per item: {product.Price} kr</p>
        <p className="subtotal">Subtotal: {subtotal} kr</p>
        <button className="remove-btn" onClick={() => removeFromCart(product.ProductID)}>Remove</button>
      </div>
    </div>
  );
}

export default OrderCard;
