import { useLoaderData } from "react-router-dom"
import { getTeachers } from "../services/teacherServices"
import { Teacher } from "../types"

export async function loader() {
    const teachers = await getTeachers()
    console.log(teachers)
    return teachers
}

export default function TeacherDetails() {

    const teachers = useLoaderData() as Teacher[]
    return (
        <div className='mt-12'>TeacherDetails</div>
    )
}
