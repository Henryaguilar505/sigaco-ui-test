import { useLocation, Link } from "react-router-dom"
import { AttendanceOfCourse } from "../types"
import { formatDate } from "../utils"


type attendanceDataType = {
    attendanceData: AttendanceOfCourse[],
    selectedCourse: string
}
export default function ShowAttendances() {

    const location = useLocation()
    const { attendanceData, selectedCourse } = location.state as attendanceDataType
    console.log('El curso elegido fue', selectedCourse)
    return (
        <div className='mt-12'>

            <p className='text-2xl text-center border-b border-slate-600 mb-8'>Asistencia del curso de <span className='font-black text-gray-700'>Diseño gráfico</span></p>
            <Link
                to={'/asistencia'}
                className="rounded bg-emerald-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-purple-900"

            >Volver a mostrar asistencia</Link>
            <div className=' m-auto mt-4'>
                <table>
                    <thead>
                        <tr>
                            <td className='font-bold text-xl border-2 border-black w-60'>Nombre</td>
                            {
                                attendanceData[0].attendances?.map(dates => (
                                    <td className="text-xs border-2 border-black transform rotate-90 w-16 h-20 p-0">{formatDate(dates.date)}</td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceData.map(attendance => (
                                <tr>
                                    <td className="text-sm border border-black">{attendance.student_name}</td>
                                    {
                                        attendance.attendances?.map(status => (
                                            <td className="text-xs font-thin border border-black text-center">{status.status}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className='flex flex-col items-end'>
                    <button className='bg-green-700 hover:bg-900 px-4 py-1 rounded-lg'>
                        Exportar
                    </button>
                </div>
            </div>
        </div>
    )
}
