import './header.css';
import { User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef } from 'react';

function Header() {
    const { isLoggedIn } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowMenu(false);
        }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">ElectroMart</Link>
      </div>

      <div className="header-center">
        <input type="text" placeholder="Search for products..." />
      </div>

      <div className="header-right">
        {/* User Dropdown */}
        <div className="dropdown-wrapper" ref={dropdownRef}>
          <button className="icon-button"
          onClick={() => setShowMenu((prev) => !prev )} >
            <User size={24} />
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowMenu(false)}>Profile</Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setShowMenu(false)}>Order History</Link>
                  <Link to="/logout" className="dropdown-item" onClick={() => setShowMenu(false)}>Sign out</Link>
                </>
              ) : (
                <Link to="/login" className="dropdown-item" onClick={() => setShowMenu(false)}>Log in</Link>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        {isLoggedIn ? (
          <Link to="/cart" className="icon-button">
            <ShoppingCart size={24} />
          </Link>
        ) : (
          <div className="tooltip-wrapper">
            <span className="icon-button disabled">
              <ShoppingCart size={24} />
            </span>
            <span className="tooltip-text">Log in to access the cart</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
