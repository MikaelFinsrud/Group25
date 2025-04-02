import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage(){
    return(
        <>
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button type="submit">Log in</button>
            </form>
            <Link to="/registration" className="registration-link">No account? Register here!</Link>
        </div>
        </>
    );
}

export default LoginPage;