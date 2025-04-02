import Footer from "./Footer"
import Aside from "../components/Aside"
import { Link, useLoaderData } from 'react-router-dom'
import { getStudents } from "../services/studentServices"
import { Student } from "../types"
import StudentDetails from "../components/StudentDetails"
import { useState } from "react"
/**Para agregar la ventana modal ver el video 202 del curso fullStack */

export async function loader() {
    const students = await getStudents()
    return students
}

export default function Enrollments() {

    const students = useLoaderData() as Student[]



    const [nameFilter, setNameFilter] = useState<string>('');
    const [phoneFilter, setPhoneFilter] = useState<string>('');
    const [addressFilter, setAddressFilter] = useState<string>('')


    const filteredStudents = students.filter((student) => {
        const matchesName = student.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesPhone = student.phone.includes(phoneFilter);
        const matchesAddress = student.address.toLowerCase().includes(addressFilter.toLowerCase());
        return matchesName && matchesPhone && matchesAddress;
    })

    return (
        <>
            <main className="mx-auto flex flex-col sm:flex-row m-auto dark:bg-slate-900">
                <Aside />
                <div className=" mt-12 mx-6 w-full">
                    <p className=" font-bold text-2xl text-center my-4">Gestion de asistencia</p>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-end border-b-2 border-black dark:border-white pb-4 my-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por nombre"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-400 rounded-lg w-full"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                width="24" height="24"
                                stroke-width="2">
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                                <path d="M21 21l-6 -6">
                                </path>
                            </svg>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Burcar por teléfono"
                                value={phoneFilter}
                                onChange={(e) => setPhoneFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-400 rounded-lg w-full"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                width="24" height="24"
                                stroke-width="2">
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                            </svg>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por dirección"
                                value={addressFilter}
                                onChange={(e) => setAddressFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-400 rounded-lg w-full"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                width="24" height="24"
                                stroke-width="2">
                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                            </svg>
                        </div>

                        <Link
                            to='registro/nuevo'
                            className='bg-blue-700 text-white h-10 px-2 rounded-md flex gap-2 items-center hover:bg-blue-900 dark:hover:bg-indigo-400'
                        >
                            <p className="px-3 font-bold">Nuevo</p>
                        </Link>
                    </div>

                    <div className=" container bg-emerald-300">
                    </div>

                    <p className=" text-xl font-bold text-wrap my-4 dark:text-white">
                        Lista de todos los estudiantes <span className="text-sm">incluye todos los cursos</span>
                    </p>
                    <div className=" overflow-auto rounded-lg">
                        <table className="w-full text-center">
                            <thead className="bg-slate-200 dark:bg-slate-700 dark:text-white text-wrap">
                                <tr>
                                    <th className=" w-20 pl-4 text-left">Nombre</th>
                                    <th className=" px-3">Celular</th>
                                    <th className=" px-3">Dirección</th>
                                    <th className=" w-4 px-3">Contacto de emergencia</th>
                                    <th className=" w-4 px-3">Número</th>
                                    <th className=" w-4 px-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <StudentDetails key={student.id} student={student} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    )
}
