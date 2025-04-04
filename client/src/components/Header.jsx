import './header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const logoutAndRedirect = () => {
        logout();
        navigate('/');
    }
    return(
        <>
            <div className="header">
                <div className="header-left">
                    <Link to="/" className="logo">ElectroMart</Link>
                </div>
                
                <div className="header-center">
                    <input type="text" placeholder="Search for products..." />
                </div>

                <div className="header-right">
                    {isLoggedIn ? (
                        <div>
                            <button className="logout-link" onClick={ logoutAndRedirect }>Sign out</button>
                            <Link to="/cart" className="cart-link">Cart</Link>
                            <Link to="/profile" className="profile-link">Profile</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="login-link">Login</Link>
                            <div className="tooltip-wrapper">
                                <span className="cart-link-2">Cart</span>
                                <span className="tooltip-text">Log in to access the cart</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header;