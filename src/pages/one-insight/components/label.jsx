import React, { useState, useEffect } from 'react';
import { Row, Col, Radio } from 'antd';
import RFM from './lable-components/RFM';
import Channel from './lable-components/channel';
import ValueMarket from './lable-components/value-market';
import Type from './lable-components/type';
import From from './lable-components/from';
import Award from './lable-components/award';
import Price from './lable-components/price';
import Action from './lable-components/action';
import { getLableData } from 'api/one-insight'
import Const from 'utils/Const';
import './style/lable-style.less';

export default function Lable(props) {
    const [statisticsTimeType, setStatisticsTimeType] = useState('R12')
    const [userInfo] = useState(props.userInfo)
    const [rmfData, setRmfData] = useState([])
    const [channel, setChannel] = useState([])
    const [typeData, setTypeData] = useState([])
    const [marketData, setMarketData] = useState([])
    const [valueData, setValueData] = useState([])
    useEffect(() => {
        getLableData({
            memberId: props.id,
            statisticsTimeType
        }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                {
                    //1，2，3，4，5, 6是与后端约定取对应的数据
                    setRmfData(res.data.filter(x => x.mainClassification === '1')) //RFM
                    setChannel(res.data.filter(x => x.mainClassification === '2')) //购物渠道偏好
                    setTypeData(res.data.filter(x => x.mainClassification === '3')) //品类偏好
                    setMarketData(res.data.filter(x => x.mainClassification === '4')) //营销活动信息
                    setValueData([...res.data.filter(x => x.mainClassification === '5'),
                    ...res.data.filter(x => x.mainClassification === '6')]) // 客户价值
                }
            }
        })
    }, [props.id, statisticsTimeType])
    function onChange(e) {
        setStatisticsTimeType(e.target.value)
    }
    return (
        <div id="lable">
            <div className="mt-20 bg-white">
                <RFM data={userInfo} />
            </div>
            <div className="mt-20 bg-white">
                <div className="p-20 text-right">
                    <Radio.Group size={'large'} buttonStyle="solid" onChange={onChange}
                        style={{ width: "20%" }} value={statisticsTimeType}>
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
                <ValueMarket data={valueData} />
            </div>
            <div className="mt-20 bg-white">
                <Channel data={channel} />
            </div>
            <div className="mt-20">
                <Row gutter={20}>
                    <Col md={12}>
                        <From data={marketData} />
                    </Col>
                    <Col md={12}>
                        <Award data={marketData} />
                    </Col>
                </Row>
            </div>
            <div className="mt-20 bg-white">
                <Type data={typeData} />
            </div>

            {/* <div className="mt-20">
                <Row gutter={20}>
                    <Col md={18}>
                        <Action data={marketData} />
                    </Col>
                    <Col md={6}>
                        <Price data={marketData} />
                    </Col>
                </Row>
            </div> */}
        </div>
    )
}
