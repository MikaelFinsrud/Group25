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
        phone: ''
    });
    
    const [error, setError] = useState('');
    
    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e){
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
        console.log('Form submitted :)', formData);

        // TODO: Insert into DB
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
          <button type="submit">Register</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <Link to="/login" className="login-back-link">
          Already have an account? Log in here!
        </Link>
      </div>
    </>
    );
}

export default RegistrationPage;