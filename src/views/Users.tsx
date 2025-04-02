import { getUsers } from '../services/userService'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { UserData } from '../types'
import Tooltip from '../components/ToolTip'
import Aside from '../components/Aside'

export async function loader() {
    const users = await getUsers()
    return users
}

export default function Users() {
    const users = useLoaderData() as UserData[]
    const navigate = useNavigate()
    return (
        <div className="mx-auto flex flex-col sm:flex-row m-auto">
            <Aside />
            <div className='mt-20 w-2/3 m-auto'>
                <p className="text-2xl font-bold mb-4 text-center">Gestión de Usuarios</p>
                <div className='flex justify-end'>
                    <Tooltip text="Agregar un nuevo maestro">
                        <button
                            onClick={() => navigate('nuevo')}
                            className="mt-4 px-4 py-2 text-white text-xl bg-blue-700 rounded-lg hover:bg-blue-900"
                        >
                            Nuevo
                        </button>
                    </Tooltip>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            {/* <th></th>
                        <th></th>
                        <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id} className="border-b border-slate-300">
                                    <td>
                                        <p className=" font-bold">{user.name}</p>
                                        <p className="text-sm font-light text-slate-500">{user.email}</p>
                                    </td>
                                    <td className=" font-bold text-center content-center">{user.phone}</td>
                                    <td className=" font-bold content-center">{user.rol_id === 1 ? 'Administrador' : 'Asistente'}</td>
                                    <td className="text-left pl-8">
                                        <div
                                            className=" flex gap-2 items-center">
                                            <button
                                                onClick={() => navigate(`modificar/${user.id}`, {
                                                    state: {
                                                        user
                                                    }
                                                })}
                                                className='bg-green-700 hover:bg-green-900 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                                            >Editar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}
