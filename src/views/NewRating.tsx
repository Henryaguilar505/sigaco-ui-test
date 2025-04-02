import { useState, useEffect } from 'react'
import { Course, AttendanceOfCourse, Rating } from '../types'
import { getCourses } from '../services/courseService'
import { useLoaderData, Link } from 'react-router-dom'
import { getAttendanceOfCourse } from '../services/attendanceService'
import { convertToHourMinute } from '../utils'
import RatingModal from '../components/RatingModal'
import { getRatingOfCourse } from '../services/ratingsService'
import UpdateRatingModal from './UpdateRatingModal'

export async function loader() {
    const courses = await getCourses()
    return courses
}

export default function NewRating() {

    const courses = useLoaderData() as Course[]

    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [ratingData, setRatingData] = useState<Rating[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchratingData = async () => {
            if (selectedCourse) {
                try {
                    const data = await getRatingOfCourse(+selectedCourse)
                    setRatingData(data)
                } catch (error) {
                    setError('No se pudo cargar el registro de asistencias');
                }
            }
        };

        fetchratingData();
    }, [selectedCourse]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(event.target.value);
        setError(null); // Limpiar cualquier error anterior
    };

    return (
        <div className='mt-12'>
            <p className='text-2xl font-bold uppercase text-center'>Ingresar nuevas calificaciones</p>
            <div>
                <Link
                    to={'/calificaciones'}
                    className='bg-lime-300 rounded-lg p-2'
                >Regresar</Link>
            </div>

            <div>
                <label
                    htmlFor="course_id"
                    className=' flex flex-col '
                >Curso</label>
                <select
                    name="course_id"
                    id="course_id"
                    className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                    onChange={handleSelectChange}
                // defaultValue={enrollment[0].course_id}

                >
                    <option value="" disabled selected>Elija una opción</option>
                    {
                        courses.map(course => (
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
                {
                    ratingData ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Calificación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    ratingData.map(rating => {
                                        return (
                                            <tr
                                                key={rating.enrollment_id}>
                                                <td>{rating.enrollment_id}</td>
                                                <td>{rating.student_name}</td>
                                                <td>Ingrese una</td>
                                                <td>
                                                    {
                                                        !rating.grades[0].grade ? (
                                                            <button className="bg-fuchsia-800 rounded-lg border text-white p-2">
                                                                <RatingModal
                                                                    key={rating.enrollment_id}
                                                                    rating={rating}
                                                                    onUpdate={(updatedRating) => {
                                                                        setRatingData((prevData) =>
                                                                            prevData?.map((r) =>
                                                                                r.enrollment_id === updatedRating.enrollment_id ? updatedRating : r
                                                                            ) || null
                                                                        );
                                                                    }}
                                                                />
                                                            </button>
                                                        ) :
                                                            <button className="bg-fuchsia-800 rounded-lg border text-white p-2">
                                                                <UpdateRatingModal
                                                                    key={rating.enrollment_id}
                                                                    rating={rating}
                                                                    onUpdate={(updatedRating) => {
                                                                        setRatingData((prevData) =>
                                                                            prevData?.map((r) =>
                                                                                r.enrollment_id === updatedRating.enrollment_id ? updatedRating : r
                                                                            ) || null
                                                                        );
                                                                    }}
                                                                />
                                                            </button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <p>Elija un curso que disponga de matricula</p>
                    )
                }
            </div>
        </div>
    )
}
