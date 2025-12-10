import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(storedAuth);
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const credentials = btoa(`${username}:${password}`);
                setAuth(credentials);
                setIsLoggedIn(true);
                localStorage.setItem('auth', credentials);
                return { success: true };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Falha no login.' };
            }
        } catch (e) {
            return { success: false, message: 'Não foi possível conectar ao servidor.' };
        }
    };

    const logout = () => {
        setAuth(null);
        setIsLoggedIn(false);
        localStorage.removeItem('auth');
    };

    const value = {
        auth,
        isLoggedIn,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
