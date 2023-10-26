import ReactECharts from 'echarts-for-react'

const Grafico = (props: any) => {
    const { titulo,dados } = props
    console.log(dados)
    let legendaX: number[] = []
    for (var i = 0; i < 255; i++) {
        legendaX.push(i)
      }
    const option = {
        title: {
            text: titulo
        },
        legend: {
            data: ['bar']
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
            data: legendaX,
            splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [
            {
                name: 'bar',
                type: 'bar',
                data: dados,
                emphasis: {
                    focus: 'series'
                },
                /*animationDelay: function (idx) {
                  return idx * 10;
                }*/
            }
        ],
        animationEasing: 'elasticOut',
        /*animationDelayUpdate: function (idx) {
          return idx * 5;
        }*/
    };
    return <ReactECharts option={option} theme={"primary"}
    />
}
export default Grafico