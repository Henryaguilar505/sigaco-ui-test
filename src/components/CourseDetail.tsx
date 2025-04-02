import { Course } from '../types'
import { useNavigate } from 'react-router-dom'

type CourseDetailProps = {
    course: Course
}

const OpenIcon = <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24"
    height="24"
    stroke-width="3">
    <path d="M3 7v10l7 4v-18z"></path>
    <path d="M21 7v10l-7 4v-18z"></path>
</svg>

const UserIcon = <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24" height="24"
    stroke-width="3">
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
</svg>

const ClockIcon = <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24" height="24"
    stroke-width="3">
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    <path d="M12 12h-3.5"></path>
    <path d="M12 7v5"></path>
</svg>

const CalendarIcon = <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24"
    height="24"
    stroke-width="">
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
    <path d="M16 3v4"></path> <path d="M8 3v4"></path>
    <path d="M4 11h16"></path> <path d="M11 15h1"></path>
    <path d="M12 15v3"></path>
</svg>

export default function CourseDetail({ course }: CourseDetailProps) {
    const navigate = useNavigate()
    return (
        <div className="bg-yellow-200 p-4 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 hover:z-10 transition-all duration-300 relative">
            <div className='h-20 rounded-2xl text-center'>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{course.course_name.name}</h3>
            </div>
            {/* Información del Aula */}
            <div className="flex items-center gap-4 mb-4">
                {OpenIcon}
                <p className="text-sm text-gray-600">
                    Aula {course.classroom.number} (Capacidad: {course.classroom.capacity})
                </p>
                <button
                    onClick={() => navigate(`/matricula/registro/nuevo?id=${course.id}`)}
                    className=' px-4 py-2 text-sm font-bold text-green-600 rounded-lg hover:underline decoration-green-500 decoration-4'
                >Matricular estudiante</button>
            </div>

            {/* Maestro y Horario */}
            <div className="flex items-center gap-2 mb-4">
                {UserIcon}
                <p className="text-sm text-gray-600">{course.profesor.name}</p>
                <button
                    onClick={() => navigate(`/maestros/mostrar/${course.profesor.id}`)}
                    className=' px-4 py-2 text-sm font-bold text-green-600 rounded-lg hover:underline decoration-green-500 decoration-4'
                >Ver información del maestro</button>
            </div>

            <div className="flex items-center mb-4">
                <div className="flex items-center gap-2">
                    {ClockIcon}
                    <p className="text-sm text-gray-600 mr-8">
                        {course.shift.days} | {course.shift.start_time} - {course.shift.end_time}
                    </p>
                </div>

                {/* Fecha de inicio */}
                <div className="flex items-center gap-2">
                    {CalendarIcon}
                    <p className="text-sm text-gray-600">Inicio: {course.start_date}</p>
                </div>

            </div>
            <div className=' flex justify-end'>
                <button
                    onClick={() => navigate(`mostrar/${course.id}`, {
                        state: {
                            course
                        }
                    })}
                    className="mt-4 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Ver Detalles
                </button>
            </div>
            
        </div>
    )
}
