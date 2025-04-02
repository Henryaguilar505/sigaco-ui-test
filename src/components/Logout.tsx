import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout: React.FC = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    useEffect(() => {
        logout()
        navigate('/login')
    }, [logout, navigate])

    return (
        <>
            <p>Cerrando Sesión...</p>
        </>
    )
}

export default Logout