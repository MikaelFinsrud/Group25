import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Orders.css';

function Orders(){

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
        <div className="orders-container">
            { isLoggedIn && 
            <>
                <h2>Order history</h2>
                <p>Welcome to the order page :)</p>
            </>
            }
        </div>
    );
}

export default Orders;