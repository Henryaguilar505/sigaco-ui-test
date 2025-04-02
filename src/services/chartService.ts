import { safeParse } from "valibot"
import { ChartDatas } from "../types/index"
import axiosInstance from "../utils"

export async function getPieChartData() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/charts/students-per-course`
        const { data } = await axiosInstance(url)
        const result = safeParse(ChartDatas, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('No se pudo parsear los cursos')
        }
    } catch (error) {
        console.log('Error al obtener los datos', error)
    }
}

export async function getEnrollmentPerMonth() {
    try {
        const url = '/api/charts/enrollments-per-month'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getActiveCourses() {
    try {
        const url = '/api/charts/active-courses'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getAverageCourse() {
    try {
        const url = '/api/charts/average-grades-per-course'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getStudentPerShift() {
    try {
        const url = '/api/charts/students-per-shift'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getAverageAttendancesPerMonth() {
    try {
        const url = '/api/charts/average-attendances-per-month'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getTotalActiveStudents() {
    try {
        const url = '/api/charts/total-active-students'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getTotalActiveProfessors() {
    try {
        const url = '/api/charts/total-active-professors'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getStudentsPerCourse() {
    try {
        const url = '/api/charts/students-per-course'
        const { data } = await axiosInstance(url)
        return data
    } catch (error) {
        console.log(error)
    }
}