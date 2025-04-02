import { ActionFunctionArgs, Link, Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { getEnrollmentsById } from '../services/enrollmentService'
import { Course, EnrollmentWithStudent } from '../types'
import { getCourses } from '../services/courseService'
import { convertToHourMinute } from '../utils'
import { updateEnrollment } from '../services/enrollmentService'
import ErrorMessage from '../components/ErrorMessage'
import { toast, ToastContainer } from 'react-toastify'

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const [enrollment, course] = await Promise.all([
            getEnrollmentsById(+params.id),
            getCourses()
        ])

        if (!enrollment) {
            return redirect(`estudiante/mostrar/${params.id}`)
        }
        return { enrollment, course }
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }

    if (params.id !== undefined) {
        await updateEnrollment(data, +params.id)
        toast.success('Datos actualizados')
        return redirect(`/estudiante/mostrar/${params.id}`)
    }
}

export default function EditEnrollment() {

    const { enrollment, course } = useLoaderData() as {
        enrollment: EnrollmentWithStudent[],
        course: Course[]
    }

    const error = useActionData() as string

    return (
        <>
            <ToastContainer
                autoClose={5000}
            />
            <div className=" mt-12 sm:w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase mb-4">Editar datos de la matricula</h1>
                <Link
                    to={`/matricula/estudiante/${enrollment[0].student.id}`}
                    className="rounded bg-yellow-700 p-3 ml-10 sm:ml-0 text-sm font-bold text-slate-700 shadow-sm hover:bg-yellow-600"

                >Volver a mostra los datos</Link>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form
                    method='POST'
                >
                    <div className=" mt-12 w-3/4 m-auto">
                        <div className="col-span-3 w-full">
                            <div className='flex gap-4 mb-4'>
                                <label
                                    className="text-gray-800 flex flex-col justify-center"
                                    htmlFor="enrollment_number"
                                >Número de matricula</label>
                                <input
                                    type="text"
                                    name="enrollment_number"
                                    id="enrollment_number"
                                    className=" mt-2 block h-12 p-3 bg-transparent rounded-lg w-1/2 font-bold"
                                    defaultValue={enrollment[0].enrollment_number}
                                    disabled
                                />
                            </div>

                            <label
                                htmlFor="course_id"
                                className=' flex flex-col '
                            >Curso</label>
                            <select
                                name="course_id"
                                id="course_id"
                                className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                                defaultValue={enrollment[0].course_id}

                            >
                                <option value="" disabled selected>Elija una opción</option>
                                {
                                    course.map(course => (
                                        <option
                                            key={course.id}
                                            value={course.id}>
                                            <p className=" bg-slate-800">
                                                {`${course.course_name.name + ' - ' + course.shift.days + ' de ' + convertToHourMinute(course.shift.start_time) + ' a ' + convertToHourMinute(course.shift.end_time)}`}
                                            </p>
                                        </option>

                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label
                                className="text-gray-800 flex flex-col"
                                htmlFor="enrollment_date"
                            >Fecha de matricula</label>
                            <input
                                id="enrollment_date"
                                type="date"
                                className="mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="enrollment_date"
                                defaultValue={enrollment[0].enrollment_date}

                            />
                        </div>

                        <div className=" w-full space-y-2">
                            <label
                                className="text-gray-800 mr-6 flex"
                                htmlFor="status"
                            >Estado</label>
                            <div className=" space-x-3">
                                <input
                                    id='status'
                                    type='radio'
                                    name='status'
                                    value="activo"
                                    defaultChecked={enrollment[0].status === 'activo'}
                                />
                                <label
                                    htmlFor='status'
                                    className=' mr-6'
                                >Activo</label>
                            </div>

                            <div className=" space-x-3">
                                <input
                                    id='status'
                                    type='radio'
                                    name='status'
                                    value="inactivo"
                                    defaultChecked={enrollment[0].status === 'inactivo'}
                                />
                                <label
                                    htmlFor='status'
                                >Inactivo</label>
                            </div>

                            <div className=" space-x-3">
                                <input
                                    id='status'
                                    type='radio'
                                    name='status'
                                    value="completado"
                                    defaultChecked={enrollment[0].status === 'completado'}
                                />
                                <label
                                    htmlFor='gender'
                                >Completado</label>
                            </div>

                            <input
                                type="submit"
                                className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                                value='Actualizar los datos de matricula'
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}
