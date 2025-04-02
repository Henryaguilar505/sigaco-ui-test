import { safeParse } from "valibot"
import axiosInstance from "../utils"
import { DraftUserDataSchema, UserDataSchema, UsersDataSchema, UserData as UserType, UserUpdateDataSchema } from "../types/index"

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addUser(data: UserData) {
    try {
        const result = safeParse(DraftUserDataSchema, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            phone: data.phone
        })

        if (result.success) {
            const url = '/api/users'
            await axiosInstance.post(url, {
                name: result.output.name,
                email: result.output.email,
                password: result.output.password,
                password_confirmation: result.output.password_confirmation,
                phone: result.output.phone
            })
            console.log('Se registro el usuario de forma correcta')
        } else {
            throw new Error("Datos inválidos")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUsers() {
    try {
        const { data } = await axiosInstance.get('/api/users')

        const result = safeParse(UsersDataSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("No se pudo parsear");
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUserData() {
    try {
        const { data } = await axiosInstance.get('/api/user')

        const result = safeParse(UserDataSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('No se pudo parsear los datos')
        }
    } catch (error) {
        console.log('Error al obtener los datos', error)
    }
}

export async function getUserById(user_id: UserType['id']) {
    try {
        const url = `/api/users/${user_id}`
        const { data } = await axiosInstance.get(url)
        const result = safeParse(UserDataSchema, data)
        console.log(data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("No se pudo parsear los datos");
        }
    } catch (error) {
        console.log(error)
    }
}


export async function updateUser(data: UserData, user_id: UserType['id']) {
    try {
        const result = safeParse(UserUpdateDataSchema, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            password_confirmation: data.password_confirmation,
            status: data.status
        })
        if (result.success) {
            const url = `/api/users/${user_id}`
            await axiosInstance.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}