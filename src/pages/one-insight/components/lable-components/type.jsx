import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export default function Type(props) {
    useEffect(() => {
        let xData = props.data.map(item => item.portraitKey)
        let yData = props.data.map(item => item.portraitValue)
        var zhuDom = document.getElementById('zhu');
        var zhuChart = echarts.init(zhuDom);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            title: {
                text: '按购买的产品品类分组，统计各个品类的购买件数',
                textStyle: {
                    fontSize: '14px',
                    color: '#333333',
                    fontWeight: 400
                },
                left: '-20px'
            },
            grid: {
                left: '30px'
            },
            xAxis: {
                type: 'category',
                data: xData,
                //  ['Chocolate', 'Case', 'Chocoiste', 'Core and Innovation', 'Column5', 'Column6', 'Column7', 'Column8', 'Column9', 'Column10'],
                axisLabel: {
                    interval: 0,
                    rotate: 60
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
                    // [120, 200, 150, 80, 70, 110, 130, 100, 74, 32],
                    type: 'bar',
                    center: ['60%', '50%'],
                    barWidth: '30%',
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

        zhuChart.setOption(option);
    }, [props.data])
    return (
        <div className="value-market p-20-40">
            <div className="title">客户价值-品类偏好</div>
            <div id="zhu" style={{ width: 1200, height: 400 }}></div>
        </div>
    )
}