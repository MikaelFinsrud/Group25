import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import './ShoppingCart.css';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, authChecked } = useAuth();
  const navigate = useNavigate();
  
  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', { credentials: 'include' });
      const data = await res.json();
      console.log("Fetched cart response:", data); // 👈 log it!
      if (res.ok && data.success) {
        setCart(data.cart); // Expecting data.cart to be an array
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  };
  

  useEffect(() => {
    if (authChecked && isLoggedIn) {
      fetchCart();
    }
  }, [authChecked, isLoggedIn]);

  if (!authChecked) return null;

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.Price * item.Quantity;
  }, 0);

  return (
    <div className="cart-container">
      {isLoggedIn && (
        <>
          <h2>Shopping cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <>
              {cart.map((item) => (
                <OrderCard
                  key={item.ProductId}
                  product={item}
                  quantity={item.Quantity}
                  onRemove={fetchCart}
                />
              ))}
              <p className="cart-total">Total: {totalPrice.toFixed(2)} kr</p>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Go to checkout
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
