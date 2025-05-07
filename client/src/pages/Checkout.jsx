import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { isLoggedIn, authChecked } = useAuth();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('CreditCard');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.success) setCart(data.cart);
      else console.error(data.message);
    } catch (err) {
      console.error('Failed to fetch cart:', err.message);
    }
  };

  useEffect(() => {
    if (authChecked && isLoggedIn) fetchCart();
  }, [authChecked, isLoggedIn]);

  const totalPrice = cart.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/orders/checkout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Checkout failed');
      alert('Order confirmed!');
      navigate('/orders');
    } catch (err) {
      console.error('Checkout failed:', err.message);
      alert('Failed to place order.');
    }
  };

  if (!authChecked) return null;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <p>Total: <strong>{totalPrice.toFixed(2)} kr</strong></p>

          <label>
            Payment Method:
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="CreditCard">Credit Card</option>
              <option value="Vipps">Vipps</option>
              <option value="Invoice">Invoice</option>
            </select>
          </label>

          <div className="checkout-buttons">
            <button onClick={() => navigate('/cart')}>Back to Cart</button>
            <button className="confirm-btn" onClick={handleCheckout}>Confirm Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
