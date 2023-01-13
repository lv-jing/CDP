import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Row, Col } from 'antd';

const People = (props) => {
    //Sex
    useEffect(() => {
        let sexData = props.data.filter(x => x.subClassification === '14')
        let dataList = sexData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        let partPeople = dataList.find(x=>x.name === '0')
        let totalPeople = dataList.find(x=>x.name === '1')
        var peopleDom = document.getElementById('people');
        var peopleChart = echarts.init(peopleDom);
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
            graphic: {
                type: "text",
                left: "55%",
                top: "42%",
                style: {
                    text: "在全部用户中占比0.12%",
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.6)'
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
                    data:
                        [
                            {
                                value: partPeople && partPeople.value, name: `${props.title}人数`, itemStyle: { color: '#E8D7BA' }, label: {
                                    normal: {
                                        show: true,
                                        position: 'inner',
                                        textStyle: {
                                            fontWeight: 400,
                                            fontSize: 12,
                                            color: 'rgba(0, 0, 0, 0.6)'
                                        },
                                        formatter: '{c}人'
                                    }
                                },
                            }, //, itemStyle: { color: '#EFDBFF' }
                            { value: totalPeople && totalPeople.value, name: '消费者总人数', itemStyle: { color: '#FFECB3 ' }, label: { show: false } }
                        ]
                }
            ]
        };
        peopleChart.setOption(option);
    }, [props.data, props.title])
    return (
        <div className="bg-white p-20-40">
            <Row>
                <Col md={12}><div className="title">{props.title}-人数</div></Col>
                <Col md={12} className="text-right">
                    <span>计算于:2021-10-28</span>
                </Col>
            </Row>
            <div id="people" className="top4-chart"></div>
        </div>
    )
}

export default People