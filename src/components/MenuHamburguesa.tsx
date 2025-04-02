import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserExpandableMenu from './UserExpandableMenu'

export const MenuHamburguesa = () => {
    //Logica para el menú
    const [isOpen, setIsOpen] = useState(false)

    //Cambia el valor de la variable isOpen
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className=' relative'>
            <div className=' cursor-pointer sm:hidden space-y-2 ml-2'
                onClick={toggleMenu}
            >
                <span className={`w-7 block h-1 bg-gray-800 rounded transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-7 block h-1 bg-gray-800 rounded transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-7 block h-1 bg-gray-800 rounded transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
            <div className={`fixed top-0 left-0 w-50 bg-blue-700 shadow-lg ${isOpen ? 'translate-x-0' : ' -translate-x-full'} transition-transform
            duration-300 ease-in-out sm:hidden z-50`}>

                <div className=' flex justify-end p-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"
                        className=' text-white font-bold w-8 h-8 cursor-pointer'
                        onClick={toggleMenu}
                    >
                        <path d="M7 4l10 16"></path>
                        <path d="M17 4l-10 16"></path>
                    </svg>
                </div>
                <aside className=" h-full w-50 bg-blue-700 text-white p-4 flex flex-col space-y-4 rounded-r-xl mt-0">
                    <h2 className="text-lg font-bold">Menú</h2>
                    <nav className=' sticky top-0'>
                        <ul className="space-y-2">
                            <Link
                                to="/"
                                className=' flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                                </svg>
                                <p className="px-3">Principal</p>
                            </Link>

                            <Link
                                to='/matricula'
                                className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5"></path>
                                    <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"></path>
                                </svg>
                                <p className="px-3">Estudiantes</p>
                            </Link>

                            <Link
                                to='/asistencia'
                                className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                                    <path d="M15 19l2 2l4 -4"></path>
                                </svg>
                                <p className="px-3">Asistencia</p>
                            </Link>

                            <Link
                                to='/calificaciones'
                                className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                                    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                                    <path d="M10 14h4"></path>
                                    <path d="M12 12v4"></path>
                                </svg>
                                <p className="px-3">Calificaciones</p>
                            </Link>

                            <Link
                                to='/cursos'
                                className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    width="24"
                                    height="24"
                                    stroke-width="2">
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
                                    <path d="M6 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                    <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
                                </svg>
                                <p className="px-3">Cursos</p>
                            </Link>

                            <Link
                                to='/maestros'
                                className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    width="24" height="24"
                                    stroke-width="2">
                                    <path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1"></path>
                                    <path d="M11 16m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                                </svg>
                                <p className="px-3">Maestros</p>
                            </Link>

                            <a href='#' className='flex items-center rounded hover:bg-blue-900 focus:bg-blue-900 px-3 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                    <path d="M9 17l0 -5"></path>
                                    <path d="M12 17l0 -1"></path>
                                    <path d="M15 17l0 -3"></path>
                                </svg>
                                <p className="px-3">Reportes</p>
                            </a>

                            <a href="#">
                                <div>
                                    <UserExpandableMenu />
                                </div>
                            </a>
                        </ul>
                    </nav>
                </aside>

            </div>
        </div>
    )
}

