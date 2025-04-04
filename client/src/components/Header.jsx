import './header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { isLoggedIn, user } = useAuth();
    return(
        <>
            <div className="header">
                <div className="header-left">
                    <h2>ElectroMart</h2>
                </div>
                {isLoggedIn && <p>Logged in as {user.Username}</p>}
                <div className="header-center">
                    <input type="text" placeholder="Search for products..." />
                </div>

                <div className="header-right">
                    <Link to="/login" className="login-link">Login</Link>
                    <button>Cart</button>
                </div>

            </div>
        </>
    )
}

export default Header;