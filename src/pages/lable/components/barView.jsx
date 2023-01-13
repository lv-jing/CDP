import React, {useEffect} from 'react';
import * as echarts from 'echarts';

export default function BarView(props) {
    useEffect(() => {
        let xData = props.data?.map(item => item.statisticsTime)
        let yData = props.data?.map(item => item.useageTimes)
        var barView = document.getElementById('barView');
        var BarView = echarts.init(barView);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '0',
                right: '0',
                containLabel: true
            },
            title: {
                text: '人数',
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            color: '#FFECB3',
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: yData,
                    type: 'bar',
                    barWidth: '50'
                }
            ]
        }

        BarView.setOption(option);
        window.addEventListener('resize', () => {
            BarView.resize()
        })
    }, [props.data])

    return (
        <div id="barView" style={{width: '100%', height: 400}}></div>
    )
}