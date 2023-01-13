import React, { useEffect } from 'react';
import * as echarts from 'echarts'
import { Row, Col } from 'antd';

export default function Action(props) {
    useEffect(() => {
        let subData = props.data.filter(x=>x.subClassification === '43')
        let contentList = subData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var contentDom = document.getElementById('content');
        var contentChart = echarts.init(contentDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: '活动内容偏好',
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
                    data: contentList
                    // [
                    //     { value: 60, name: '节日', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 20, name: '品牌活动', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: 15, name: '开业', itemStyle: { color: '#CFD8DC' } },
                    //     { value: 5, name: '新品', itemStyle: { color: '#C8E6C9' } }
                    // ]
                }
            ]
        };
        contentChart.setOption(option);
    }, [props.data])

    useEffect(() => {
        let subData = props.data.filter(x=>x.subClassification === '44')
        let mechanismList = subData.map(item => {
            return { value: item.portraitValue, name: item.portraitKey }
        })
        var mechanismDom = document.getElementById('mechanism');
        var mechanismDomChart = echarts.init(mechanismDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: '活动机制偏好',
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
                    data: mechanismList
                    // [
                    //     { value: 60, name: '抽奖', itemStyle: { color: '#E8D7BA' } }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 20, name: 'MGM', itemStyle: { color: '#FFECB3 ' } },
                    //     { value: 10, name: '积分兑换', itemStyle: { color: '#CFD8DC' } },
                    //     { value: 5, name: '门店促销', itemStyle: { color: '#C8E6C9' } },
                    //     { value: 5, name: '门店会员活动', itemStyle: { color: '#BBDEFB ' } }
                    // ]
                }
            ]
        };
        mechanismDomChart.setOption(option);
    }, [props.data])
    return (
        <div className="price bg-white p-20-40">
            <div className="title">营销活动信息-活动偏好</div>
            <Row>
                <Col md={12}>
                    <div id="content" style={{ width: 400, height: 350 }}></div>
                </Col>
                <Col md={12}>
                    <div id="mechanism" style={{ width: 400, height: 350 }}></div>
                </Col>
            </Row>
        </div>
    )
}