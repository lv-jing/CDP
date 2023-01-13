import React, {useEffect} from 'react';
import * as echarts from 'echarts'

export default function Award(props) {
    useEffect(() => {
        let allData = props.data.filter(x=>x.subClassification === '42')
        let xData = allData.map(item => item.portraitKey)
        let yData = allData.map(item => item.portraitValue)
        var awardDom = document.getElementById('award');
        var awardChart = echarts.init(awardDom);
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
                // ['满减券', '现金券', '积分', '折扣券'],
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
                    // [40, 30, 20, 10],
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

        awardChart.setOption(option);
    }, [props.data])
    return (
        <div className="award bg-white p-20-40">
            <div className="title">营销活动信息-奖励偏好</div>
            <div id="award" style={{ width: 500, height: 400 }}></div>
        </div>
    )
}