import { LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { getStudentWithEnrollment } from '../services/studentServices'
import { Course, Enrollment, StudentWithEnrollment } from '../types'
import { Link } from 'react-router-dom'
import ShowEnrollment from '../views/ShowEnrollment'
import { getCourses } from '../services/courseService'
import { getEnrollmentPDF } from '../services/enrollmentService'

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const [student, course] = await Promise.all([
            getStudentWithEnrollment(+params.id),

            getCourses()
        ])
        if (!student) {
            return redirect('/matricula')
        }
        return { student, course }
    }
}

// Imprimir PDF
export async function ShowPdf(id: Enrollment['id']) {
    const Pdf = await getEnrollmentPDF(id)

    const pdfUrl = URL.createObjectURL(Pdf?.data)

    window.open(pdfUrl)
}


export default function ShowStudent() {

    const { student, course } = useLoaderData() as {
        student: StudentWithEnrollment
        course: Course[]
    }
    const navigate = useNavigate()

    return (
        <div className='w-3/4 m-auto mt-12 rounded-xl p-4' >
            <div className=' flex justify-between gap-4'>
                <Link
                    to="/matricula"
                    className="rounded bg-yellow-700 p-3 text-sm text-center font-bold text-slate-700 shadow-sm hover:bg-yellow-600"
                >Volver a matricula</Link>

                <button
                    onClick={() => ShowPdf(student.enrollments[0].id)}
                    className="rounded bg-blue-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800"
                >Imprimir matricula</button>

            </div>

            <div className=' flex flex-row justify-between  mt-8'>
                <p className='font-bold'>Datos del estudiante</p>
                <div className="relative group">
                    <button
                        onClick={() => navigate(`/estudiante/mostrar/${student.id}/editar`, {
                            state: {
                                student
                            }
                        })}
                        className='bg-green-700 hover:bg-green-900 rounded-md p-1 px-4 font-bold text-slate-800'
                    >Editar</button>
                    <p
                        className=" w-48 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-green-400 text-black text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >Editar los datos del estudiante</p>
                </div>
            </div>

            <div className=' rounded-md mt-5'>
                <div className="relative border border-gray-500 rounded-lg p-6 my-8 sm:grid sm:grid-cols-2">
                    <p className="absolute -top-4 left-4 bg-gray-100 px-2 text-sm font-bold text-gray-600">
                        Información Personal
                    </p>

                    <div className="mt-4 col-span-2 sm:col-span-1">
                        <label className="block text-gray-500 text-sm mb-1">Nombre</label>
                        <p className="text-gray-900 font-medium">{student.name}</p>
                    </div>

                    <div className="mt-4 ">
                        <label className="block text-gray-500 text-sm mb-1">Celular</label>
                        <p className="text-gray-900 font-medium">{student.phone}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Cedula</label>
                        <p className="text-gray-900 font-medium">{student.identity_card}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Sexo</label>
                        <p className="text-gray-900 font-medium">{student.gender}</p>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Lugar de nacimiento</label>
                        <p className="text-gray-900 font-medium">{student.birthplace}</p>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Fecha de nacimiento</label>
                        <p className="text-gray-900 font-medium">{student.birth_date}</p>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Nacionalidad</label>
                        <p className="text-gray-900 font-medium">{student.nationality}</p>
                    </div>
                </div>

                <div className=' rounded-md mt-5'>
                    <div className="relative border border-gray-500 rounded-lg p-6 my-8">
                        <p className="absolute -top-4 left-4 bg-gray-100 px-2 text-sm font-bold text-gray-600">
                            Formación Académica
                        </p>
                        <div className="mt-4">
                            <label className="block text-gray-500 text-sm mb-1">Nivel Académico</label>
                            <p className="text-gray-900 font-medium">{student.academic_level}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-500 text-sm mb-1">Profesión</label>
                            <p className="text-gray-900 font-medium">{student.profession}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-500 text-sm mb-1">Oficio</label>
                            <p className="text-gray-900 font-medium">{student.occupation}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-500 text-sm mb-1">Nombre del colegio</label>
                            <p className="text-gray-900 font-medium">{student.school_name}</p>
                        </div>
                    </div>
                </div>

                <div className="relative border border-gray-500 rounded-lg p-6 my-8 pt-10">
                    <legend className="absolute -top-4 left-4 bg-gray-50 px-2 text-sm font-bold text-gray-600">
                        Información de residencia
                    </legend>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Dirección</label>
                        <p className="text-gray-900 font-medium">{student.address}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Número de personas en el hogar</label>
                        <p className="text-gray-900 font-medium">{student.household_members}</p>
                    </div>
                </div>

                <div className="relative border border-gray-500 rounded-lg p-6 my-8 pt-10">
                    <legend className="absolute -top-4 left-4 bg-gray-50 px-2 text-sm font-bold text-gray-600">
                        Contacto de emergencia
                    </legend>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Nombre</label>
                        <p className="text-gray-900 font-medium">{student.emergency_contact_name}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Celular</label>
                        <p className="text-gray-900 font-medium">{student.emergency_contact_phone}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-500 text-sm mb-1">Dirección</label>
                        <p className="text-gray-900 font-medium">{student.emergency_contact_address}</p>
                    </div>
                </div>
                {
                    student.enrollments.slice().reverse().map(enrollment => (
                        < ShowEnrollment
                            key = { enrollment.id }
                            enrollment = { enrollment }
                            courses = { course }
                        />
                    ))
                }
            </div>
        </div>
    )
}
