import { PieChart } from '@mui/x-charts/PieChart'

const data = {
    courses: [
        {
            course_name: 'Sistemas operativos y ofimática',
            active_courses: 10
        },
        {
            course_name: 'Diseño gráfico',
            active_courses: 2
        },
        {
            course_name: 'Inglés',
            active_courses: 3
        },
        {
            course_name: 'Caja y banco',
            active_courses: 0
        }
    ]
}
const getColor = (index: number) => {
    const colors = ['blue', 'yellow', 'red', 'green'];
    return colors[index % colors.length];
};


export default function GraficoPastel() {
    const chartData = data.courses.map((course, index) => ({
        id: index,
        value: course.active_courses,
        label: course.course_name,
        color: getColor(index)
    }))


    return (
        <div>
            <PieChart
                series={[
                    {
                        data: chartData,
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
        </div>
    )
}
