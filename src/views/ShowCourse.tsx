import { Link, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { getCourseById } from '../services/courseService'
import { CourseWithStudent } from '../types'

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const course = await getCourseById(+params.id)
        if (!course) {
            return redirect(`/cursos`)
        }
        return course
    }
}
export default function ShowCourse() {

    const course = useLoaderData() as CourseWithStudent

    const { students } = course

    const navigate = useNavigate()
    return (
        <div className='mt-12 w-4/5 m-auto'>
            <div className=' flex justify-between'>
                <Link
                    to="/cursos"
                    className="rounded bg-emerald-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-purple-900"
                >Volver a cursos</Link>
            </div>
            <h1 className='font-bold '>Información general del curso y sus respectivos estudiantes</h1>
            <div className="relative border border-gray-500 rounded-lg p-6 my-8  flex flex-col gap-4">
                <p className="absolute -top-4 left-4 bg-gray-100 px-2 text-lg font-bold text-green-600">Detalles del curso</p>
                <p className='text-gray-500 text-sm mb-1'>Curso de <span className='text-gray-900 font-medium'>{course.course_name.name}</span></p>

                <div className='flex gap-4'>
                    <p className='text-gray-500 text-sm mb-1'>Matriculados: <span className='text-gray-900 font-medium'>{(course.classroom.capacity) - 1} estudiantes de {course.classroom.capacity} permitidos </span></p>
                    <div className="relative group">
                        {/* <Link
                            to='/matricula/registro/nuevo'
                            className='bg-gray-200 border border-slate-600 rounded-md p-1 px-2 text-xs hover:bg-slate-300'
                        >Matricular estudiante</Link> */}
                        <button
                            onClick={() => navigate(`/matricula/registro/nuevo?id=${course.id}`)}
                            className=' px-4 py-2 text-sm font-bold text-green-600 rounded-lg hover:underline decoration-green-500 decoration-4'
                        >Matricular estudiante</button>
                        <p
                            className="w-52 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >Visitar la página de Registro nuevo
                        </p>
                    </div>
                </div>

                <div className='flex gap-10'>
                    <p className='text-gray-500 text-sm mb-1'>Aula: <span className='text-gray-900 font-medium'># {course.classroom.number}</span></p>
                    <p className='text-gray-500 text-sm mb-1'>Duración: <span className='text-gray-900 font-medium'>{course.duration} meses</span></p>
                    <p className='text-gray-500 text-sm mb-1'>Fecha de inicio: <span className='text-gray-900 font-medium'>{course.start_date}</span></p>
                </div>

                <div className='bg-gray-200 px-4'>
                    <p className='text-gray-800 text-sm font-bold mb-1'>Datos del maestro</p>
                    <p className='text-gray-500 text-sm mb-1'>Nombre: <span className='text-gray-900 font-medium'>{course.profesor.name}</span></p>
                    <p className='text-gray-500 text-sm mb-1'>Contacto: <span className='text-gray-900 font-medium'>+505 {course.profesor.phone}</span></p>
                    <button
                        onClick={() => navigate('/cursos')}
                        className='py-2 text-sm font-bold text-gray-600 rounded-lg hover:underline decoration-gary-600 decoration-2'
                    >Ver información del maestro</button>
                </div>

                <div className="flex justify-end">
                    <button
                        className='mt-4 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700'
                    >Editar</button>

                </div>
            </div>

            <div>
                <h2>Lista de estudiantes matriculados en el curso</h2>
                <table className='w-full text-center'>
                    <thead className='bg-slate-200 text-wrap'>
                        <tr className=' border-b-2 border-black'>
                            <th>Nombre</th>
                            <th>Cedula de identidad</th>
                            <th>Celular</th>
                            <th>Nivel academico</th>
                            <th>Nombre de la escuela</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr className="hover:bg-slate-300 dark:hover:bg-slate-800 dark:text-white">
                                <td className='text-start'>{student.name}</td>
                                <td>{student.identity_card}</td>
                                <td>{student.phone}</td>
                                <td>{student.academic_level}</td>
                                <td>{student.school_name}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/matricula/estudiante/${student.id}`, {
                                            state: {
                                                student
                                            }
                                        })}
                                        className='bg-emerald-500 text-white rounded-lg w-2/3 p-1 uppercase font-bold text-xs text-center'
                                    >Mostrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
