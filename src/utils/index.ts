import axios from "axios";

export function convertToDate(value: FormDataEntryValue): Date | null {
    if (typeof value === "string") {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    }
    return null; // Devuelve null si es un archivo (File)
}

export function convertToHourMinute(time: string) {
    const [hours, minutes] = time.split(':');
    let period = "AM";

    let formattedHours = parseInt(hours);

    if (formattedHours >= 12) {
        period = "PM";
        if (formattedHours > 12) {
            formattedHours -= 12;
        }
    }

    if (formattedHours === 0) {
        formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`
}

export function formatDate(fechaISO: string): string {
    // Dividir la cadena YYYY-MM-DD en año, mes y día
    const [año, mes, dia] = fechaISO.split('-').map(Number);

    // Crear un objeto Date en la zona horaria local
    const fecha = new Date(año, mes - 1, dia); // Los meses en Date van de 0 a 11

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
        throw new Error("Fecha no válida");
    }

    // Obtener día, mes y año
    const diaFormateado = fecha.getDate();
    const mesFormateado = fecha.toLocaleString('es-ES', { month: 'long' }); // Nombre del mes en español
    const añoFormateado = fecha.getFullYear();

    // Formatear la fecha en el formato deseado
    return `${diaFormateado} de ${mesFormateado.charAt(0).toUpperCase() + mesFormateado.slice(1)} del ${añoFormateado}`;
}

//Instancia de Axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

//interceptor para incluir token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Eliminar el token inválido
            window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        }
        return Promise.reject(error);
    }
)

export default axiosInstance