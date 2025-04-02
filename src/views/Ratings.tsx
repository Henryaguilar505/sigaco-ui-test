import { useLoaderData, redirect, Form, ActionFunctionArgs, useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';
import { getCourses } from '../services/courseService';
import { Course, Rating } from '../types/index';
import { convertToHourMinute } from '../utils';
import { useEffect, useState } from 'react';
import { deleteRating, getRatingOfCourse } from '../services/ratingsService';
import UpdateRatingModal from './UpdateRatingModal';
import RatingModal from '../components/RatingModal';
import { toast, ToastContainer } from 'react-toastify';

export async function loader() {
    const courses = await getCourses();
    return courses;
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteRating(+params.id);
        return redirect('/calificaciones');
    }
    return null;
}

export default function Ratings() {
    const courses = useLoaderData() as Course[];
    const navigate = useNavigate();

    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [ratingData, setRatingData] = useState<Rating[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            if (selectedCourse) {
                try {
                    const data = await getRatingOfCourse(+selectedCourse);
                    setRatingData(data);
                } catch (error) {
                    toast.error('No se pudo cargar el registro de notas');
                }
            }
        };
        fetchAttendanceData();
    }, [selectedCourse]);

    useEffect(() => {
        const fetchRatings = async () => {
            if (selectedCourse) {
                try {
                    const data = await getRatingOfCourse(+selectedCourse);
                    setRatingData(data);
                } catch (error) {
                    console.log('No se pudo cargar el registro de notas');
                }
            }
        };
        fetchRatings();
    }, [navigate]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(event.target.value);
        setError(null);
    };

    const handleAddRating = (newRating: Rating) => {
        setRatingData((prevData) => {
            if (!prevData) return [newRating]

            //Verificación 
            const existingRatingIndex = prevData.findIndex(
                (r) => r.enrollment_id === newRating.enrollment_id
            )

            if (existingRatingIndex !== -1) {
                const updatedData = [...prevData]
                updatedData[existingRatingIndex] = newRating
                return updatedData
            }

            return [...prevData, newRating]
        })
    }

    const handleDelete = (enrollmentId: number) => {
        setRatingData((prevData) =>
            prevData?.filter((r) => r.enrollment_id !== enrollmentId) || null
        )
        toast.info('Se elimino la calificación')
    }

    return (

        <>
            <ToastContainer />
            <main className="mx-auto flex flex-col sm:flex-row m-auto dark:bg-slate-900">
                <Aside />
                <div className="mt-12 mx-6 w-full">
                    <p className=" font-bold text-2xl text-center my-4">Gestion de calificaciones</p>
                    <div className='flex flex-row gap-4'>
                        <label htmlFor="course_id" className="flex items-end font-bold text-xl">
                            Cursos
                        </label>
                        <select
                            name="course_id"
                            id="course_id"
                            className="mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled selected>
                                Elija una opción
                            </option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    <p className="bg-slate-800">
                                        {`${course.course_name.name + ' - ' + course.shift.days + ' de ' + convertToHourMinute(course.shift.start_time) + ' a ' + convertToHourMinute(course.shift.end_time)}`}
                                    </p>
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Calificación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ratingData ? (
                                    ratingData.map((rating) => {
                                        let grade = 0
                                        if (rating.grades === null) {
                                            grade = 0
                                        } else {
                                            grade = rating.grades[0]?.grade ?? 'N/A';
                                        }

                                        if (rating.grades !== null) {
                                            return (
                                                <tr key={rating.enrollment_id}>
                                                    <td>{rating.student_name}</td>
                                                    <td>{grade}</td>
                                                    <td>
                                                        <div className='flex flex-row gap-2 items-center'>
                                                            <button className="bg-amber-600 rounded-lg border text-white p-2 w-full">
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

                                                            {/* <Form
                                                                    className='w-full'
                                                                    method='POST'
                                                                    action={`eliminar/${rating.grades[0].id}`}
                                                                    onSubmit={() => setRatingData((prevData) => prevData?.filter((r) => r.enrollment_id !== rating.enrollment_id) || null)}
                                                                >
                                                                    <input
                                                                        type="submit"
                                                                        value='Eliminar'
                                                                        className="bg-pink-700 rounded-lg border text-white p-2 w-full"
                                                                    />
                                                                </Form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr key={rating.enrollment_id}>
                                                    <td>{rating.student_name}</td>
                                                    <td>
                                                        <button className="bg-lime-400 rounded-lg border text-white p-2 w-full">
                                                            <RatingModal
                                                                key={rating.enrollment_id}
                                                                rating={rating}

                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No hay datos disponibles</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table> */}

                    <div>
                        {ratingData ? (
                            <table className="sm:w-1/2 mt-8 m-auto">
                                <thead>
                                    <tr className='bg-slate-300 rounded rounded-t-lg'>
                                        <th className='text-left'>Nombre</th>
                                        <th>Calificación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {ratingData.map((rating) => {
                                        if (rating.grades !== null) {
                                            return (
                                                <tr key={rating.enrollment_id}>
                                                    <td>{rating.student_name}</td>
                                                    <td className='text-center'>{rating.grades[0].grade}</td>
                                                    <td>
                                                        <div className='flex flex-row gap-2 items-center'>
                                                            <button className="bg-green-600 rounded-lg border text-white p-2 w-full">
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
                                                            <Form
                                                                className='w-full'
                                                                method='POST'
                                                                action={`eliminar/${rating.grades[0].id}`}

                                                            >
                                                                <input
                                                                    type="submit"
                                                                    value='Eliminar'
                                                                    className="bg-red-600 rounded-lg border text-white p-2 w-full"
                                                                    onClick={() => handleDelete(rating.enrollment_id)}
                                                                />
                                                            </Form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr key={rating.enrollment_id}>
                                                    <td>{rating.student_name}</td>
                                                    <td>Ingrese una calificación</td>
                                                    <td>
                                                        <button className="bg-yellow-700 rounded-lg border text-white p-2 w-full">
                                                            <RatingModal
                                                                key={rating.enrollment_id}
                                                                rating={rating}
                                                                onAdd={handleAddRating}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <h1 className='text-center font-medium text-2xl mt-8 bg-slate-200'>Seleccione un curso</h1>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
