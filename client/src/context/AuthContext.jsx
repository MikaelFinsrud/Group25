import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () =>{
        setIsLoggedIn(false);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

/* {isLoggedIn && <p>Logged in as {user.Username}</p>} */ // <- used to check login status ezpz