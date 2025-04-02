import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/courseService';
import { getAttendanceOfCourse } from '../services/attendanceService';
import { Course, AttendanceOfCourse, Attendance } from '../types';
import Aside from '../components/Aside';
import { convertToHourMinute, formatDate } from '../utils';
import Tooltip from '../components/ToolTip';
import { useNavigate } from 'react-router-dom';

const iconX =
    <div className="relative group">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F00"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24" height="24"
            stroke-width="3">
            <path d="M7 4l10 16"></path>
            <path d="M17 4l-10 16"></path>
        </svg>
        <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >Ausente</div>
    </div>

const iconCircleYellow =
    <div className="relative group">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#D97706"
            width="24"
            height="24">
            <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"></path>
        </svg>
        <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >Justificado</div>
    </div>

const iconCheck = <div className="relative group">
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#047857"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="24" height="24"
        stroke-width="3">
        <path d="M5 12l5 5l10 -10"></path> </svg>
    <div
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
    >Presente</div>
</div>



const AttendanceComponent: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [attendanceData, setAttendanceData] = useState<AttendanceOfCourse[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                setError('No se pudieron cargar los cursos');
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            if (selectedCourse) {
                try {
                    const data = await getAttendanceOfCourse(+selectedCourse)
                    setAttendanceData(data)
                } catch (error) {
                    setError('No se pudo cargar el registro de asistencias');
                }
            }
        };

        fetchAttendanceData();
    }, [selectedCourse]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(event.target.value);
        setError(null); // Limpiar cualquier error anterior
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const getAttendancesByDate = (attendances: Attendance[], date: string) => {
        return attendances.filter(attendance => attendance.date === date)
    }

    console.log(attendanceData)

    const navigate = useNavigate()

    return (
        <>
            <main className="mx-auto flex flex-col sm:flex-row m-auto dark:bg-slate-900">
                <Aside />
                <div className="mt-12 sm:mx-6 w-full">
                    <p className=" font-bold text-2xl text-center">Gestion de asistencia</p>

                    {/* <div className='flex justify-end'>
                        <Tooltip text="Agregar asistencia">
                            <button
                                onClick={() => navigate('nuevo')}
                                className="mt-4 px-4 py-2 text-white text-xl bg-green-600 rounded-lg hover:bg-green-700"
                            >
                                Marcar asistencia
                            </button>
                        </Tooltip>
                    </div> */}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <section className=" sm:w-2/5 px-4 border-r-2 border-slate-700">
                            <p className="font-bold text-xl text-green-700 text-center">Seleccione un día</p>
                            <div className="w-full m-auto rounded-lg my-4">
                                <div className='flex justify-center'>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        className='bg-slate-200 w-1/2 text-xl font-bold p-4 rounded-lg shadow-md'
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                            </div>

                            <label
                                htmlFor="course_id"
                                className="font-bold text-xl text-green-700 flex justify-center mb-2"
                            >Grupo</label>
                            <div className='flex justify-center'>
                                <select
                                    name="course_id"
                                    id="course_id"
                                    className='bg-slate-200 w-1/2 text-xl font-bold p-4 rounded-lg shadow-md'
                                    value={selectedCourse}
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled selected>Elija una opción</option>
                                    {
                                        courses.map(course => (
                                            <option value={course.id}>{`${course.course_name.name} de ${convertToHourMinute(course.shift.start_time)} - ${convertToHourMinute(course.shift.end_time)}`}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='h-4 mt-4'>
                                {error && <p className='text-red-700 bg-red-400 text-center py-2 font-bold rounded-lg'>{error}</p>}

                            </div>

                        </section>

                        <section className="sm:w-3/5 ">

                            {
                                attendanceData ? (
                                    <>
                                        <div className='h-4 mb-4'>
                                            {
                                                selectedDate && <p className='font-bold text-gray-600'>Asistencia para el día {formatDate(selectedDate)}</p>
                                            }
                                        </div>
                                        <table className="w-full text-center bg-slate-300 mx-1 sm:mx-0">
                                            <thead className="bg-slate-200 dark:bg-slate-700 dark:text-white text-wrap">
                                                <tr>
                                                    <th>ID</th>
                                                    <th className="text-left pl-8">Nombre</th>
                                                    <th className='text-left'>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    attendanceData.reverse().map(attendance => {
                                                        if (attendance.attendances !== null) {
                                                            const filteredAttendances = getAttendancesByDate(attendance.attendances, selectedDate);
                                                            if (filteredAttendances.length > 0) {
                                                                return (
                                                                    <tr key={attendance.enrollment_id}
                                                                        className="border-b border-black">
                                                                        <td>{attendance.enrollment_id}</td>
                                                                        <td className="text-left pl-8">{attendance.student_name}</td>
                                                                        <td className="justify-center">
                                                                            {filteredAttendances[0].status === 'presente' ? iconCheck
                                                                                : filteredAttendances[0].status === 'ausente' ? iconX
                                                                                    : iconCircleYellow}
                                                                        </td>

                                                                        <td>
                                                                            <button
                                                                                onClick={() => navigate(`modificar/${filteredAttendances[0].id}`, {
                                                                                    state: {
                                                                                        attendance
                                                                                    }
                                                                                })}
                                                                                className='bg-green-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                                                                            >Modificar</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            } else {
                                                                return (
                                                                    <tr key={attendance.enrollment_id}
                                                                        className="border-b border-black">
                                                                        <td>{attendance.enrollment_id}</td>
                                                                        <td className="text-left pl-8">{attendance.student_name}</td>
                                                                        <td className="justify-center">
                                                                            <p className='font-thin text-sm'>No hay</p>
                                                                        </td>

                                                                        <td>
                                                                            <button
                                                                                onClick={() => navigate(`nuevo?course_id=${+selectedCourse}&date=${selectedDate}`)}
                                                                                className="bg-blue-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                                                                            >
                                                                                Marcar asistencia
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                    })}
                                            </tbody>
                                        </table>
                                        <div>
                                            <button className='bg-green-700 mt-4 px-3 py-2 rounded-lg font-bold hover:bg-green-700'
                                                onClick={() => navigate('mostrar', {
                                                    state: {
                                                        attendanceData,
                                                        selectedCourse: '1'
                                                    }
                                                })}
                                            >
                                                Mostrar toda la sistencia
                                            </button>
                                        </div>
                                        {/* USar Estado Local con Redux */}
                                    </>
                                ) :
                                    (
                                        <p className='text-2xl font-bold text-center'>Seleccione un Curso</p>
                                    )
                            }
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AttendanceComponent;


