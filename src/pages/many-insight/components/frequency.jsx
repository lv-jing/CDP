import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts'

const Frequency = (props) => {
    useEffect(() => {
        let subData = props.data.filter(x=>x.subClassification === '42')
        let xData = subData.map(item => item.portraitKey)
        let yData = subData.map(item => item.portraitValue)
        var frequencyDom = document.getElementById('frequency');
        var frequencyChart = echarts.init(frequencyDom);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '30px'
            },
            xAxis: {
                type: 'category',
                data: xData,
                // ['VD', 'Xmas', '520', 'NY', 'CNY'],
                axisLabel: {
                    interval: 0
                },
                nameTextStyle: {
                    fontSize: '12px',
                    color: '#999999'
                }
            },
            yAxis: {
                type: 'value',
                nameTextStyle: {
                    fontSize: '12px',
                    color: '#999999'
                }
            },
            series: [
                {
                    data: yData,
                    //  [40, 30, 20, 10, 5],
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
                    },
                    emphasis: {
                        focus: 'series',
                        itemStyle: {
                            color: 'rgba(198, 162, 99, 0.8)'
                        }
                    }
                }
            ]
        };

        frequencyChart.setOption(option);
    }, [props.data])
    return (
        <div className="bg-white p-20-40">
            <div className="title">{props.title}-被圈选活动频次</div>
            <div id="frequency" style={{ width: 400, height: 350 }}></div>
        </div>
    )
}

export default Frequency