import React, { useEffect } from 'react';
import * as echarts from 'echarts'

const Level = (props) => {
    useEffect(() => {
        let dataList = props.data.sort((x1, x2) => (x1.subType - x2.subType))
            .map(item => {
                return {
                    value: item.statisticsValue, name: item.statisticsKey,
                    itemStyle: { color: item.subType === '51' ? '#F1E6D6' : item.subType === '52' ? '#D6B483' : '#6D5A00' }
                }
            }).reverse()
        let xDataList = props.data.sort((x1, x2) => (x1.subType - x2.subType))
            .map(item => item.statisticsKey).reverse()
        var levelDom = document.getElementById('level');
        var levelChart = echarts.init(levelDom);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%'
            },
            legend: {
                data: xDataList,
                // ['经典卡会员', '金卡会员', '白金卡会员'],
                left: 'left',
                top: '10%',
                orient: 'vertical'
            },
            series: [
                {
                    type: 'funnel',
                    left: '30%',
                    top: 60,
                    bottom: 60,
                    width: '60%',
                    sort: 'ascending',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                    },
                    data: dataList
                }
            ]
        };

        levelChart.setOption(option);
    }, [props.data])
    return (
        <div id="level" style={{ width: '100%', height: 208 }}></div>
    )
}

export default Level