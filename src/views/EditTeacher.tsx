import { Link, LoaderFunctionArgs, redirect, Form, useLoaderData, ActionFunctionArgs } from 'react-router-dom'
import { getTeacherById, updateTeacher } from '../services/teacherServices'
import { Teacher } from '../types'
import { toast, ToastContainer } from 'react-toastify'

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const teacher = await getTeacherById(+params.id)

        if (!teacher) {
            return redirect('/maestros')
        }
        return teacher
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    if (params.id !== undefined) {
        await updateTeacher(data, +params.id)
        toast.success('Datos actualizados')
        return redirect('/maestros')
    }
}

export default function EditTeacher() {

    const teacher = useLoaderData() as Teacher

    return (
        <div className=" mt-12 w-3/4 m-auto">
            <ToastContainer />
            <h1 className=" font-bold text-2xl text-center uppercase mb-4">Editar datos del maestro</h1>


            <div className=' mt-12 w-3/4 m-auto'>
                <Link
                    to={'/maestros'}
                    className="rounded bg-green-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-green-900"

                >Volver a la lista de maestros</Link>
                <Form
                    method='POST'
                >

                    <div className=' my-4'>
                        <label
                            htmlFor="name"
                        >Nombre del maestro</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            defaultValue={teacher.name}
                        />
                    </div>
                    <div className=' mt-4'>
                        <label
                            htmlFor="email"
                        >Correo electrónico</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            defaultValue={teacher.email}
                        />
                    </div>
                    <div className="">
                        <label
                            className="text-gray-800"
                            htmlFor="phone"
                        >Celular</label>
                        <input
                            id="phone"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            placeholder="Ej. 81234567"
                            name="phone"
                            defaultValue={teacher.phone}
                        />
                    </div>

                    <div>
                        <label
                            className="text-gray-800"
                            htmlFor="address"
                        >Dirección</label>
                        <input
                            id="address"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            placeholder="Ej. Ocotal Nueva Segovia"
                            name="address"
                            defaultValue={teacher.address}
                        />
                    </div>

                    <label
                        htmlFor="status"
                        className=' flex flex-col '
                    >Estado</label>
                    <select
                        name="status"
                        id="status"
                        className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                        defaultValue={teacher.status}
                    >
                        <option value="" disabled selected>Elija una opción</option>
                        <option value="activo" >Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-700 hover:bg-blue-900 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Actualizar datos del maestro'
                    />

                </Form>

            </div>
        </div >
    )
}
