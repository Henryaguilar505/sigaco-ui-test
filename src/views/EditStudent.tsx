import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getStudentsById } from "../services/studentServices"
import { Student } from "../types"
import { updateStudent } from "../services/studentServices"
import { toast, ToastContainer } from "react-toastify"

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const student = await getStudentsById(+params.id)
        if (!student) {
            return redirect(`/estudiante/mostrar/${params.id}`)
        }
        return student
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    if (params.id !== undefined) {
        await updateStudent(data, +params.id)
        toast.success('Datos actualizados')
        return redirect(`/estudiante/mostrar/${params.id}`)
    }

}

export default function EditStudent() {

    const error = useActionData() as string
    const student = useLoaderData() as Student

    return (
        <>
            <ToastContainer />
            <div className=" mt-16 sm:mt-12 sm:w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase mb-4">Editar datos del estudiante</h1>
                <Link
                    to={`/matricula/estudiante/${student.id}`}
                    className="rounded bg-yellow-700 p-3 ml-10 sm:ml-28 text-sm font-bold text-slate-700 shadow-sm hover:bg-yellow-600"

                >Volver a mostra los datos</Link>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form
                    method='POST'
                    className="mt-6"
                >
                    <div className=" mt-12 w-3/4 m-auto">
                        <div className=" mt-4">
                            <label
                                className="text-gray-800"
                                htmlFor="name"
                            >Nombre del Estudiante</label>
                            <input
                                id="name"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Nombre y Apellido"
                                name="name"
                                defaultValue={student?.name}
                            />
                        </div>

                        <div className=" sm:grid sm:grid-cols-2 gap-4 mt-4">
                            <div className="">
                                <label
                                    className="text-gray-800"
                                    htmlFor="identity_card"
                                >Cedula</label>
                                <input
                                    id="identity_card"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. 123-010203-1000A"
                                    name="identity_card"
                                    defaultValue={student?.identity_card || ''}
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
                                    defaultValue={student?.phone}
                                />
                            </div>
                        </div>

                        <div className=" sm:grid sm:grid-cols-3 mt-4">
                            <div className=" w-full space-y-2">
                                <label
                                    className="text-gray-800 mr-6 flex"
                                    htmlFor="gender"
                                >Sexo </label>
                                <div className=" space-x-3">
                                    <input
                                        id='gender'
                                        type='radio'
                                        name='gender'
                                        value="M"
                                        defaultChecked={student?.gender === 'M'}
                                    />
                                    <label
                                        htmlFor='gender'
                                        className=' mr-6'
                                    >Masculino</label>
                                </div>
                                <div className=" space-x-3">
                                    <input
                                        id='gender'
                                        type='radio'
                                        name='gender'
                                        value="F"
                                        defaultChecked={student?.gender === 'F'}
                                    />
                                    <label
                                        htmlFor='gender'
                                    >Femenino</label>
                                </div>
                            </div>

                            <div className=" w-full col-span-2">
                                <label
                                    className="text-gray-800"
                                    htmlFor="birthplace"
                                >Lugar de nacimiento:</label>
                                <input
                                    id="birthplace"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Ocotal, Nueva Segovia"
                                    name="birthplace"
                                    defaultValue={student?.birthplace}
                                />
                            </div>
                        </div>

                        <div className=" sm:grid sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="birth_date"
                                >Fecha de nacimiento:</label>
                                <input
                                    id="birth_date"
                                    type="date"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Ocotal, Nueva Segovia"
                                    name="birth_date"
                                    defaultValue={student?.birth_date}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="nationality"
                                >Nacionalidad:</label>
                                <input
                                    id="nationality"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Nicaraguense"
                                    name="nationality"
                                    defaultValue={student?.nationality}
                                />
                            </div>
                        </div>

                        <div className=" sm:grid sm:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="academic_level"
                                >Nivel academico:</label>
                                <input
                                    id="academic_level"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Bachiller"
                                    name="academic_level"
                                    defaultValue={student?.academic_level}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="profession"
                                >Profesión:</label>
                                <input
                                    id="profession"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Ingeniero"
                                    name="profession"
                                    defaultValue={student?.profession || ''}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="occupation"
                                >Oficio:</label>
                                <input
                                    id="occupation"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Cajero de PALI"
                                    name="occupation"
                                    defaultValue={student?.occupation || ''}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="text-gray-800"
                                htmlFor="address"
                            >Dirección:</label>
                            <input
                                id="address"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. Stairway to Heaven"
                                name="address"
                                defaultValue={student?.address}
                            />
                        </div>

                        <div className=" sm:grid sm:grid-cols-3 gap-4 mt-4">
                            <div className=" col-span-2">
                                <label
                                    className="text-gray-800"
                                    htmlFor="school_name"
                                >Nombre del colegio:</label>
                                <input
                                    id="school_name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    placeholder="Ej. Brick in The Wall"
                                    name="school_name"
                                    defaultValue={student?.school_name}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-800"
                                    htmlFor="household_members"
                                >Número de personas en el hogar:</label>
                                <input
                                    id="household_members"
                                    type="number"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                    name="household_members"
                                    defaultValue={student?.household_members || ''}
                                />
                            </div>
                        </div>


                        {/**Contacto de emergencias  */}
                        <div className=" bg-red-50 rounded-xl pb-2">
                            <p className=' bg-red-500 font-semibold text-xl text-slate-800 pl-4 rounded-t-xl h-8 my-4 text-center p-1'>En caso de emergencia</p>

                            <label
                                className="text-gray-800 mt-4"
                                htmlFor="emergency_contact_name"
                            >Llamar a</label>
                            <input
                                id="emergency_contact_name"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. Juan Perez"
                                name="emergency_contact_name"
                                defaultValue={student?.emergency_contact_name}
                            />
                            <label
                                className="text-gray-800"
                                htmlFor="emergency_contact_phone"
                            >Celular:</label>
                            <input
                                id="emergency_contact_phone"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. 81234567"
                                name="emergency_contact_phone"
                                defaultValue={student?.emergency_contact_phone}
                            />
                            <label
                                className="text-gray-800"
                                htmlFor="emergency_contact_address"
                            >Dirección:</label>
                            <input
                                id="emergency_contact_address"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                placeholder="Ej. Stairway to Heaven"
                                name="emergency_contact_address"
                                defaultValue={student?.emergency_contact_address || ''}
                            />
                        </div>

                        <input
                            type="submit"
                            className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                            value='Actualizar datos del estudiante'
                        />

                    </div>
                </Form>


            </div>
        </>
    )
}
