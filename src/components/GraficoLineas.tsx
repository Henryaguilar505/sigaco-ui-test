import { ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from '@mui/x-charts'
import { LineChart, LinePlot } from '@mui/x-charts/LineChart'

export default function GraficoLineas() {
    const type = 'line'
    return (
        <div>
            {/**Grafico de forma responsiva */}
            <ResponsiveChartContainer
                series={[
                    {
                        type,
                        data: [1, 2, 3, 2, 1],
                        label: 'Sábado',
                        color: '#AA00AA'
                    },
                    {
                        type,
                        data: [4, 3, 1, 3, 4],
                        label: 'Domingo'
                    },
                ]}
                xAxis={[
                    {
                        data: ['A', 'B', 'C', 'D', 'E'],
                        scaleType: 'band',
                        id: 'x-axis-id',
                    },
                ]}
                height={200}
            >
                <LinePlot />
                <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
            </ResponsiveChartContainer>

            <LineChart
                xAxis={[{ data: [1, 8, 15, 22] }]}
                yAxis={[{ min: 9, max: 20 }]}
                series={[
                    {
                        data: [10, 18, 15, 12],
                        label: 'Sábado',
                        color: '#AA00AA',
                        area: true
                    },
                ]}
                slotProps={{
                    legend: {
                        hidden: true
                    },
                }}
                width={300}
                height={300}
            >
                <ChartsYAxis label='Cantidad de estudiantes' />
                <ChartsXAxis disableLine={true} />
            </LineChart>
        </div>
    )
}
