import { DraftEnrollmentSchema, Enrollment, EnrollmentsSchema, EnrollmentsWithStudentSchema, EnrollmentUpdate } from "../types/index"
import { number, parse, pipe, safeParse, string, transform, } from "valibot"
import axios from "axios"
import axiosInstance, { convertToDate } from "../utils"

// const token = localStorage.getItem('token')

type EnrollmentData = {
    [k: string]: FormDataEntryValue;
}

//CRUD
//Create
export async function addEnrollment(data: EnrollmentData) {
    try {
        const result = safeParse(DraftEnrollmentSchema, {
            name: data.name,
            identity_card: data.identity_card,
            phone: data.phone,
            birth_date: convertToDate(data.birth_date),
            birthplace: data.birthplace,
            gender: data.gender,
            nationality: data.nationality,
            academic_level: data.academic_level,
            school_name: data.school_name,
            address: data.address,
            profession: data.profession,
            occupation: data.occupation,
            household_members: +data.household_members,
            emergency_contact_name: data.emergency_contact_name,
            emergency_contact_phone: data.emergency_contact_phone,
            emergency_contact_address: data.emergency_contact_address,
            enrollment_date: convertToDate(data.enrollment_date),
            course_id: +data.course_id
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/enrollments/store`
            await axiosInstance.post(url, {
                name: result.output.name,
                identity_card: result.output.identity_card,
                phone: result.output.phone,
                birth_date: result.output.birth_date,
                birthplace: result.output.birthplace,
                gender: result.output.gender,
                nationality: result.output.nationality,
                academic_level: result.output.academic_level,
                school_name: result.output.school_name,
                address: result.output.address,
                profession: result.output.profession,
                occupation: result.output.occupation,
                household_members: result.output.household_members,
                emergency_contact_name: result.output.emergency_contact_name,
                emergency_contact_phone: result.output.emergency_contact_phone,
                emergency_contact_address: result.output.emergency_contact_address,
                enrollment_date: result.output.enrollment_date,
                course_id: result.output.course_id
            }
            )
            console.log('Se registro la matricula de forma correcta')
        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error)
    }
}

//Read
export async function getEnrollment() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/students`
        const { data } = await axiosInstance.get(url)
        const result = safeParse(EnrollmentsSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Los datos de la API no corresponden a los datos del esquema')
        }

    } catch (error) {
        console.log('Error al obtener los datos', error)
    }
}

export async function getEnrollmentsById(id: Enrollment['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/enrollments/${id}`
        const { data } = await axiosInstance(url)

        const result = safeParse(EnrollmentsWithStudentSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('No se pudo parsear con el esquema')
        }
    } catch (error) {
        console.log('Hubo un error')
    }
}

//Update
export async function updateEnrollment(data: EnrollmentData, id: Enrollment['course_id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(EnrollmentUpdate, {
            id,
            status: data.status,
            enrollment_date: data.enrollment_date,
            course_id: parse(NumberSchema, data.course_id)
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/enrollments/${id}`
            await axiosInstance.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getEnrollmentPDF(id: Enrollment['id']) {
    try {
        const token = localStorage.getItem('token')
        const url = `${import.meta.env.VITE_API_URL}/api/enrollments/${id}/pdf`
        const data = await axios(url, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log('se obtuvo el pdf de la siguiente forma', data)
        return data
    } catch (error) {
        console.log(error)
    }

}
