import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import './Profile.css';

function Profile(){
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate()

    // Check if user is logged in. If not, redirect to /
    useEffect(() => {
        if (!isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    // TODO - Fetch orders 

    return(
        <div className="profile-container">
            { isLoggedIn && 
            <>
                <h2>Profile</h2>
                <p>Logged in as: {user.Username}, {user.Email}, {user.PhoneNumber}</p>
            </>

            // TODO - Display orders using ordercards

            }
        </div>
    );
}

export default Profile;