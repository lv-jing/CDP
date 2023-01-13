import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs } from 'antd';
import RectangleValue from 'components/RectangleValue';
//value image
import goumaicishu from "assets/images/font/value/goumaicishu.png";
import bidanjia from "assets/images/font/value/bidanjia.png";
import tuihuocishun from "assets/images/font/value/tuihuocishu.png";
import xiaofeizonge from "assets/images/font/value/xiaofeizonge.png";
import goumaishijian from "assets/images/font/value/goumaishijian.png";
import leijituihuan from "assets/images/font/value/leijituihuan.png";
import kedanjia from "assets/images/font/value/kedanjia.png";
import tuihuo from "assets/images/font/value/tuihuo.png";
//market image
import xianshang from "assets/images/font/market/xianshang.png";
import xianxia from "assets/images/font/market/xianxia.png";
import kefu from "assets/images/font/market/kefu.png";
import pinlv from "assets/images/font/market/pinlv.png";
import manyidu from "assets/images/font/market/manyidu.png";
import tuijian from "assets/images/font/market/tuijian.png";
import pingjia from "assets/images/font/market/pingjia.png";

const { TabPane } = Tabs;

export default function ValueMarket(props) {
    const [imagesFrist] = useState([
        goumaicishu,
        bidanjia,
        tuihuocishun,
        xiaofeizonge,
        goumaishijian,
        leijituihuan,
        kedanjia,
        tuihuo
    ])
    const [imagesSecond] = useState([
        xianshang,
        xianxia,
        kefu,
        pinlv,
        manyidu,
        tuijian,
        pingjia,
        leijituihuan
    ])
    const [valueFrist, setValueFrist] = useState([])
    const [valueSecond, setValueSecond] = useState([])
    useEffect(() => {
        setValueFrist(props.data.filter(x => x.mainClassification === '5').sort((x1, x2) => x1.subClassification - x2.subClassification)) // 价值贡献
        setValueSecond(props.data.filter(x => x.mainClassification === '6').sort((x1, x2) => x1.subClassification - x2.subClassification)) // 营销行为
    }, [props.data])

    return (
        <div className="type p-20-40">
            <Tabs defaultActiveKey="1">
                <TabPane tab="客户价值-价值贡献" key="1">
                    <Row gutter={20} className="mt-20">
                        {valueFrist.map((item, index) => (
                            <Col className="mb-20" md={6} key={item.id}>
                                <RectangleValue image={imagesFrist[index]} title={item.portraitKey} value={item.portraitValue} subClass={item.subClassification}/>
                            </Col>
                        ))}
                    </Row>
                </TabPane>
                <TabPane tab="客户价值-营销行为" key="2">
                    <Row gutter={20} className="mt-20">
                        {valueSecond.map((item, index) => (
                            <Col className="mb-20" md={6} key={item.id}>
                                <RectangleValue image={imagesSecond[index]} title={item.portraitKey} value={item.portraitValue} />
                            </Col>
                        ))}
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}