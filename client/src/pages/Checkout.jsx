import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout(){
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

    return(
        <div className="checkout-container">
            { isLoggedIn &&
            <>
                <h2>Checkout</h2>
                <p>Welcome to checkout! :)</p>
            </>
            }
        </div>
    );
}

export default Checkout;