import { useLoaderData, useNavigate } from "react-router-dom"
import { getTeachers } from "../services/teacherServices"
import { Teacher } from "../types"
import Aside from "../components/Aside"
import Tooltip from "../components/ToolTip"


export async function loader() {
    const teachers = await getTeachers()
    return teachers
}
export default function Teachers() {
    const teachers = useLoaderData() as Teacher[]

    const navigate = useNavigate()
    return (
        <div className="mx-auto flex flex-col sm:flex-row m-auto">
            <Aside />
            <div className='mt-20 w-2/3 m-auto'>
                <p className="text-2xl font-bold mb-4 text-center">Gestión de Maestros</p>
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
                            teachers.map(teacher => (
                                <tr key={teacher.id} className="border-b border-slate-300">
                                    <td>
                                        <p className=" font-bold">{teacher.name}</p>
                                        <p className="text-sm font-light text-slate-500">{teacher.email}</p>
                                    </td>
                                    <td className=" font-bold text-center content-center">{teacher.phone}</td>
                                    <td className=" font-bold content-center">{teacher.address}</td>
                                    <td className="text-left pl-8">
                                        <div
                                            className=" flex gap-2 items-center">
                                            <button
                                                onClick={() => navigate(`modificar/${teacher.id}`, {
                                                    state: {
                                                        teacher
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
