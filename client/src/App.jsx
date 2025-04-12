import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header.jsx'
import Categories from './components/Categories.jsx'
import ShoppingCart from './pages/ShoppingCart.jsx';
import Profile from './pages/Profile';
import Orders from './pages/Orders.jsx';
import Logout from './pages/Logout.jsx';
import Checkout from './pages/Checkout.jsx';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Categories />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App;
