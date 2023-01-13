import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Row, Col, Tabs } from 'antd';
import RectangleValue from 'components/RectangleValue';
//value image
import goumaicishu from "assets/images/font/value/goumaicishu.png"
import bidanjia from "assets/images/font/value/bidanjia.png"
import tuihuocishun from "assets/images/font/value/tuihuocishu.png"
import xiaofeizonge from "assets/images/font/value/xiaofeizonge.png"
import goumaishijian from "assets/images/font/value/goumaishijian.png"
import leijituihuan from "assets/images/font/value/leijituihuan.png"
import kedanjia from "assets/images/font/value/kedanjia.png"
import tuihuo from "assets/images/font/value/tuihuo.png"
//market image
import xianshang from "assets/images/font/market/xianshang.png"
import xianxia from "assets/images/font/market/xianxia.png"
import kefu from "assets/images/font/market/kefu.png"
import pinlv from "assets/images/font/market/pinlv.png"
import manyidu from "assets/images/font/market/manyidu.png"
import tuijian from "assets/images/font/market/tuijian.png"
import pingjia from "assets/images/font/market/pingjia.png"
//belong image
import time from "assets/images/font/belong/time.png"
import source from "assets/images/font/belong/source.png"

import Const from 'utils/Const'
import { getGroupsBehaviorPortrait } from 'api/many-insight';
import moment from 'moment'

const { TabPane } = Tabs;

const ThreeTab = (props) => {
    const [valueMarketData, setValueMarketData] = useState({})
    useEffect(() => {
        getGroupsBehaviorPortrait(props.id).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setValueMarketData(res.data && res.data.length > 0 ? res.data[0] : {})
            }
        })
    }, [props.id])
    return (
        <div className="three-tab p-20-40">
            <Tabs defaultActiveKey="1">
                <TabPane tab={`${props.title}-价值贡献`} key="1">
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <RectangleValue image={goumaicishu} title="累计购买次数" value={valueMarketData.purchaseNums} />
                            {/* "20-25次" */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={bidanjia} title="笔单价（线上）" value={valueMarketData.price} />
                            {/* "500-700" */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={tuihuocishun} title="累计退货次数" value={valueMarketData.returnNums} />
                            {/* 2-3次 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={xiaofeizonge} title="消费总额" value={valueMarketData.totalConsumption} />
                            {/* 3500-4000 */}
                        </Col>
                    </Row>
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <RectangleValue image={goumaishijian} title="上次购买时间" value={moment(valueMarketData.lastPurchaseTime).format('YY-MM-DD hh:mm')} />
                            {/* 过去1～3个月 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={leijituihuan} title="累计退还金额" value={valueMarketData.accumulatedRefundAmount} />
                            {/* 200-300 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={kedanjia} title="客单价（线上）" value={valueMarketData.personPrice} />
                            {/* 300-500 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={tuihuo} title="退货率" value={valueMarketData.returnRate} />
                            {/* 1:是, 0:否 */}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={`${props.title}-营销行为`} key="2">
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <RectangleValue image={xianshang} title="线上活动参与次数(年)" value={valueMarketData.onlineActivityNums} />
                            {/* 1～5次 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={xianxia} title="线下活动参与次数(年)" value={valueMarketData.offlineActivityNums} />
                            {/* 6～10次 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={kefu} title="客服沟通渠道偏好" value={valueMarketData.communicationChannels} />
                            {/* 微信客服 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={pinlv} title="客服沟通频次(月)" value={valueMarketData.communicationNums} />
                            {/* 1～5次 */}
                        </Col>
                    </Row>
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <RectangleValue image={manyidu} title="客户满意度" value={valueMarketData.customerSatisfaction === '1' ? '满意' : '不满意'} />
                            {/* 1:满意 0 :不满意*/}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={pingjia} title="产品评价" value={valueMarketData.evaluation} />
                            {/* 好评 */}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={`${props.title}-归属行为`} key="3">
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <RectangleValue image={time} title="注册时间" value={moment(valueMarketData.registerTime).format('YY-MM-DD hh:mm')} />
                            {/* 1～5次 */}
                        </Col>
                        <Col md={6}>
                            <RectangleValue image={source} title="注册来源" value={valueMarketData.registerSource} />
                            {/* 6～10次 */}
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ThreeTab