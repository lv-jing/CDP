import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts'

const Sex = (props) => {
    //Sex
    useEffect(() => {
        let sexData = props.data.filter(x => x.subClassification === '11')
        let dataList = sexData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var sexDom = document.getElementById('sex');
        var sexChart = echarts.init(sexDom);
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
                    data: dataList
                    // [
                    //     { value: '60', name: '男', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: '20', name: '女', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: '20', name: '未知', itemStyle: { color: '#CFD8DC' } },
                    // ]
                }
            ]
        };
        sexChart.setOption(option);
    }, [props.data])
    return (
        <div className="bg-white p-20-40">
            <div className="title">{props.title}-性别分布</div>
            <div id="sex" className="top4-chart"></div>
        </div>
    )
}

export default Sex