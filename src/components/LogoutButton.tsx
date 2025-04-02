import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LogoutButton: React.FC = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.error('Error al cerrar sesión: ', error)
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-blue-900 w-full text-sm"
        >
            Cerrar Sesión
        </button>
    )
}

export default LogoutButton