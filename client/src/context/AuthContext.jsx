import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

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

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/authentication/status', {
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok && data.success){
                login(data.user);
            }
        }
        catch (err){
            console.error("Session check failed:", err);
        } finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        checkAuth(); // Runs once when the app loads
    }, []);

    return(
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, authChecked }}>
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
