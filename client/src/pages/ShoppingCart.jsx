import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import OrderCard from '../components/OrderCard';
import './ShoppingCart.css';

function ShoppingCart(){
    const { cart, removeFromCart } = useCart();
    const { isLoggedIn, user, authChecked } = useAuth();
    const navigate = useNavigate()

    // Check if user is logged in. If not, redirect to /
    useEffect(() => {
        if (authChecked && !isLoggedIn){
            navigate('/');
        }
    }, [authChecked, isLoggedIn, navigate]);

    if (!authChecked) return null;

    const totalPrice = Object.values(cart).reduce((sum, { product, quantity }) => {
        return sum + product.Price * quantity;
      }, 0);
      
    return(
        <div className="cart-container">
            { isLoggedIn &&
            <>
                <h2>Shopping cart</h2>
                {   (Object.keys(cart).length === 0) ?
                    (
                        <>
                            <p>You cart is empty!</p>
                        </>
                    ) : (
                        <>
                            {Object.entries(cart).map(([id, { product, quantity }]) => (
                                <OrderCard key={id} product={product} quantity={quantity} />
                            ))}
                            <p className="cart-total">Total: {totalPrice.toFixed(2)} kr</p>
                            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Go to checkout</button>
                        </>
                    )
                }
            </>
            }
        </div>
    );
}

export default ShoppingCart;