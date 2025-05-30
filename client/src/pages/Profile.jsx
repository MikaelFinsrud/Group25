import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Profile.css';

function Profile(){

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
        <div className="profile-container">
            { isLoggedIn && 
            <>
                <h2>Profile</h2>
                <p>Logged in as {user.FirstName} {user.LastName}</p>
                <p>Username: {user.Username}</p>
                <p>Email: {user.Email}</p>
                <p>Address: {user.Address}</p>
                <p>Phone number: {user.PhoneNumber}</p>
            </>
            }
        </div>
    );
}

export default Profile;