import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts'

const Level = (props) => {
    useEffect(() => {
        let levelData = props.data.filter(x => x.subClassification === '12')
        let dataList = levelData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var levelDom = document.getElementById('level');
        var levelChart = echarts.init(levelDom);
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
                    //     { value: '60', name: '经典卡会员', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: '20', name: '金卡会员', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: '15', name: '白金卡会员', itemStyle: { color: '#CFD8DC' } },
                    //     { value: '5', name: '未知', itemStyle: { color: '#C8E6C9' } }
                    // ]
                }
            ]
        };
        levelChart.setOption(option);
    }, [props.data])
    return (
        <div className="bg-white p-20-40">
            <div className="title">{props.title}-会员等级分布</div>
            <div id="level" className="top4-chart"></div>
        </div>
    )
}

export default Level