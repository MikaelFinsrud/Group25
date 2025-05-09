import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
  const { isLoggedIn, authChecked } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      navigate('/');
    } else if (authChecked && isLoggedIn) {
      fetchOrders();
    }
  }, [authChecked, isLoggedIn]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/history', {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Failed to fetch order history:', err.message);
    }
  };

  if (!authChecked) return null;

  return (
    <div className="orders-container">
      {isLoggedIn && (
        <>
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order.OrderID} className="order-summary">
                <h3>Order #{order.OrderID}</h3>
                <p>Date: {new Date(order.OrderDate).toLocaleString()}</p>
                <p>Status: {order.Status}</p>
                <p>Total: {order.TotalAmount ? Number(order.TotalAmount).toFixed(2) : 'N/A'} kr</p>
                <ul>
                  {order.items.map(item => (
                    <li key={item.OrderItemID}>
                      {item.ProductName} — {item.Quantity} stk — {item.Subtotal ? Number(item.Subtotal).toFixed(2) : 'N/A'} kr
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
