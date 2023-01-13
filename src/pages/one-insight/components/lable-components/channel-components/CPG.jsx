
import * as echarts from 'echarts'
import React, { useState, useEffect } from 'react';
const CPG = (props) => {
      //CPG
      useEffect(() => {
        let dataList = props.data.map(item => {
            return { value: (item.portraitValue * 100).toFixed(2), name: item.portraitKey }
        })
        var CPGDom = document.getElementById('CPG');
        var CPGDomDomChart = echarts.init(CPGDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: 'CPG渠道购物偏好',
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
                    //     { value: 70, name: '天猫超市', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 20, name: '京东超市', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: 10, name: 'KA', itemStyle: { color: '#CFD8DC' } }
                    // ]
                }
            ]
        };
        CPGDomDomChart.setOption(option);
    }, [props.data])
    return (
        <div id="CPG" className="chart-item"></div>
    )
}

export default CPG