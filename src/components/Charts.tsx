import { axisClasses, BarChart, LineChart, PieChart } from "@mui/x-charts"
import { useEffect, useState } from "react"
import { getActiveCourses, getAverageAttendancesPerMonth, getAverageCourse, getEnrollmentPerMonth, getStudentPerShift, getStudentsPerCourse, getTotalActiveProfessors, getTotalActiveStudents } from "../services/chartService"
import { ChartData } from "../types/index"


export function valueFormatter(value: number | null) {
    return `${value} %`;
}

const chartSetting = {
    // yAxis: [
    //     {
    //         label: 'rainfall',
    //     },
    // ],
    // width: 900,
    height: 500,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

type AverageAttendancePercentageChartData = {
    presente: string; // Porcentaje como "0%"
    ausente: string;  // Porcentaje como "0%"
    justificado: string; // Porcentaje como "0%"
    month: string; // Mes en formato "YYYY-MMM"
}

export const AverageAttendancePercentageChart = () => {
    const [chartData, setChartData] = useState<AverageAttendancePercentageChartData[] | null>(null)

    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getAverageAttendancesPerMonth()
                setChartData(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])


    // Transformar los datos para el gráfico
    console.log(chartData)
    const transformedData = chartData?.map(data => ({
        presente: parseFloat(data.presente.replace('%', '')),
        ausente: parseFloat(data.ausente.replace('%', '')),
        justificado: parseFloat(data.justificado.replace('%', '')),
        month: data.month,
    }))

    return (
        <BarChart
            dataset={transformedData || []} // Usar los datos transformados
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'presente', label: 'Presente', valueFormatter },
                { dataKey: 'ausente', label: 'Ausente', valueFormatter },
                { dataKey: 'justificado', label: 'Justificado', valueFormatter },
            ]}
            {...chartSetting}
        />
    )
}

