import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

const UserExpandableMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                type="button"
                className="flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    width="24" height="24"
                    stroke-width="2">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
                <p className='px-3'>Usuario</p>
                <svg
                    className={`ml-2 w-4 h-4 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute mt-2 bg-blue-800 border rounded shadow-lg text-center">
                    <Link to='/perfil' className="block px-4 py-2 hover:bg-blue-900 text-sm">Ver información</Link>
                    {
                        parseInt(localStorage.getItem('rol') || '0', 10) === 1 && (
                            <Link to='/usuarios' className="block px-4 py-2 hover:bg-blue-900 text-sm">Lista de usuarios</Link>
                        )
                    }
                    <LogoutButton />
                </div>
            )}
        </div>
    );
};

export default UserExpandableMenu;
