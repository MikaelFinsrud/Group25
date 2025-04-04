import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CartPage(){
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return(
        <>
            { isLoggedIn && <p>Welcome to the cart :)</p>}
        </>
    );
}

export default CartPage;
        