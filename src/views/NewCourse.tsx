import ErrorMessage from '../components/ErrorMessage'
import { Link, Form, useLoaderData, ActionFunctionArgs, useActionData, redirect } from 'react-router-dom'
import Aside from '../components/Aside'
import { getTeachers } from '../services/teacherServices'
import { Classroom, CourseName, Shift, Teacher } from '../types'
import { getClassrooms } from '../services/classroomService'
import { getShifts } from '../services/shiftService'
import { convertToHourMinute } from '../utils'
import { addCourse, getCoursesName } from '../services/courseService'

export async function loader() {
    const [teachers, classrooms, shifts, coursesName] = await Promise.all([
        getTeachers(),
        getClassrooms(),
        getShifts(),
        getCoursesName()
    ])
    return { teachers, classrooms, shifts, coursesName }
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son necesarios'
    }
    if (error.length) {
        return error
    }

    await addCourse(data)
    return redirect('/cursos')
}

export default function NewCourse() {
    const { teachers, classrooms, shifts, coursesName } = useLoaderData() as { teachers: Teacher[], classrooms: Classroom[], shifts: Shift[], coursesName: CourseName[] };
    const error = useActionData() as string

    return (
        <div className=" flex flex-col sm:flex-row dark:bg-slate-900 ">
            <Aside />
            <div className=" mt-12 w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase">Registro de curso</h1>
                <Link
                    to="/cursos"
                    className="rounded bg-green-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-green-900"

                >Volver a cursos</Link>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form
                    method='POST'
                    className="mt-6"
                >
                    <p className=' bg-blue-400 font-semibold text-xl text-slate-800 pl-4 rounded-t-xl h-8 text-center p-1 '>Datos del curso</p>
                    <div className=" bg-blue-50 rounded-b-xl p-4 border border-b-slate-600 border-x-slate-600 grid grid-cols-4 gap-4">

                        {/**Datos del curso */}
                        <div className="col-span-3 w-full">
                            <label
                                htmlFor="course_name_id"
                                className=' flex flex-col '
                            >Curso</label>
                            <select
                                name="course_name_id"
                                id="course_name_id"
                                className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                            // defaultValue={idParam === null ? '' : parseInt(idParam)}

                            >
                                <option value="" disabled selected>Elija una opción</option>
                                {
                                    coursesName.map(course => (
                                        <option
                                            key={course.id}
                                            value={course.id}>
                                            <p className=" bg-slate-800">
                                                {`${course.name}`}
                                            </p>
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label
                                className="text-gray-800"
                                htmlFor="duration"
                            >Duración </label>
                            <input
                                id="duration"
                                type="number"
                                className="mt-2 block w-full p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="duration"
                                defaultValue={10}
                            />
                        </div>

                        <div>
                            <label
                                className="text-gray-800 flex flex-col"
                                htmlFor="start_date"
                            >Fecha de inicio</label>
                            <input
                                id="start_date"
                                type="date"
                                className="mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                                name="start_date"
                            />
                        </div>

                        <div className="col-span-3 w-full">
                            <label
                                htmlFor="profesor_id"
                                className=' flex flex-col '
                            >Maestro</label>
                            <select
                                name="profesor_id"
                                id="profesor_id"
                                className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                            // defaultValue={idParam === null ? '' : parseInt(idParam)}

                            >
                                <option value="" disabled selected>Elija una opción</option>
                                {
                                    teachers.map(teacher => (
                                        <option
                                            key={teacher.id}
                                            value={teacher.id}>
                                            <p className=" bg-slate-800">
                                                {`${teacher.name}`}
                                            </p>
                                        </option>

                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-span-3 w-full">
                            <label
                                htmlFor="classroom_id"
                                className=' flex flex-col '
                            >Aula</label>
                            <select
                                name="classroom_id"
                                id="classroom_id"
                                className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                            // defaultValue={idParam === null ? '' : parseInt(idParam)}

                            >
                                <option value="" disabled selected>Elija una opción</option>
                                {
                                    classrooms.map(clasroom => (
                                        <option
                                            key={clasroom.id}
                                            value={clasroom.id}>
                                            <p className=" bg-slate-800">
                                                {`Aula número ${clasroom.number}`}
                                            </p>
                                        </option>

                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-span-3 w-full">
                            <label
                                htmlFor="shift_id"
                                className=' flex flex-col '
                            >Turno</label>
                            <select
                                name="shift_id"
                                id="shift_id"
                                className=" mt-2 block w-full h-12 p-3 bg-gray-50 rounded-lg border border-slate-400"
                            // defaultValue={idParam === null ? '' : parseInt(idParam)}

                            >
                                <option value="" disabled selected>Elija una opción</option>
                                {
                                    shifts.map(shift => (
                                        <option
                                            key={shift.id}
                                            value={shift.id}>
                                            <p className=" bg-slate-800">
                                                {`${shift.days} de ${convertToHourMinute(shift.start_time)} a ${convertToHourMinute(shift.end_time)}`}
                                            </p>
                                        </option>

                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Registrar curso'
                    />

                </Form>
            </div >

        </div >
    )
}
