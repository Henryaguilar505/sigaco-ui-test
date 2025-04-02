import { useLoaderData } from "react-router-dom";
import { getCourses } from "../services/courseService"
import { Course, CourseSchema } from "../types/index";
import { convertToHourMinute } from "../utils";
import { useEffect, useState } from "react";
import { exportReport } from "../services/reportsService";

export const ReportCard = () => {

    const [courses, setCourses] = useState<Course[] | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<string>('')
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchReportCourse = async () => {
            if (selectedCourse) {
                try {
                    const data = await exportReport(selectedCourse);

                    const url = window.URL.createObjectURL(data)
                    setFileUrl(url)
                } catch (error) {
                    console.log(error)

                }
            }
        }
        fetchReportCourse();
    }, [selectedCourse])

    const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
    }

    const handleDownload = () => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = `Reporte-${selectedCourse}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(fileUrl);
            setFileUrl(null);
        }
    }

    return (
        <main className="mx-auto flex flex-col sm:flex-row m-0 dark:bg-slate-900 w-full h-full">
            <div className='border dark:border-slate-700 p-4 rounded-xl mt-4 bg-blue-700 dark:bg-white font-bold text-lg'>
                <p>Cursos</p>
                <select
                    name="course_id"
                    id="course_id"
                    className="mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                    onChange={handleSelectedChange}
                >
                    <option value="" disabled selected>
                        Elija una opción
                    </option>
                    {courses?.map((course) => (
                        <option key={course.id} value={course.id}>
                            <p className="bg-slate-800">
                                {`${course.course_name.name + ' - ' + course.shift.days + ' de ' + convertToHourMinute(course.shift.start_time) + ' a ' + convertToHourMinute(course.shift.end_time)}`}
                            </p>
                        </option>
                    ))}
                </select>
                {
                    fileUrl && (
                        <button
                            className='bg-slate-400 dark:bg-black dark:text-slate-100 text-center p-2 rounded-lg m-4 font-semibold'
                            onClick={handleDownload}
                        >
                            Descargar
                        </button>
                    )
                }
            </div>
        </main>
    )
}
