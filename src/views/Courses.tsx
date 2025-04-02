import Aside from '../components/Aside'
import { getCourses } from '../services/courseService'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Course } from '../types'
import CourseDetail from '../components/CourseDetail'
import Tooltip from '../components/ToolTip'

export async function loader() {
    const courses = await getCourses()
    return courses
}

export default function Courses() {

    const courses = useLoaderData() as Course[]

    const navigate = useNavigate()
    return (
        <div className='mx-auto flex flex-col sm:flex-row m-auto'>
            <Aside />
            <div className='mt-12 sm:mx-6 w-full'>
                <p className='text-2xl mb-6'>Lista de los cursos disponibles</p>
                <div className='flex justify-end'>
                    <Tooltip text="Aperturar un nuevo curso">
                        <button
                            onClick={() => navigate('nuevo')}
                            className="mt-4 px-4 py-2 text-white text-xl bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            Aperturar
                        </button>
                    </Tooltip>
                </div>


                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-2 gap-4'>
                    {
                        courses.map(course => (
                            <CourseDetail
                                key={course.id}
                                course={course}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