export const EnrollmentsPerMonthChart = () => {
    const [chartData, setChartData] = useState<ChartData[] | null>(null)

    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getEnrollmentPerMonth()
                setChartData(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const labels = chartData?.map(curso => curso.label) || []
    const values = chartData?.map(curso => curso.value) || []

    const uData = values;
    const xLabels = labels

    return (
        <LineChart
            // width={500}
            height={300}
            series={[{ data: uData, label: 'Matriculas', area: true, showMark: false }]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
        // sx={{
        //     [`& .${lineElementClasses.root}`]: {
        //         display: 'none',
        //     },
        // }}
        />
    )
}


export const ActiveCourseChart = () => {
    const [charData, setChartData] = useState<ChartData[] | null>(null)

    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getActiveCourses()
                setChartData(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const data = charData?.map((course, index) => ({
        id: index,
        value: course.value,
        label: course.label
    }))
    return (
        <>
            {
                data && (
                    <PieChart
                        series={[
                            {
                                arcLabel: (item) => `${item.value}`,
                                arcLabelMinAngle: 55,
                                arcLabelRadius: '50%',

                                data: data,
                                innerRadius: 20,
                                outerRadius: 90,
                                paddingAngle: 1,
                                cornerRadius: 5,
                                startAngle: -90,
                                cy: 100,
                                cx: 250
                            },
                        ]}

                        slotProps={{
                            legend: {
                                direction: 'column',
                                position: { vertical: 'middle', horizontal: 'left' },
                                padding: 0,
                                hidden: false,
                                itemMarkWidth: 15,
                                itemGap: 10,
                                labelStyle: {
                                    fontSize: 10,
                                    fill: 'black'
                                }
                            },
                        }}

                        width={400}
                        height={200}
                    />
                )
            }
        </>
    )
}

export const AverageGradesPerCourseChart = () => {
    const [charData, setChartData] = useState<ChartData[] | null>(null)

    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getAverageCourse()
                setChartData(chartData)
                console.log(charData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const label = charData?.map(curso => curso.label)
    const value = charData?.map(curso => curso.value)
    return (
        <>
            {
                label && value && (

                    <BarChart
                        series={[
                            { data: value, color: 'green' }
                        ]}
                        slotProps={{
                            legend: {
                                hidden: false
                            },
                        }}
                        barLabel={
                            (item, context) => {
                                if ((item.value ?? 0) > 90) {
                                    return 'Excelente';
                                } if ((item.value ?? 0) > 80) {
                                    return 'Muy bueno'
                                } if ((item.value ?? 0) > 60) {
                                    return 'Bien'
                                } if ((item.value ?? 0) < 60) {
                                    return 'Mal'
                                }
                                return context.bar.height < 60 ? null : item.value?.toString();
                            }
                        }
                        height={300}
                        xAxis={[{ data: label, scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        borderRadius={5}
                    />
                )
            }
        </>
    )
}


export const StudentPerShiftChart = () => {
    const [charData, setChartData] = useState<ChartData[] | null>(null)

    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getStudentPerShift()
                setChartData(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const data = charData?.map((course, index) => ({
        id: index,
        value: course.value,
        label: course.label
    }))
    return (
        <>
            {
                data && (
                    <PieChart
                        series={[
                            {
                                // arcLabel: (item) => `${item.value}`,
                                // arcLabelMinAngle: 35,
                                // arcLabelRadius: '50%',

                                data: data,
                                innerRadius: 0,
                                outerRadius: 90,
                                paddingAngle: 3,
                                cornerRadius: 3,
                                startAngle: -90,
                                cx: 190
                            },
                        ]}

                        slotProps={{
                            legend: {
                                direction: 'column',
                                position: { vertical: 'middle', horizontal: 'right' },
                                padding: 0,
                                hidden: false,
                                itemMarkWidth: 15,
                                itemGap: 10,
                                labelStyle: {
                                    fontSize: 10,
                                    fill: 'black'
                                }
                            },
                        }}

                        width={400}
                        height={200}
                    />
                )
            }
        </>
    )
}

type TotalActiveStudentsCardData = {
    label: string
    total: number
}

export const TotalActiveStudentsCard = () => {
    const [charData, setChartData] = useState<TotalActiveStudentsCardData | null>(null)
    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getTotalActiveStudents()
                setChartData(chartData)
                console.log(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    return (
        <div className=' h-36 rounded-2xl border border-slate-700 dark:border-slate-300 p-4'>
            <p className=' font-semibold dark:text-slate-100'>Total estudiantes</p>
            <div className=' flex'>
                {
                    charData?.total &&
                    <p className='font-bold text-center text-7xl dark:text-slate-100'>{charData.total}</p>
                }
            </div>
        </div>
    )
}

export const TotalActiveProfessorsCard = () => {
    const [charData, setChartData] = useState<TotalActiveStudentsCardData | null>(null)
    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getTotalActiveProfessors()
                setChartData(chartData)
                console.log(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    return (
        <div className=' h-36 rounded-2xl border border-slate-700 dark:border-slate-300 p-4'>
            <p className=' font-semibold dark:text-slate-100'>Total maestros</p>
            <div className=' flex'>
                {
                    charData?.total &&
                    <p className='font-bold text-center text-7xl dark:text-slate-100'>{charData.total}</p>
                }
            </div>
        </div>
    )
}

export const StudentsPerCourseChart = () => {
    const [charData, setChartData] = useState<ChartData[] | null>(null)
    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getStudentsPerCourse()
                setChartData(chartData)
                console.log(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const data = charData?.map((course, index) => ({
        id: index,
        value: course.value,
        label: course.label
    }))

    return (

        <>
            {
                data && (
                    <PieChart
                        series={[
                            {
                                arcLabel: (item) => `${item.value}`,
                                arcLabelMinAngle: 35,
                                arcLabelRadius: '85%',

                                data: data,
                                innerRadius: 60,
                                paddingAngle: 3,
                                cornerRadius: 10,
                                cx: 120,
                            },
                        ]}

                        slotProps={{
                            legend: {
                                direction: 'column',
                                position: { vertical: 'middle', horizontal: 'right' },
                                padding: 0,
                                hidden: false,
                                itemMarkWidth: 15,
                                itemGap: 10,
                                labelStyle: {
                                    fontSize: 10,
                                    fill: 'black'
                                }
                            },
                        }}
                        width={400}
                        height={200}
                    />
                )
            }
        </>
    )
}

export const StudentsPerCourseLineChart = () => {
    const [chartData, setChartData] = useState<ChartData[] | null>(null)
    useEffect(() => {
        const fetchactiveCourses = async () => {
            try {
                const chartData = await getStudentsPerCourse()
                setChartData(chartData)
                console.log(chartData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchactiveCourses()
    }, [])

    const labels = chartData?.map(curso => curso.label) || []
    const values = chartData?.map(curso => curso.value) || []

    const uData = values;
    const xLabels = labels

    return (
        <LineChart
            // width={500}
            height={300}
            series={[{ data: uData, label: 'Matriculas', showMark: false }]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
        // sx={{
        //     [`& .${lineElementClasses.root}`]: {
        //         display: 'none',
        //     },
        // }}
        />
    )
}


