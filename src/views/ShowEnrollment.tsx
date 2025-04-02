import { useNavigate } from 'react-router-dom'
import { Course, Enrollment } from '../types'

interface ShowEnrollmentProps {
    enrollment: Enrollment
    courses: Course[]
}

export default function ShowEnrollment({ enrollment, courses }: ShowEnrollmentProps) {
    const navigate = useNavigate()
    
    return (
        <>
            <div className=' flex flex-row justify-between  mt-8'>
                <p className='font-bold'>Datos de matricula</p>
                {enrollment.status !== 'finalizado' &&
                    <div className="relative group">
                        <button
                            onClick={() => navigate(`/registro/editar/${enrollment.id}`, {
                                state: {
                                    enrollment
                                }
                            })}
                            className='bg-green-700 hover:bg-green-900 rounded-md p-1 px-4 font-bold text-slate-800'
                        >Editar</button>
                        <p
                            className=" w-48 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-green-400 text-black text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >Editar los datos de la matricula</p>
                    </div>
                }
            </div>
            <div className="relative border border-gray-500 rounded-lg p-6 my-8 pt-10">

                <legend className="absolute -top-4 left-4 bg-gray-50 px-2 text-sm font-bold text-gray-600">
                    Información de matricula
                </legend>

                <div className="mt-4">
                    <label className="block text-gray-500 text-sm mb-1">Nombre de curso</label>
                    <p className="text-gray-900 font-medium">{courses[enrollment.course_id - 1].course_name.name}</p>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-500 text-sm mb-1">Estado</label>
                    <p className="text-gray-900 font-medium">{enrollment.status}</p>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-500 text-sm mb-1">Fecha de matricula</label>
                    <p className="text-gray-900 font-medium">{enrollment.enrollment_date}</p>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-500 text-sm mb-1">Número de matricula</label>
                    <p className="text-gray-900 font-medium">{enrollment.enrollment_number}</p>
                </div>
            </div>
        </>

    )
}
