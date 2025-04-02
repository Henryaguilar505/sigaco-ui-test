import { useEffect } from 'react'
import Aside from '../components/Aside'
import { getPieChartData } from '../services/chartService'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { ActiveCourseChart, AverageAttendancePercentageChart, AverageGradesPerCourseChart, EnrollmentsPerMonthChart, StudentPerShiftChart, StudentsPerCourseChart, TotalActiveProfessorsCard, TotalActiveStudentsCard } from '../components/Charts'
import { ReportCard } from '../components/reports'

export async function loader() {
    const pieData = await getPieChartData()
    return pieData
}

export default function Dashboard() {

    useEffect(() => {
        const notify = async () => {
            toast('¡Bienvenido!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
        notify();
    }, []);

    return (
        <>
            <main className=" w-full flex flex-col sm:flex-row  m-auto dark:bg-slate-900 ">
                <ToastContainer />
                <Aside />
                <div className=" ml-4 mt-12">
                    <section className=' grid sm:grid-cols-3 grid-cols-2 gap-4'>
                        <div className=' bg-green-700 h-36 rounded-2xl p-4'>
                            <div className=' flex'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    width="24" height="24"
                                    stroke-width="2"
                                    className=' text-slate-100 mr-2 animate-spin'
                                >
                                    <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
                                    <path d="M5.63 7.16l0 .01"></path>
                                    <path d="M4.06 11l0 .01"></path>
                                    <path d="M4.63 15.1l0 .01"></path>
                                    <path d="M7.16 18.37l0 .01"></path>
                                    <path d="M11 19.94l0 .01"></path>
                                </svg>
                                <p className=' font-bold text-slate-100'>Actualización</p>

                            </div>
                            <p className=' text-slate-100'>La matricula ah bajado un <span className=' text-green-400'>{Math.floor(Math.random() * (50 - 5) + 5) + '%'}</span> el último mes</p>
                        </div>

                        <TotalActiveStudentsCard />

                        <TotalActiveProfessorsCard />

                    </section>

                    <section className='mt-4'>
                        <div className='border border-slate-700 dark:border-slate-300 rounded-xl grid grid-cols-2 grid-rows-2 p-4'>
                            <div className='col-span-2 rounded-xl border border-black dark:border-slate-300 my-4'>
                                <p
                                    className=' mx-4 mt-4 font-bold text-xl border-b-2 border-slate-700 mb-2 dark:border-slate-100 dark:text-slate-100'
                                >Promedio General por Curso</p>
                                <AverageGradesPerCourseChart />
                            </div>

                            <div className='col-span-2 sm:col-span-1 items-center rounded-xl mt-4 sm:mt-0 border border-slate-700 dark:border-white'>
                                <p className='text-center my-4 font-bold text-lg'>Cursos activos</p>
                                <ActiveCourseChart />
                            </div>

                            <div className='col-span-2 sm:col-span-1  items-center rounded-xl mt-4 sm:mt-0 sm:ml-4 border border-slate-700 dark:border-white'>
                                <p className=' mx-4 mt-4 font-bold text-xl border-b-2 border-slate-800 dark:border-white dark:text-slate-100'>Alumnos por turno</p>
                                <StudentPerShiftChart />
                            </div>

                            <div className='col-span-2 sm:col-span-2  items-center rounded-xl mt-4 sm:mt-4 border border-slate-700 dark:border-white'>
                                <p className='text-center my-4 font-bold text-lg'>Matriculas por Mes</p>
                                <EnrollmentsPerMonthChart />
                            </div>
                        </div>
                    </section>



                    <section className='mt-4'>
                        <div className='border border-slate-700 dark:border-slate-300 rounded-xl grid grid-cols-2 p-4'>
                            <div className='col-span-2 sm:col-span-1 items-center rounded-xl mt-4 sm:mt-0 border border-slate-700 dark:border-white'>
                                <p className='text-center my-4 font-bold text-lg'>Distribución del total de estudiantes</p>
                                <StudentsPerCourseChart />
                            </div>
                            <div className='col-span-2 sm:col-span-1 items-center rounded-xl mt-4 ml-4 sm:mt-0 border border-slate-700 dark:border-white'>
                                {/* <p className='text-center my-4 font-bold text-lg'>Distribución del total de estudiantes</p> */}
                                {/* <StudentsPerCourseLineChart /> */}
                                <ReportCard />
                            </div>

                            {/* <div className='border dark:border-slate-700 p-4 rounded-xl mt-4 bg-blue-700 dark:bg-white font-bold text-lg'>
                                <p>5 Estudiantes con asistencia pendiente</p>
                                <p className=' bg-slate-400 dark:bg-black dark:text-slate-100 text-center p-2 rounded-lg m-4 font-semibold'>Marcar asistencia</p>
                            </div> */}


                        </div>

                        <div className='col-span-2 rounded-xl border border-black dark:border-slate-300 my-4'>
                            <p
                                className=' mx-4 mt-4 font-bold text-xl border-b-2 border-slate-700 mb-2 dark:border-slate-100 dark:text-slate-100'
                            >Porcentaje de Asistencia por mes</p>
                            <AverageAttendancePercentageChart />

                        </div>
                    </section>
                </div>

                {/* <div className=' sm:w-72 mt-4 ml-4 sm:mt-0 flex flex-col justify-between pt-12'>

                    <div className=' border border-slate-700 dark:border-white mt-4 rounded-xl'>
                        <p className=' mx-4 mt-4 font-bold text-xl border-b-2 border-slate-800 dark:border-white dark:text-slate-100'>Matricula</p>
                        <LineChart
                            xAxis={[{ data: [4, 11, 18, 25] }]}
                            series={[
                                {
                                    data: [24, 28, 26, 25],
                                    // showMark: ({ index }) => index % 2 === 0,
                                },
                            ]}
                            width={300}
                            height={200}
                        />
                    </div>

                    <div className=' border border-slate-700 dark:border-white mt-4 rounded-xl'>
                        <p className=' mx-4 mt-4 font-bold text-xl border-b-2 border-slate-800 dark:border-white dark:text-slate-100'>Alumnos por turno</p>
                        <StudentPerShiftChart />
                    </div>




                </div> */}
            </main>
        </>
    )
}
