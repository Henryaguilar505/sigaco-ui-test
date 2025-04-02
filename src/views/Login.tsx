import { useState } from "react"
import loginService from '../services/login'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"


export default function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await loginService.login({
                email,
                password
            })
            console.log(response)
            
            if (response) {
                const { access_token, user } = await response
                
                localStorage.setItem('rol', user.rol_id);
                login(access_token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status
                switch (status) {
                    case 401:
                        setError('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña')
                        break;
                    case 403:
                        setError('Acceso denegado. Tu cuenta puede estar bloqueada o no verificada')
                        break;
                    case 404:
                        setError('Cuenta no encontrada. Por favor verifica el correo electrónico')
                        break;
                    case 422:
                        setError('Errores de validación. Por favor, verifica los datos ingresados')
                        break;
                    case 500:
                        setError('Error del servidor. Por favor, inténtalo de nuevo más tarde')
                        break;
                    default:
                        setError('Error de conexion, Revise su conexión a internet')
                }
            } else {
                setError('Compruebe su conexión de internet')
            }
        }
    }

    return (
        <>
            <div className=' backdrop-blur-sm bg-emerald-300/30 dark:bg-white/10 p-8 mt-16 w-5/6 md:w-1/2 md:transition-all sm:w-2/3 sm:transition-all mx-auto rounded-xl'>
                <div className="">
                    <img
                        src="/src/images/ADEC.jpg"
                        alt=""
                        className=" mx-auto w-36 mb-4 rounded-full" />
                </div>
                {/* <div className=" sm:text-xl md:text-2xl dark:text-white text-center">
                    <p className="text-wrap font-bold ">ACADEMIA DE COMPUTACIÓN ADEC</p>
                </div> */}

                <div className="sm:w-3/4 mx-auto text-xl dark:text-white">
                    {error && <p className="bg-red-300 text-red-700 font-bold text-sm p-4">{error}</p>}
                    <form
                        action=""
                        onSubmit={handleLogin} 
                        className="mt-6 flex flex-col">
                        <label htmlFor="">Correo electrónico</label>
                        <input
                            type="text"
                            value={email}
                            name="Email"
                            placeholder="Correo electrónico"
                            className="bg-slate-400 dark:bg-slate-700 rounded-md h-12 p-4 sm:w-full"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            placeholder="Contraseña"
                            className="bg-slate-400 dark:bg-slate-700 rounded-md h-12 p-4 sm:w-full"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="bg-gradient-to-r from-black via-blue-950 to-cyan-600 mt-6 rounded-md h-12 font-bold text-white"
                            
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>

            </div>

        </>

    )
}
