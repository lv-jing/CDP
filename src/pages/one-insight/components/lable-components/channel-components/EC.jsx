
import * as echarts from 'echarts'
import React, { useState, useEffect } from 'react';
const EC = (props) => {
    //EC
    useEffect(() => {
        let dataList = props.data.map(item => {
            return { value: (item.portraitValue * 100).toFixed(2), name: item.portraitKey }
        })
        var ECDom = document.getElementById('EC');
        var ECDomChart = echarts.init(ECDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: 'EC渠道购物偏好',
                textStyle: {
                    fontSize: '14px',
                    color: '#333333',
                    fontWeight: 400
                },
                left: 'left'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '50px',
                icon: 'circle',
                textStyle: {
                    fontSize: '12px'
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['65%', '35%'],
                    labelLine: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'inner',
                            textStyle: {
                                fontWeight: 400,
                                fontSize: 12,
                                color: 'rgba(0, 0, 0, 0.6)'
                            },
                            formatter: '{c}%'
                        }
                    },
                    data: dataList
                    // [
                    //     { value: '60', name: 'EC微信小程序', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: '20', name: '官网', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: '15', name: '京东', itemStyle: { color: '#CFD8DC' } },
                    //     { value: '5', name: '天猫', itemStyle: { color: '#C8E6C9' } }
                    // ]
                }
            ]
        };
        ECDomChart.setOption(option);
    }, [props.data])
    return (
        <div id="EC" className="chart-item"></div>
    )
}

export default EC