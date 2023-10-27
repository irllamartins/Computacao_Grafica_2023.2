import ReactECharts from 'echarts-for-react'

const Grafico = (props: any) => {
    const { titulo, dados, maximoCor } = props
    let legendaX: number[] = []
    for (var i = 0; i < maximoCor; i++) {
        legendaX.push(i)
    }
    const option = {
        title: {
            text: titulo
        },
        legend: {
            data: ['Pixel']
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            // name:"Escala de cinza",
            data: legendaX,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            name: "Quantidade de pixel",
            splitLine: {
                show: false
            }
        },
        visualMap: {
            show: true,
            left: 'center',
            // text: ['Escala Cinza'],
            itemHeight: 400,
            min: 0, // Valor mínimo dos dados
            max: maximoCor, // Valor máximo dos dados
            inRange: {
               color: ['white', 'black'], // Cores de branco a preto
            },
            orient: 'horizontal',
            bottom: 20, // Distância da parte inferior do gráfico
        },
        color: ['green'],

        series: [
            {
                name: "Cor",
                type: 'bar',
                data: dados,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                label: { show: true, fontSize: 16 },
            }
        ],
        animationEasing: 'elasticOut',
    }
    return <ReactECharts option={option} theme={"primary"}
    />
}
export default Grafico