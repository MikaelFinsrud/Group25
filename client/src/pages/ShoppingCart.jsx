import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './ShoppingCart.css';

function ShoppingCart(){
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
        <div className="cart-container">
            { isLoggedIn &&
            <>
                <h2>Shopping cart</h2>
                <p>Welcome to the cart :)</p>
            </>
            }
        </div>
    );
}

export default ShoppingCart;
        