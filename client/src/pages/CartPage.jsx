import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CartPage(){
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
        <>
            { isLoggedIn && <p>Welcome to the cart :)</p>}
        </>
    );
}

export default CartPage;
        