import { safeParse } from "valibot"
import { DraftTeacherSchema, Teacher, TeacherSchema, TeachersSchema, TeacherUpdateSchema } from "../types/index"
import axiosInstance from "../utils"

type TeacherData = {
    [k: string]: FormDataEntryValue;
}

//Create
export async function addTeacher(data: TeacherData) {
    try {
        const result = safeParse(DraftTeacherSchema, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address
        })

        if (result.success) {
            const url = '/api/professors/store'
            await axiosInstance.post(url, {
                name: result.output.name,
                email: result.output.email,
                phone: result.output.phone,
                address: result.output.address
            })
            console.log('Se registro el maestro de forma correcta')
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log('Se presento el siguiente error', error)
    }
}

export async function getTeachers() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/professors`

        const { data } = await axiosInstance.get(url)
        const result = safeParse(TeachersSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("No se pudo parsear el profesor con el esquema establecido");

        }
    } catch (error) {
        console.log('Hubo el siguiente error ', error)
    }
}

export async function getTeacherById(professor_id: Teacher['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/professors/${professor_id}`

        const { data } = await axiosInstance.get(url)
        console.log(data)
        const result = safeParse(TeacherSchema, data)
        if (result.success) {
            console.log(result.output)
            return result.output
        } else {
            throw new Error("No se pudo parsear los datos con el esquema establecido")
        }
    } catch (error) {
        console.log(error)
    }
}


//Update
export async function updateTeacher(data: TeacherData, id: Teacher['id']) {
    try {
        const result = safeParse(TeacherUpdateSchema, {
            address: data.address,
            email: data.email,
            name: data.name,
            phone: data.phone,
            status: data.status
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/professors/${id}`
            await axiosInstance.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}
