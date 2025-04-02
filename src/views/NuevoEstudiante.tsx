import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addStudent } from "../services/estudianteService"
import EstudianteForm from "../components/EstudianteForm"
import Aside from "../components/Aside"


/**En lugar del action que normalmente esta en el form de HTML, se crea la siguiente function */
export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    
    await addStudent(data)

    return redirect('/matricula')
}

export default function NuevoEstudiante() {

    const error = useActionData() as string


    return (
        <div className=" flex flex-col sm:flex-row mt-12 dark:bg-slate-900 ">
            <Aside />
            <div className=" mt-12 w-3/4 m-auto">
                <h1 className=" font-bold text-2xl text-center uppercase">Hoja de matricula</h1>
                <Link
                    to="/matricula"
                    className="rounded bg-emerald-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-purple-900"

                >Volver a matricula</Link>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form
                    method='POST'
                    className="mt-6"
                >
                    <EstudianteForm 
                    
                    
                    />
                    <input
                        type="submit"
                        className="mt-5 w-full bg-emerald-700 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                        value='Registrar estudiante'
                    />
                </Form>
            </div>

        </div>
    )
}
