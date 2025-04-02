import { useLoaderData } from 'react-router-dom'
import { getUserData } from '../services/userService'
import { UserData } from '../types'
import Aside from '../components/Aside'

export async function loader() {
    const user = await getUserData()
    return user
}

export default function UserProfile() {
    const user = useLoaderData() as UserData

    console.log(user)
    return (
        <div className='flex flex-col sm:flex-row'>
            <Aside />
            <div className=' w-1/2 m-auto mt-12 rounded-lg border-2 border-black p-4'>
                <div>
                    <p className='text-center font-bold text-2xl w-full h-20'>Información del Usuario</p>
                </div>
                <div className='border-transparent border-y border-slate-500 mt-4 p-3'>
                    <p className='text-xl font-bold'>{user.name}</p>
                    <p className='text-lg text-gray-500'>{user.rol_id === 1 ? 'Administrador' : 'Asistente'}</p>
                </div>
                <div className='border-transparent border-y border-slate-500 p-3 flex justify-between'>
                    <p><span className='font-bold'>Correo electrónico</span> {user.email}</p>
                    <p><span className='font-bold'>Teléfono</span> {user.phone}</p>
                </div>
            </div>

        </div>
    )
}
