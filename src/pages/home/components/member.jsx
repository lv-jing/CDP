import React, { useEffect } from 'react';
import * as echarts from 'echarts'

const Member = (props) => {
    useEffect(() => {
        let xAxisList = props.data ? props.data.filter(x=>x.subType === '61').map(x=>x.statisticsMonth).reverse() : []
        let yMemberAxisList = props.data ? props.data.filter(x=>x.subType === '61').map(x=>x.statisticsValue).reverse() : []
        let yNotMemberAxisList = props.data ? props.data.filter(x=>x.subType === '62').map(x=>x.statisticsValue).reverse() : []
        let yFansAxisList = props.data ? props.data.filter(x=>x.subType === '63').map(x=>x.statisticsValue).reverse() : []
        var memberDom = document.getElementById('member');
        var memberChart = echarts.init(memberDom);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['会员(Member)', '潜客(Walk-in Consumer)', '粉丝(Fans)'],
                left: '6%',
                right: '4%',
                top: '10%'   
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisList,
                axisLabel: {
                    interval: 0,
                    color: 'rgba(0, 0, 0, 0.45)',
                    rotate: 60,
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(0, 0, 0, 0.45)'
                }
            },
            series: [
                {
                    name: '会员(Member)',
                    type: 'line',
                    // stack: 'Total',
                    data: yMemberAxisList,
                    // [21, 56, 101, 54, 90, 56, 55, 34, 2, 13, 67, 20],
                    itemStyle: {
                        color: '#529BD9'
                    }
                },
                {
                    name: '潜客(Walk-in Consumer)',
                    type: 'line',
                    // stack: 'Total',
                    data: yNotMemberAxisList,
                    // [11, 44, 23, 66, 77, 88, 99,12, 16, 33, 32, 65],
                    itemStyle: {
                        color: '#66CC66'
                    }
                },
                {
                    name: '粉丝(Fans)',
                    type: 'line',
                    // stack: 'Total',
                    data: yFansAxisList,
                    // [12, 32, 54, 56, 56, 23, 21, 34, 45, 57, 3, 65],
                    itemStyle: {
                        color: '#CC967A'
                    }
                }
            ]

        };
        memberChart.setOption(option);
    }, [props.data])
    return (
        <div id="member" style={{ width: '100%', height: 450 }}></div>
    )
}

export default Member