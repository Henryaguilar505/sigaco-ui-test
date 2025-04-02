import { useNavigate } from 'react-router-dom'
import { DraftEnrollment, Enrollment } from "../types"


type EnrollmentDetailsProps = {
    enrollment: Enrollment
}

export default function EnrollmentDetails({ enrollment }: EnrollmentDetailsProps) {

    const navigate = useNavigate()
    return (
        <tr
            className="hover:bg-slate-300 dark:hover:bg-slate-800 dark:text-white">
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300">{enrollment.id}</td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left">{enrollment.name}</td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300   ">{enrollment.phone}</td>

            <td className="whitespace-nowrap border border-transparent border-b-slate-300">
                {enrollment.address.length > 30 ? `${enrollment.address.slice(0, 30)}...` : enrollment.address}
            </td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left pl-8">{(enrollment.emergency_contact_name)}</td>
            <td className=" whitespace-nowrap border border-transparent border-b-slate-300 text-left pl-8">{(enrollment.emergency_contact_phone)}</td>
            <td className="border border-transparent border-b-slate-300 text-left pl-8">
                <div className=" flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`registro/${enrollment.id}/editar`, {
                            state: {
                                enrollment
                            }
                        })}
                        className='bg-emerald-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>
                </div>
            </td>

        </tr>
    )
}
