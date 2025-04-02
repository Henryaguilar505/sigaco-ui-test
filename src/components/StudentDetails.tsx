import { useNavigate } from 'react-router-dom'
import { Student } from "../types"

type StudentDetailsProps = {
    student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {

    const navigate = useNavigate()

    return (
        <tr className="hover:bg-slate-300 dark:hover:bg-slate-800 dark:text-white">
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left">{student.name}</td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300   ">{student.phone}</td>

            <td className="whitespace-nowrap border border-transparent border-b-slate-300">
                {student.address.length > 30 ? `${student.address.slice(0, 30)}...` : student.address}
            </td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left pl-8">{(student.emergency_contact_name)}</td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left pl-8">{(student.emergency_contact_phone)}</td>
            <td className="border border-transparent border-b-slate-300 text-left pl-8">
                <div className=" flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`estudiante/${student.id}`, {
                            state: {
                                student
                            }
                        })}
                        className='bg-green-700 hover:bg-green-900 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Mostrar</button>
                </div>
            </td>

        </tr>
    )
}
