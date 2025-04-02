import axios from "axios"
import { safeParse, string, number, pipe, transform, parse } from "valibot"
import { Student, StudentSchema, StudentWithEnrollmentSchema, DraftStudentSchema, StudentsSchema } from "../types/index"
import { convertToDate } from "../utils"

const token = localStorage.getItem('token')

type StudentData = {
    [k: string]: FormDataEntryValue;
}

export async function addStudent(data: StudentData) {
    try {
        const result = safeParse(DraftStudentSchema, {
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
            await axios.post(url, {
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
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            console.log('Se registro el usuario de forma correcta...')
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getStudents() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/students`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(data)
        const result = safeParse(StudentsSchema, data)
        console.log(result)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error al intentar Parsear los datos')
        }

    } catch (error) {
        console.log('Error al obtener los datos', error)
    }
}

export async function getStudentsById(id: Student['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/students/${id}`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const result = safeParse(StudentSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.error('Error al obtener los datos: ', error)
    }
}

export async function getStudentWithEnrollment(id: Student['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/students/${id}/enrollments`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const result = safeParse(StudentWithEnrollmentSchema, data)

        if (result.success) {
            return result.output
        } else {
            throw new Error("No se pudo parsear la respuesta con el esquema");

        }
    } catch (error) {
        console.log('Error al botener el estudiante con sus matriculas')
    }
}

export async function updateStudent(data: StudentData, id: Student['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(StudentSchema, {
            academic_level: data.academic_level,
            address: data.address,
            birth_date: data.birth_date,
            birthplace: data.birthplace,
            emergency_contact_address: data.emergency_contact_address,
            emergency_contact_name: data.emergency_contact_name,
            emergency_contact_phone: data.emergency_contact_phone,
            gender: data.gender,
            household_members: parse(NumberSchema, data.household_members),
            id,
            identity_card: data.identity_card,
            name: data.name,
            nationality: data.nationality,
            occupation: data.occupation,
            phone: data.phone,
            profession: data.profession,
            school_name: data.school_name
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/students/${id}`
            await axios.put(url, result.output, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            })
        }
    } catch (error) {
        console.log('Hubo el siguiente error', error)
    }
}
