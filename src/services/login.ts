import axios from "axios"

{/**funcion de login */ }

type credentialsProps = {
    email: string,
    password: string
}
const login = async (credenciales: credentialsProps) => {
    const url = `${import.meta.env.VITE_API_URL}/api/login`
    const { data } = await axios.post(url, credenciales)

    console.log(data)
    return data
}

export default { login }