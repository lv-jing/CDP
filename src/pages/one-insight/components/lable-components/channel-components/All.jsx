import * as echarts from 'echarts'
import React, { useState, useEffect } from 'react';

const All = (props) => {
     //EC
     useEffect(() => {
        let dataList = props.data.map(item => {
            return { value: (item.portraitValue * 100).toFixed(2), name: item.portraitKey }
        })
        var allDom = document.getElementById('all');
        var allDomChart = echarts.init(allDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: '所有渠道购物偏好',
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
                    //     { value: 25, name: 'EC微信小程序', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 20, name: '官网', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: 13, name: '京东', itemStyle: { color: '#CFD8DC' } },
                    //     { value: 10, name: '天猫', itemStyle: { color: '#C8E6C9' } },
                    //     { value: 7, name: 'POS', itemStyle: { color: '#BBDEFB' } },
                    //     { value: 5, name: 'SCRM', itemStyle: { color: '#D7CCC8' } },
                    //     { value: 5, name: 'L100', itemStyle: { color: '#FFCDD2' } },
                    //     { value: 5, name: '天猫超市', itemStyle: { color: '#E1BEE7' } },
                    //     { value: 5, name: '京东超市', itemStyle: { color: '#C5CAE9' } },
                    //     { value: 5, name: 'KA', itemStyle: { color: '#B2DFDB' } }
                    // ]
                }
            ]
        };
        allDomChart.setOption(option);
    }, [props.data])
    return (
        <div id="all" className="chart-item"></div>
    )
}

export default All