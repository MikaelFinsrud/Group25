import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header.jsx'
import Categories from './components/Categories.jsx'
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
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
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
