
export default function Opciones() {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-end border-b-2 border-black pb-4 my-2">

                <div
                    id="buscador"
                    className=""></div>

                <div className="bg-slate-100 w-full sm:w-8 h-8 rounded-md border border-slate-300 flex flex-col justify-center items-center hover:bg-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                        <path d="M21 21l-6 -6">
                        </path>
                    </svg>
                </div>

                <div className="bg-slate-100 h-8 px-2 rounded-md border border-slate-300 flex gap-2 justify-center items-center hover:bg-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M3 17l9 5l9 -5v-3l-9 5l-9 -5v-3l9 5l9 -5v-3l-9 5l-9 -5l9 -5l5.418 3.01"></path> </svg>
                    <p className="text-base">Curso</p>
                </div>

                <div className=" bg-slate-100 h-8 px-2 rounded-md border border-slate-300 flex gap-2 justify-center items-center hover:bg-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M18 21v-14"></path>
                        <path d="M9 15l3 -3l3 3"></path>
                        <path d="M15 10l3 -3l3 3"></path>
                        <path d="M3 21l18 0"></path>
                        <path d="M12 21l0 -9"></path>
                        <path d="M3 6l3 -3l3 3"></path>
                        <path d="M6 21v-18"></path>
                    </svg>
                    <p className="text-base">Nivel</p>
                </div>

                <div className="bg-slate-100 h-8 px-2 rounded-md border border-slate-300 flex gap-2 justify-center items-center hover:bg-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M7 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M7 3v4h4"></path> <path d="M9 17l0 4"></path>
                        <path d="M17 14l0 7"></path> <path d="M13 13l0 8"></path>
                        <path d="M21 12l0 9"></path> </svg>
                    <p className="text-base">Gráfico</p>
                </div>

                <div className="bg-indigo-700 text-white h-8 px-2 rounded-md flex gap-2 justify-center items-center hover:bg-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 11l5 5l5 -5"></path> <path d="M12 4l0 12"></path> </svg>
                    <p className=" text-base">Exportar</p>
                </div>
            </div>
        </>
    )
}
