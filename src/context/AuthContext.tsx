import React, { createContext, useContext, useState } from 'react'
import { logout as apiLogout } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const login = (token: string) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    };

    const logout = async() => {
        try {
            await apiLogout()
            localStorage.removeItem('token')
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Error en el contexto al cerrar sesion: ', error)
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};