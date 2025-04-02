import { AttendanceOfCourse } from "../types/index"

type AttendanceDetailsProps = {
    attendance: AttendanceOfCourse
}

export default function AttendanceDetails({ attendance }: AttendanceDetailsProps) {
    return (
        <tr key={attendance.enrollment_id} className="border-b">
            <td className="p-2">{attendance.student_name}</td>
            <td className="p-2 bg-green-600 ">
                <input
                    id='statusPresente'
                    type='radio'
                    name='status'
                    value="presente"
                />
            </td>
            <td className="p-2 bg-yellow-600">
                <input
                    id='statusJustificado'
                    type='radio'
                    name='status'
                    value="justificado"
                />
            </td>
            <td className="p-2 bg-red-600">
                <input
                    id='statusAusente'
                    type='radio'
                    name='status'
                    value="ausente"
                />
            </td>
        </tr>
    )
}
