import './LoginPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage(){

        const { login } = useAuth();
        const navigate = useNavigate();

        const [formData, setFormData] = useState({
            username: '',
            password: '',
        });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault(); // prevent page reload

        // check if any field is empty
        for (const key in formData){
            if (!formData[key].trim()){
                setError('Please fill in all fields');
                return;
            }
        }

        // if all fields are filled
        setError('');
        setSuccessMessage('');

        // Send form data to backend
        try {
            const response = await fetch('/api/authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Login successful! :)');
                setError('');
                login(data.user);
                navigate('/');  // Redirect to main page after login  
            }
            else{
                setError(data.message || 'Error');
                setSuccessMessage('');
            }
        } catch (err){
            setError('Could not connect to server');
            setSuccessMessage('');
        }
    }

    return(
        <>
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
            <Link to="/registration" className="registration-link">No account? Register here!</Link>
        </div>
        </>
    );
}

export default LoginPage;