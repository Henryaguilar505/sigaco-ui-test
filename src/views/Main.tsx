import { Link } from "react-router-dom"
import Footer from "./Footer"

export default function Main() {
    return (
        <>
            <div className="hero w-4/5 min-w-96 mt-8 mb-0 ml-auto mr-auto">
                <main>
                    <section className="flex flex-col items-center my-7">
                        <h1 className=" font-semibold text-7xl mt-8">
                            Sistema de Gestión Académica
                        </h1>
                        <h1 className="text-5xl my-10">
                            Academia de Computacion ADEC
                        </h1>
                    </section>

                    <div className=" grid grid-cols-3 gap-16 h-72">
                        <div
                            className="card bg-gradient-to-b from-red-500 via-pink-500 to-purple-800 flex flex-col justify-between rounded-3xl"
                        >
                            <p className="m-4 text-2xl text-white font-semibold">Asistencia</p>
                            <div className="bg-black text-white text-2xl font-semibold flex justify-center h-12 items-center rounded-b-3xl">
                                <a href="">Entrar</a>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-tl from-green-600 via-green-900 to-indigo-800 to-95% flex flex-col justify-between rounded-3xl">
                            <p className="m-4 text-2xl text-white font-semibold">Calificaciones</p>
                            <div className="bg-black text-white text-2xl font-semibold flex justify-center h-12 items-center rounded-b-3xl">
                                <Link to={'/calificaciones'}>Entrar</Link>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-tl from-yellow-600 from-10% via-yellow-400 to-amber-700 to-99% flex flex-col justify-between rounded-3xl">
                            <p className="m-4 text-2xl text-white font-semibold">Matricula</p>
                            <div className="bg-black text-white text-2xl font-semibold flex justify-center h-12 items-center rounded-b-3xl">
                                <Link to={'/matricula'}>Entrar</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}
