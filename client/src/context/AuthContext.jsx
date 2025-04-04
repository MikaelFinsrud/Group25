import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };


const logout = async () => {

    try {
            await fetch('/api/authentication/logout', {
            method: 'POST',
            credentials: 'include',
        });
    } catch (err) {
        console.error("Logout request failed:", err);
    }
    
        // Clear context state
        setIsLoggedIn(false);
        setUser(null);
    };


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
