import { Attendance, AttendancesOfCourse, AttendanceUpdateSchema, AttendanceWithEnrollmentIdSchema, Course } from '../types/index';
import { safeParse } from 'valibot';
import axiosInstance from '../utils';

type AttendanceData = {
    [k: string]: FormDataEntryValue;
}

export async function getAttendanceOfCourse(course_id: Course['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/attendances/course/${course_id}`
        const { data } = await axiosInstance.get(url)
        console.log(data)
        const result = safeParse(AttendancesOfCourse, data)
        console.log(result)
        if (result.success) {
            return result.output
        } else {
            throw new Error("No fue posible parsear las asistencias del curso con el esquema establecido");
        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
        throw error
    }

}

export async function markAttendance(
    enrollmentId: number,
    date: string,
    status: string
): Promise<boolean> {
    try {
        const url = `/api/attendances/store`
        //La url solo necesita /api/attendances/store?
        const response = await axiosInstance.post(
            url,
            {
                enrollment_id: enrollmentId,
                date: date,
                status: status,
            }
        )
        return response.status === 200
    } catch (error) {
        console.error('Error al registrar la asistencia', error);
        return false;
    }
}

export async function getAttendanceById(attendance_id: Attendance['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/attendances/${attendance_id}`
        const { data } = await axiosInstance(url)
        const result = safeParse(AttendanceWithEnrollmentIdSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("No fue posible parsear los datos con el esquema establecido");
        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
    }
}

export async function updateAttendance(data: AttendanceData, attendance_id: Attendance['id']) {
    try {
        const result = safeParse(AttendanceUpdateSchema, {
            date: data.date,
            status: data.status
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/attendances/${attendance_id}`
            await axiosInstance.put(url, result.output)
        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
    }
}