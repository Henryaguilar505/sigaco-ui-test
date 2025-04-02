import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { addTeacher } from '../services/teacherServices'
import Aside from '../components/Aside'

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await addTeacher(data)
    return redirect('/maestros')
}

export default function NewTeacher() {
    return (
        <div className=" flex flex-col sm:flex-row dark:bg-slate-900 ">
            <Aside />
            <div className=" mt-12 w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase">Registro de maestros</h1>
                <Link
                    to="/maestros"
                    className="rounded bg-green-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-green-900"

                >Volver a maestros</Link>
                <Form
                    method='POST'
                >

                    <div className=" mt-4">
                        <label
                            className="text-gray-800"
                            htmlFor="name"
                        >Nombre del maestro</label>
                        <input
                            id="name"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            placeholder="Nombre y Apellido"
                            name="name"
                        // defaultValue={student?.name}
                        />
                    </div>

                    <div className=" mt-4">
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

                    <div className=" mt-4">
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

                    <div className=" mt-4">
                        <label
                            className="text-gray-800"
                            htmlFor="address"
                        >Dirección</label>
                        <input
                            id="address"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                            placeholder="Dirección"
                            name="address"
                        // defaultValue={student?.name}
                        />
                    </div>

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Registrar maestro'
                    />

                </Form>
            </div>
        </div>
    )
}
