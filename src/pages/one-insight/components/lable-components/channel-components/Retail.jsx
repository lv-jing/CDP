
import * as echarts from 'echarts'
import React, { useState, useEffect } from 'react';
const Retail = (props) => {
     //Retail
     useEffect(() => {
        let dataList = props.data.map(item => {
            return { value: (item.portraitValue * 100).toFixed(2), name: item.portraitKey }
        })
        var retailDom = document.getElementById('Retail');
        var retailDomChart = echarts.init(retailDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: 'Retail渠道购物偏好',
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
                    //     { value: 70, name: 'POS', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 20, name: 'SCRM', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: 10, name: 'L100', itemStyle: { color: '#CFD8DC' } }
                    // ]
                }
            ]
        };
        retailDomChart.setOption(option);
    }, [props.data])
    return (
        <div id="Retail" className="chart-item"></div>
    )
}

export default Retail