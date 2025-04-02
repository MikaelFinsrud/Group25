import './RegistrationPage.css';
import { Link } from 'react-router-dom';

function RegistrationPage(){
    return(
        <>
        <div className="registration-container">
            <h2>Register a new account</h2>
            <form className="registration-form">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <Link to="/login" className="login-back-link">Already have an account? Log in here!</Link>
        </div>
        </>
    );
}

export default RegistrationPage;