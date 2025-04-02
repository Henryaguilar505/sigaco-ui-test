import axios from "axios"
import { safeParse } from "valibot"
import { SchedulesSchema } from "../types/index"

const token = localStorage.getItem('token')

export async function getSchedules() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/shifts`
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const result = safeParse(SchedulesSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log('Error al obtener los datos', error)
    }
}