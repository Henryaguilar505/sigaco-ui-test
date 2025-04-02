import { safeParse } from "valibot"
import { ClassroomsSchema } from "../types/index"
import axiosInstance from "../utils"

export async function getClassrooms() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/classrooms`

        const { data } = await axiosInstance(url)
        const response = safeParse(ClassroomsSchema, data)
        if (response.success) {
            return response.output
        }else{
            throw new Error("NO se pudo parsear el aula con el esquema establecido");
            
        }
    } catch (error) {
        console.log('Se presento el siguiente error ', error)
    }
}