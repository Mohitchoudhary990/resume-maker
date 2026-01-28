import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in by fetching from backend (this relies on httpOnly cookie)
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();
                if (response.success) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                // Not authenticated or session expired
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
