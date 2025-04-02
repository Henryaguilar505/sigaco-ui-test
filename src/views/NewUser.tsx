import Aside from '../components/Aside'
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { addUser } from '../services/userService'

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await addUser(data)
    return redirect('/usuarios')
}


export default function NewUser() {
    return (
        <div className=" flex flex-col sm:flex-row dark:bg-slate-900 ">
            <Aside />
            <div className=" mt-12 w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase">Registro de maestros</h1>
                <Link
                    to="/usuarios"
                    className="rounded bg-green-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-green-900"

                >Volver a usuarios</Link>
                <Form
                    method='POST'
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
                        // defaultValue={student?.name}
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
                            // defaultValue={student?.name}
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
                            // defaultValue={student?.name}
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
                            // defaultValue={student?.name}
                            />
                        </div>

                        <div className=" mt-4 w-full">
                            <label
                                className="text-gray-800"
                                htmlFor="password_confirmation"
                            >Confirma tu contraseña</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="password_confirmation"
                            // defaultValue={student?.name}
                            />
                        </div>
                    </div>



                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Registrar usuario'
                    />

                </Form>
            </div>
        </div>
    )
}
