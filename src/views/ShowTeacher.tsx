import { Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"
import { getTeacherById } from "../services/teacherServices"
import { Teacher } from "../types"

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const teacher = await getTeacherById(+params.id)
        console.log(teacher)

        if (!teacher) {
            return redirect('/cursos')
        }
        return teacher
    }
}

export default function ShowTeacher() {

    const teacher = useLoaderData() as Teacher

    return (
        <div className='w-3/4 m-auto mt-12 rounded-xl p-4' >
            <div className=' flex justify-between'>
                <Link
                    to="/cursos"
                    className="rounded bg-emerald-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-purple-900"
                >Volver a cursos</Link>
            </div>

            
                <p className='font-bold text-center text-2xl'>Datos del maestro</p>
            

            <div className=" block">
                <div className='w-1/2 m-auto mt-4 rounded-xl p-4'>
                    <div className=' rounded-md mt-5'>
                        <div className="relative border border-gray-500 rounded-lg p-6 my-8 grid grid-cols-2">
                            <p className="absolute -top-4 left-4 bg-gray-100 px-2 text-sm font-bold text-gray-600">
                                Información Personal
                            </p>

                            <div className="mt-4 col-span-2">
                                <label className="block text-gray-500 text-sm mb-1">Nombre</label>
                                <p className="text-gray-900 font-medium">{teacher.name}</p>
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-500 text-sm mb-1">Correo electronico</label>
                                <p className="text-gray-900 font-medium">{teacher.email}</p>
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-500 text-sm mb-1">Celular</label>
                                <p className="text-gray-900 font-medium">{teacher.phone}</p>
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-500 text-sm mb-1">Dirección</label>
                                <p className="text-gray-900 font-medium">{teacher.address}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


