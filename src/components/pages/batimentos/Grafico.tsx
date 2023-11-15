import ReactECharts from 'echarts-for-react'

const Grafico = (props: any) => {
    const {  t,dados } = props
    const option = {
            title: {
                text: 'Simulação de Frequência Cardíaca'
            },
            xAxis: {
                data: t,
                name: 'Tempo (s)'
            },
            yAxis: {
                name: 'Amplitude'
            },
            series: [{
                data:   dados,
                type: 'line',
                smooth: true
            }]
        }
    
    return <ReactECharts option={option} theme={"primary"}
    />
}
export default Grafico