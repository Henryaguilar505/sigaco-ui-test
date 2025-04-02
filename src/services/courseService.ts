import { safeParse } from "valibot"
import { Course, CourseNamesSchema, CoursesSchema, CourseWithStudentSchema, DraftCourseSchema } from "../types/index"
import axiosInstance from "../utils";

type CourseData = {
    [k: string]: FormDataEntryValue;
}

export async function getCourses() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/courses`
        const { data } = await axiosInstance(url)
        const result = safeParse(CoursesSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('No se pudo parsear los cursos')
        }
    } catch (error) {
        console.log('Error al obtener los cursos', error)
        throw error
    }
}

export async function getCourseById(id: Course['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/courses/${id}`
        const { data } = await axiosInstance(url)

        const result = safeParse(CourseWithStudentSchema, data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('No se puedo parsear el curso')
        }
    } catch (error) {
        console.log('Error al obtener el curso', error)
    }
}

export async function getCoursesName() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/courses-name`
        const { data } = await axiosInstance(url)
        const response = safeParse(CourseNamesSchema, data)
        if (response.success) {
            return response.output
        } else {
            throw new Error("No fue posible parsear los nombres de los cursos con el esquema establecido");

        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
    }
}

//Create
export async function addCourse(data: CourseData) {
    try {
        const result = safeParse(DraftCourseSchema, {
            course_name_id: +data.course_name_id,
            duration: +data.duration,
            start_date: data.start_date,
            user_id: 1,
            profesor_id: +data.profesor_id,
            shift_id: +data.shift_id,
            classroom_id: +data.classroom_id
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/courses`
            await axiosInstance.post(url, {
                course_name_id: result.output.course_name_id,
                duration: result.output.duration,
                start_date: result.output.start_date,
                user_id: result.output.user_id,
                profesor_id: result.output.profesor_id,
                shift_id: result.output.shift_id,
                classroom_id: result.output.classroom_id
            }
            )
            console.log('Se registro el curso de forma correcta')
        } else {
            throw new Error("Datos no validos");
        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
    }
}