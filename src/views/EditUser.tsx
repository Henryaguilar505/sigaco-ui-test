import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
import { UserData } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
    console.log(params.id)
    if (params.id !== undefined) {
        const user = await getUserById(+params.id)

        console.log(user)
        if (!user) {
            return redirect('/usuarios')
        }
        return user
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    if (params.id !== undefined) {
        await updateUser(data, +params.id)
        return redirect('/usuarios')
    }
}

export default function EditUser() {
    const user = useLoaderData() as UserData
    return (
        <div className=" mt-12 w-3/4 m-auto">
            <h1 className=" font-bold text-2xl text-center uppercase mb-4">Editar datos del usuario</h1>
            <div className=' mt-12 w-3/4 m-auto'>
                <Link
                    to='/usuarios'
                    className="rounded bg-green-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-green-900"

                >Volver a la lista de usuarios</Link>

                <Form
                    method="POST"
                >

                    <div className=" mt-4">
                        <label
                            className="text-gray-800"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            placeholder="Nombre y Apellido"
                            name="name"
                            defaultValue={user.name}
                        />
                    </div>

                    <div className='flex gap-8'>
                        <div className=" mt-4 w-full">
                            <label
                                className="text-gray-800"
                                htmlFor="email"
                            >Correo electrónico</label>
                            <input
                                id="email"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. ejemplo@ejemplo.com"
                                name="email"
                                defaultValue={user.email}
                            />
                        </div>

                        <div className=" mt-4 w-full">
                            <label
                                className="text-gray-800"
                                htmlFor="phone"
                            >Telefono</label>
                            <input
                                id="phone"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. 87654321"
                                name="phone"
                                defaultValue={user.phone}
                            />
                        </div>
                    </div>

                    <div className='flex gap-8'>
                        <div className=" mt-4 w-full">
                            <label
                                className="text-gray-800"
                                htmlFor="password"
                            >Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="password"
                            //defaultValue={user.status}
                            />
                        </div>
                    </div>
                    
                    <div className='flex gap-8'>
                        <div className=" mt-4 w-full">
                            <label
                                className="text-gray-800"
                                htmlFor="password_confirmation"
                            >Confirmar contraseña</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="password_confirmation"
                            //defaultValue={user.status}
                            />
                        </div>
                    </div>

                    <label
                        htmlFor="status"
                        className=' flex flex-col '
                    >Estado</label>
                    <select
                        name="status"
                        id="status"
                        className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                        defaultValue="activo"
                    >
                        <option value="" disabled selected>Elija una opción</option>
                        <option value="activo" >Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Actualizar datos del usuario'
                    />

                </Form>
            </div>
        </div>
    )
}
