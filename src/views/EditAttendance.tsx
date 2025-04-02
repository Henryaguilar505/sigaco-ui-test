import { LoaderFunctionArgs, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { getAttendanceById } from '../services/attendanceService'
import { AttendanceWithEnrollmentId, EnrollmentWithStudent } from '../types'
import { getEnrollmentsById } from '../services/enrollmentService'
import ErrorMessage from '../components/ErrorMessage'
import { Link, Form } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const attendance = await getAttendanceById(+params.id)
        if (!attendance) {
            return redirect('/asistencia')
        }
        const student = await getEnrollmentsById(attendance.enrollment_id)

        return { attendance, student }
    }
}

export default function EditAttendance() {

    const { attendance, student } = useLoaderData() as {
        attendance: AttendanceWithEnrollmentId,
        student: EnrollmentWithStudent[]
    }

    const error = useActionData() as string

    console.log(attendance)
    return (
        <>
            <ToastContainer />
            <div className=" mt-16 sm:mt-12 sm:w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase mb-4">Editar datos de la matricula</h1>
                <Link
                    to={'/asistencia'}
                    className="rounded bg-emerald-700 p-3 ml-10 sm:ml-0 text-sm font-bold text-white shadow-sm hover:bg-purple-900"

                >Volver a mostrar asistencia</Link>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form
                    method='POST'
                >
                    <div className=" mt-12 w-3/4 m-auto">
                        <div>
                            <p>{student[0].student.name}</p>
                        </div>
                        <div>
                            <label
                                className="text-gray-800 flex flex-col"
                                htmlFor="enrollment_date"
                            >Fecha de matricula</label>
                            <input
                                id="date"
                                type="date"
                                className="mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="date"
                                defaultValue={attendance.date}

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
                                    value="presente"
                                    defaultChecked={attendance.status === 'presente'}
                                />
                                <label
                                    htmlFor='status'
                                    className=' mr-6'
                                >Presente</label>
                            </div>

                            <div className=" space-x-3">
                                <input
                                    id='status'
                                    type='radio'
                                    name='status'
                                    value="ausente"
                                    defaultChecked={attendance.status === 'ausente'}
                                />
                                <label
                                    htmlFor='status'
                                >Ausente</label>
                            </div>

                            <div className=" space-x-3">
                                <input
                                    id='status'
                                    type='radio'
                                    name='status'
                                    value="justificado"
                                    defaultChecked={attendance.status === 'justificado'}
                                />
                                <label
                                    htmlFor='status'
                                >Justificado</label>
                            </div>

                            <input
                                type="submit"
                                className="mt-5 w-full bg-emerald-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                                value='Actualizar los datos de asistencia'
                            />
                        </div>

                    </div>
                </Form>
            </div>
        </>
    )
}
