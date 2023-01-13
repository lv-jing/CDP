import React, { useEffect, useState } from 'react';
import { Row, Col, Radio } from 'antd';
import pingjia from "assets/images/font/pingjia.png"
import pinleipianhao from "assets/images/font/pinleipianhao.png"
import './style//summary-style.less'
import * as echarts from 'echarts'
import { getSummarizeData } from 'api/one-insight'
import Const from 'utils/Const';
import { toComma } from 'utils/tools';
import amount from "assets/images/font/summary/amount.png";
import time from "assets/images/font/summary/time.png";
import mount from "assets/images/font/summary/mount.png";
import one from "assets/images/font/summary/one.png";
import two from "assets/images/font/summary/two.png";
import three from "assets/images/font/summary/three.png";


export default function Summary(props) {
    const [statisticsTimeType, setStatisticsTimeType] = useState('R12')
    const [totalAmount, setTotalAmount] = useState([])
    const [consumeTime, setConsumeTime] = useState([])
    const [touchTime, setTouchTime] = useState([])
    const [turnTimeAmount, setTurnTimeAmount] = useState([])
    const [pingjiaData, setPingjiaData] = useState([])
    const [pingleiData, setPingleiData] = useState([])

    const [imageList] = useState([
        one,
        two,
        three,
    ])

    useEffect(() => {
        getSummarizeData({
            memberId: props.id,
            statisticsTimeType
        }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setTotalAmount(res.data.filter(x => x.mainClassification === '1'))
                setConsumeTime(res.data.filter(x => x.mainClassification === '2'))
                setTouchTime(res.data.filter(x => x.mainClassification === '3'))
                setTurnTimeAmount(res.data.filter(x => x.mainClassification === '4'))
                setPingjiaData(res.data.filter(x => x.mainClassification === '5'))
                setPingleiData(res.data.filter(x => x.mainClassification === '6'))
            }
        })
    }, [props.id, statisticsTimeType])

    useEffect(() => {
        let XpingjiaList = pingjiaData.sort((x1, x2) => x1.portraitKey - x2.portraitKey).map((item, index) => {
            return { name: item.portraitKey, min: 0 }
        })
        let YpingjiaList = pingjiaData.map(x => x.portraitValue)
        if (XpingjiaList.length === 0 || YpingjiaList.length === 0) {
            return
        }
        var pingjiaDom = document.getElementById('pingjia');
        var pingjiaChart = echarts.init(pingjiaDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            radar: {
                // shape: 'circle',
                indicator: XpingjiaList,
                // [
                //     { name: '客户贡献', max: 1000 },
                //     { name: '参与活动', max: 1000, axisLabel: { show: false } },
                //     { name: '品类消费', max: 1000, axisLabel: { show: false } },
                //     { name: '会员积分', max: 1000, axisLabel: { show: false } },
                //     { name: '接触途径', max: 1000, axisLabel: { show: false } },
                //     { name: '关系网', max: 1000, axisLabel: { show: false } }
                // ],
                splitNumber: 4,
                axisLabel: {
                    show: true,
                    showMinLabel: false
                },
                splitArea: {
                    areaStyle: {
                        color: ['#FFF']
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(233, 233, 233, 1)'
                    }
                }
            },
            series: [
                {
                    type: 'radar',
                    areaStyle: {
                        color: 'rgba(198, 162, 99, 0.3)'
                    },
                    lineStyle: {
                        color: 'rgba(198, 162, 99, 0.3)'
                    },
                    itemStyle: {
                        color: 'rgba(198, 162, 99, 1)'
                    },
                    data: [
                        {
                            value: YpingjiaList,
                            // [1000, 300, 400, 500, 600, 700],
                            name: '消费者购买潜力雷达图'
                        }
                    ]
                }
            ]
        };
        pingjiaChart.setOption(option);
    }, [pingjiaData])

    useEffect(() => {
        let pingleiList = pingleiData.map(item => {
            return { name: item.portraitKey, value: item.portraitValue }
        })
        var pingleiDom = document.getElementById('pinglei');
        var pingleiChart = echarts.init(pingleiDom);
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                icon: 'circle',
                textStyle: {
                    fontSize: '12px'
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['55%', '60%'],
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
                            formatter: '{c}'
                        }
                    },
                    data: pingleiList
                    // [
                    //     { value: 1048, name: 'Chocolate' }, //, itemStyle: { color: '#EFDBFF' }
                    //     { value: 735, name: 'Case' },
                    //     { value: 580, name: 'Core and Innovation' },
                    //     { value: 484, name: 'Column3' },
                    //     { value: 300, name: 'Column4' },
                    //     { value: 300, name: 'Column5' },
                    //     { value: 300, name: 'Column6' },
                    //     { value: 300, name: 'Column7' }
                    // ]
                }
            ]
        };
        pingleiChart.setOption(option);
    }, [pingleiData])

    function onChange(e) {
        setStatisticsTimeType(e.target.value)
    }
    return (
        <div id="summary">

            <div className="time">
                <Row gutter={20}>
                    <Col md={18} >
                        <div className="bg-white p-20 mt-20">
                            <Row>
                                <Col md={12}>
                                    <span className="f-w600"><span className="primary-color mr-10">|</span>数据概览</span>
                                </Col>
                                <Col md={12}>
                                    <div className="mb-20 text-right">
                                        <Radio.Group size={'default'} buttonStyle="solid" onChange={onChange}
                                            style={{ width: "40%" }} value={statisticsTimeType}>
                                            <Radio.Button value="R12"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>R12</Radio.Button>
                                            <Radio.Button value="YTD"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>YTD</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col md={8}>
                                    <div className="data-view p-20">
                                        <Row>
                                            <Col md={12}>
                                                <div>消费金额</div>
                                            </Col>
                                            <Col md={12} className="text-right">
                                                <img src={amount} alt="amount" />
                                            </Col>
                                        </Row>
                                        <div className="mt-10">
                                            <span className="value"> {toComma((totalAmount.find(x => x.subClassification === '11'))?.portraitValue)}</span>
                                            <span className="nuit">元</span >
                                        </div>
                                        <div className="mt-10">折扣率：{(((totalAmount.find(x => x.subClassification === '12'))?.portraitValue ?? 0) * 100)?.toFixed(2)}%</div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="data-view p-20">
                                        <Row>
                                            <Col md={12}>
                                                <div>消费单数</div>
                                            </Col>
                                            <Col md={12} className="text-right">
                                                <img src={mount} alt="mount" />
                                            </Col>
                                        </Row>
                                        <div className="mt-10">
                                            <span className="value"> {toComma((consumeTime.find(x => x.subClassification === '21'))?.portraitValue)}</span>
                                            <span className="nuit">次</span >
                                        </div>
                                        <div className="mt-10">笔单价：{(consumeTime.find(x => x.subClassification === '22'))?.portraitValue ?? 0}元</div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="data-view p-20">
                                        <Row>
                                            <Col md={12}>
                                                <div>活动圈选次数</div>
                                            </Col>
                                            <Col md={12} className="text-right">
                                                <img src={time} alt="time" />
                                            </Col>
                                        </Row>
                                        <div className="mt-10">
                                            <span className="value">{(touchTime.find(x => x.subClassification === '31'))?.portraitValue}</span>
                                            <span className="nuit">次</span >
                                        </div>
                                        <div className="mt-10">转化率：{(((touchTime.find(x => x.subClassification === '32'))?.portraitValue ?? 0) * 100)?.toFixed(2)}%</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="bg-white top3-padding mt-20">
                            <span className="f-w600"><span className="primary-color mr-10">|</span>TOP3使用标签</span>
                            {imageList.map((image, index) => (
                                <Row className="mt-20" key={index}>
                                    <Col md={14}>
                                        <img src={image} alt="topImage" className="mr-5"/>
                                        {turnTimeAmount[index] ? turnTimeAmount[index].portraitKey + ':' : ''}
                                    </Col>
                                    <Col md={10}>
                                        <span>{turnTimeAmount[index] ? turnTimeAmount[index].portraitValue + '次' : ''}</span>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="chart">
                <Row gutter={20}>
                    <Col md={12}>
                        <div className="bg-white p-20">
                            <img src={pingjia} alt="pingjia" />
                            <span>消费者购买潜力雷达图</span>
                            <div id="pingjia" className="chart-item"></div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="bg-white p-20">
                            <img src={pinleipianhao} alt="pinleipianhao" />
                            <span>品类偏好</span>
                            <div id="pinglei" className="chart-item"></div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}