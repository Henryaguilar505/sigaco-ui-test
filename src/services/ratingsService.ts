import axios from "axios";
import { Course, DraftRating, DraftRatingSchema, Grade, GradeSchema, RatingsSchema } from "../types/index";
import { safeParse } from "valibot";
import axiosInstance from "../utils";

const token = localStorage.getItem('token')

export async function getRatingOfCourse(course_id: Course['id']) {
    try {
        const url = `/api/grades/course/${course_id}`

        const { data } = await axiosInstance(url)
        const result = safeParse(RatingsSchema, data)
        console.log(result)

        if (result.success) {
            return result.output
        } else {
            throw new Error("No fue posible parsear los datos con el esquema establecido");
        }
    } catch (error) {
        console.log('Error: ', error)
        throw error

    }
}

export async function addRating(enrollment_id: DraftRating['enrollment_id'], grade: DraftRating['grade']) {
    try {
        const result = safeParse(DraftRatingSchema, {
            enrollment_id: +enrollment_id,
            grade: +grade
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/grades/store`

            await axios.post(url, {
                enrollment_id: result.output.enrollment_id,
                grade: result.output.grade
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )

        } else {
            throw new Error("Datos no validos")
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error al agregar la calificación");
        
    }
}

//DELETE
export async function deleteRating(grade_id: Grade['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/grades/${grade_id}`

        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }

}

export async function updateRating(grade_id: Grade['id'], grade: Grade['grade']) {
    try {
        const result = safeParse(GradeSchema, {
            grade: grade
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/grades/${grade_id}`

            await axios.put(url, result.output, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}