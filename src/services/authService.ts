import axiosInstance from "../utils";

export const logout = async(): Promise<void> => {
    try {
        await axiosInstance.post('/api/logout')
    } catch (error) {
        console.error('Error al cerrar sesión', error)
        throw error
    }
}