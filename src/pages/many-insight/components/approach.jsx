import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts'

const Approach = (props) => {
    useEffect(() => {
        let subData = props.data.filter(x=>x.subClassification === '41')
        let approachList = subData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var approachDom = document.getElementById('approach');
        var approachChart = echarts.init(approachDom);
        var option = {
            tooltip: {
                trigger: 'item'
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
                    center: ['70%', '45%'],
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
                    data: approachList
                        // [
                        //     { value: '60', name: '2周以内', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                        //     { value: '20', name: '2周~4周', itemStyle: { color: '#FFECB3 ' } },
                        //     { value: '20', name: '4周~12周', itemStyle: { color: '#CFD8DC' } },
                        //     { value: '20', name: '24周以上', itemStyle: { color: '#C8E6C9' } },
                        //     { value: '20', name: '36周以上', itemStyle: { color: '#BBDEFB' } }
                        // ]
                }
            ]
        };
        approachChart.setOption(option);
    }, [props.data])
    return (
        <div className="bg-white p-20-40">
            <div className="title">{props.title}-Approach Recency</div>
            <div id="approach" style={{ width: 400, height: 350 }}></div>
        </div>
    )
}

export default Approach