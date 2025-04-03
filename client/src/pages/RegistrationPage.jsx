import './RegistrationPage.css';
import { useState } from 'react'
import { Link } from 'react-router-dom';

function RegistrationPage(){
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: ''
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
            const response = await fetch('/api/authentication/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Registration successful! :)');
                setError('');
                
                // clear input fields
                setFormData({
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phone: '',
                    email: '' 
                });
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
      <div className="registration-container">
        <h2>Register a new account</h2>

        <form className="registration-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}


        <Link to="/login" className="login-back-link">
          Already have an account? Log in here!
        </Link>
      </div>
    </>
    );
}

export default RegistrationPage;