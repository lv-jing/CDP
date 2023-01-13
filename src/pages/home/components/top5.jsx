import React, { useEffect } from 'react';
import * as echarts from 'echarts'

const Top5 = (props) => {
    useEffect(() => {
        let xTopData = props.data ? props.data.map(x => x.statisticsKey) : []
        let yTopData = props.data ? props.data.map(x => x.statisticsValue) : []
        var top5Dom = document.getElementById('top5');
        var top5Chart = echarts.init(top5Dom);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '10%'
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(0, 0, 0, 0.45)'
                }
            },
            yAxis: {
                type: 'category',
                data: xTopData,
                // ['标签1', '标签2', '标签3', '标签4', '标签5'],
                axisLabel: {
                    interval: 0,
                    color: 'rgba(0, 0, 0, 0.45)',
                    rotate: 60
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0.15)'
                    }
                },
                nameTextStyle: {
                    fontSize: '12px',
                    color: '#000000'
                },

            },
            series: [
                {
                    data: yTopData,
                    // [120, 300, 150, 80, 170],
                    type: 'bar',
                    center: ['60%', '50%'],
                    barWidth: '60%',
                    itemStyle: {
                        color: 'rgba(198, 162, 99, 0.4)'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#999999'
                    }
                }
            ]
        };

        top5Chart.setOption(option);
    }, [props.data])
    return (
        <div id="top5" style={{  width: '100%', height: 450 }}></div>
    )
}

export default Top5