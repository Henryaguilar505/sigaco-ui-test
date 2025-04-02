import axios from "axios"
import { safeParse } from "valibot"
import { ShiftsSchema } from "../types/index"

const token = localStorage.getItem('token')

export async function getShifts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/shifts`

        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        })
        const response = safeParse(ShiftsSchema, data)
        if (response.success) {
            return response.output
        } else {
            throw new Error("No se pudo parsear el turno con el esquema establecido");

        }
    } catch (error) {
        console.log('Se presento el siguiente error ', error)
    }
}

