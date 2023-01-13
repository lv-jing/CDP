import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import EC from './channel-components/EC'
import Retail from './channel-components/Retail'
import CPG from './channel-components/CPG'
import All from './channel-components/All'
import Kong from "assets/images/font/image_kong.png"


export default function Channel(props) {
    const [selectKey, setSelectKey] = useState(1)
    const [ecData, setEcData] = useState([])
    const [retailData, setRetailData] = useState([])
    const [cpgData, setCpgData] = useState([])
    const [allData, setAllData] = useState([])

    useEffect(() => {
        let ec = props.data.filter(x => x.subClassification === '22') // EC渠道
        let retail = props.data.filter(x => x.subClassification === '23') // Retail渠道
        let cpg = props.data.filter(x => x.subClassification === '24') // CPG渠道
        let all = props.data.filter(x => x.subClassification === '21') // 所有渠道
        setEcData(ec)
        setRetailData(retail)
        setCpgData(cpg)
        setAllData(all)
    }, [props.data])
    return (
        <div className="channel p-20-40">
            <Row>
                <Col md={15}>
                    <div className="title">客户价值-购物渠道偏好</div>
                </Col>
                <Col md={9}>
                    <Row className="ctab-list">
                        <Col md={8} className={`ctab ${selectKey === 1 ? 'active' : ''}`} onClick={() => setSelectKey(1)}>
                            <span>所有渠道情况展示</span>
                        </Col>
                        <Col md={8} className={`ctab ${selectKey === 2 ? 'active' : ''}`} onClick={() => setSelectKey(2)}>
                            <span>分渠道展示</span>
                        </Col>
                        <Col md={8} className={`ctab ${selectKey === 3 ? 'active' : ''}`} onClick={() => setSelectKey(3)}>
                            <span> 线上线下渠道展示</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {selectKey === 1 ?
                <Row>
                    <Col md={8}>
                        <All data={allData} />
                    </Col>
                    {/* <Col md={8}>
                        <img src={Kong} alt="Kong" />
                    </Col>
                    <Col md={8}>
                        <img src={Kong} alt="Kong" />
                    </Col> */}
                </Row>
                : selectKey === 2 ?
                    <Row>
                        <Col md={8}>
                            <EC data={ecData} />
                        </Col>
                        <Col md={8}>
                            <Retail data={retailData} />
                        </Col>
                        <Col md={8}>
                            <CPG data={cpgData} />
                        </Col>
                    </Row> :
                    <Row>
                        <Col md={8}>
                            <img src={Kong} alt="Kong" />
                        </Col>
                        <Col md={8}>
                            <img src={Kong} alt="Kong" />
                        </Col>
                        <Col md={8}>
                            <img src={Kong} alt="Kong" />
                        </Col>
                    </Row>}
        </div>
    )
}