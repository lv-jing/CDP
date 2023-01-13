import React, {useEffect} from 'react';
import * as echarts from 'echarts'

export default function From(props) {
    useEffect(() => {
        let allData = props.data.filter(x=>x.subClassification === '41')
        let xData = allData.map(item => item.portraitKey)
        let yData = allData.map(item => item.portraitValue)
        var fromDom = document.getElementById('from');
        var fromChart = echarts.init(fromDom);
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
                // ['官网', '线下门店', '微信(推文/菜单)', '媒体'],
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

        fromChart.setOption(option);
    }, [props.data])
    return (
        <div className="from bg-white p-20-40">
            <div className="title">营销活动信息-来源偏好</div>
            <div id="from" style={{ width: 500, height: 400 }}></div>
        </div>
    )
}