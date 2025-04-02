import React, { useEffect, useState } from 'react';
import { markAttendance } from '../services/attendanceService';
import { getAttendanceOfCourse } from '../services/attendanceService';
import Aside from '../components/Aside';
import { Link, useSearchParams } from 'react-router-dom';
import { getCourses } from '../services/courseService';
import { Course, AttendanceOfCourse } from '../types';
import { convertToHourMinute } from '../utils';
import { ToastContainer, toast } from "react-toastify";

export default function NewAttendance() {
    const [searchParams] = useSearchParams()
    const idParam = searchParams.get('course_id')
    const date = searchParams.get('date')
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [attendanceData, setAttendanceData] = useState<AttendanceOfCourse[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(date);
    const [attendance, setAttendance] = useState<{ [date: string]: { [enrollmentId: number]: 'presente' | 'ausente' | 'justificado' | null } }>({});


    // Obtener los cursos al cargar el componente
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data)
            } catch (error) {
                setError('No se pudieron cargar los cursos')
                toast.error('No se pudieron cargar los cursos')
            }
        };

        fetchCourses();
    }, []);

    // Mostrar los estudiantes del curso
    useEffect(() => {
        const fetchAttendanceData = async () => {
            const idCourse = idParam ? idParam : selectedCourse
            if (idCourse) {
                try {
                    const data = await getAttendanceOfCourse(+idCourse);
                    setAttendanceData(data);
                } catch (error) {
                    setError('No se pudo cargar el registro de asistencias')
                    toast.error('No se pudo cargar el registro de asistencias')
                }
            }
        };

        fetchAttendanceData();
    }, [selectedCourse]);

    // Recuperar asistencias del localStorage al cargar la página
    useEffect(() => {
        const savedAttendance = localStorage.getItem('attendance');
        if (savedAttendance) {
            setAttendance(JSON.parse(savedAttendance));
        }
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(event.target.value);
        setError(null); // Limpiar cualquier error anterior
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    // Función para manejar el registro de asistencia
    const handleMarkAttendance = async (enrollmentId: number, status: 'presente' | 'ausente' | 'justificado') => {
        if (!selectedDate) {
            toast.warn('Por favor, seleccione una fecha.');
            return
        }

        try {
            // Enviar la asistencia a la API
            const success = await markAttendance(enrollmentId, selectedDate, status)
            
            if (!success) {
                toast.error('Error al registrar la asistencia')
            }

            // Actualizar el estado local solo si la API responde correctamente
            setAttendance((prev) => ({
                ...prev,
                [selectedDate]: {
                    ...prev[selectedDate],
                    [enrollmentId]: status,
                },
            }));

            // Guardar en el localStorage
            localStorage.setItem('attendance', JSON.stringify(attendance));

            // Mostrar un mensaje de éxito
            toast.success('Asistencia registrada correctamente')
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al registrar la asistencia.');
        }
    };

    if (error) {
        return <div>{error}</div>
    }

    const currentAttendances = selectedDate ? attendance[selectedDate] || {} : {};

    return (
        <div className="flex flex-col sm:flex-row dark:bg-slate-900">
            <ToastContainer 
            autoClose={1000}
            />
            <Aside />
            <div className="mt-12 w-3/4 m-auto">
                <h1 className="font-bold text-2xl text-center uppercase">Registro de Asistencia</h1>
                <Link
                    to="/asistencia"
                    className="rounded bg-emerald-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-purple-900"
                >
                    Volver a asistencia
                </Link>

                <label htmlFor="course_id">Grupo</label>
                <select
                    name="course_id"
                    id="course_id"
                    className="mt-4 rounded-md w-10/12 text-center"
                    value={selectedCourse || ''}
                    // defaultValue={idParam === null ? '' : parseInt(idParam)}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled selected>Elija una opción</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{`${course.course_name.name} de ${convertToHourMinute(course.shift.start_time)} - ${convertToHourMinute(course.shift.end_time)}`}</option>
                    ))}
                </select>

                <div>
                    <label htmlFor="dateInput">Seleccione una fecha:</label>
                    <input
                        type="date"
                        id="dateInput"
                        value={selectedDate || ''}
                        onChange={handleDateChange}
                    />
                </div>

                {attendanceData ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Nombre</th>
                                <th className="p-2 bg-green-600">Presente</th>
                                <th className="p-2 bg-red-600">Ausente</th>
                                <th className="p-2 bg-yellow-600">Justificado</th>
                                <th className="p-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((student) => {
                                const studentAttendance = currentAttendances[student.enrollment_id] || null;

                                return (
                                    <tr key={student.enrollment_id}>
                                        <td>{student.student_name}</td>
                                        <td className="p-2 bg-green-600 hover:bg-green-800 hover:text-white">
                                            <button
                                                onClick={() => handleMarkAttendance(student.enrollment_id, 'presente')}
                                                className="w-full h-full"
                                                disabled={!!studentAttendance} // Deshabilitar si ya tiene una asistencia
                                            >
                                                Presente
                                            </button>
                                        </td>
                                        <td className="p-2 bg-red-600 hover:bg-red-800 hover:text-white">
                                            <button
                                                onClick={() => handleMarkAttendance(student.enrollment_id, 'ausente')}
                                                className="w-full h-full"
                                                disabled={!!studentAttendance} // Deshabilitar si ya tiene una asistencia
                                            >
                                                Ausente
                                            </button>
                                        </td>
                                        <td className="p-2 bg-yellow-600 hover:bg-yellow-800 hover:text-white">
                                            <button
                                                onClick={() => handleMarkAttendance(student.enrollment_id, 'justificado')}
                                                className="w-full h-full"
                                                disabled={!!studentAttendance} // Deshabilitar si ya tiene una asistencia
                                            >
                                                Justificado
                                            </button>
                                        </td>
                                        <td className="w-20">
                                            {studentAttendance && (
                                                <span
                                                    className={`p-2 rounded ${studentAttendance === 'presente'
                                                        ? 'bg-green-600'
                                                        : studentAttendance === 'ausente'
                                                            ? 'bg-red-600'
                                                            : 'bg-yellow-600'
                                                        } text-white`}
                                                >
                                                    {studentAttendance}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className='text-2xl font-bold text-center'>Seleccione un Curso</p>
                )}
            </div>
        </div>
    )
}