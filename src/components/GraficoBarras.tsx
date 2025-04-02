import { BarChart } from '@mui/x-charts/BarChart'

const data = {
    cursos: [
        {
            course_name: 'Sistemas operativos y ofimática',
            promedio_general: 91
        },
        {
            course_name: 'Inglés',
            promedio_general: 86
        },
        {
            course_name: 'Diseño gráfico',
            promedio_general: 79
        },
        {
            course_name: 'Caja y banco',
            promedio_general: 57
        }
    ]
}

export default function GraficoBarras() {
    const promedios = data.cursos.map(curso => curso.promedio_general)
    const nombresCursos = data.cursos.map(curso => curso.course_name)
    return (
        <BarChart
            series={[
                { data: promedios, color: 'green' }
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
            xAxis={[{ data: nombresCursos, scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            borderRadius={5}
            
        />
    )
}
