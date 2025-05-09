import './OrderCard.css';

const images = import.meta.glob('../assets/*.webp', { eager: true });

function OrderCard({ product, quantity, onRemove }) {
  const imagePath = images[`../assets/${product.ImageID}.webp`];
  const subtotal = (product.Price * quantity).toFixed(2);

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/cart/${product.ProductID}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to remove item');
      }

      if (onRemove) {
        onRemove(); // Trigger refresh in parent (ShoppingCart)
      }
    } catch (err) {
      console.error('Failed to remove from cart:', err.message);
    }
  };

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
        <button className="remove-btn" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}

export default OrderCard;
