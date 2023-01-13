import React, { useState, useEffect } from 'react';
import './style.less'
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import number from 'assets/images/number.png';
import people from 'assets/images/people.png';
import use from 'assets/images/use.png';
import { getDetail, getLabelList } from "../../api/label";
import Const from "../../utils/Const";
import BarView from "./components/barView";

const cardData = [
    {
        text: '人数',
        number: 0,
        img: people
    },
    {
        text: '使用次数',
        number: 0,
        img: number
    },
    {
        text: '使用率',
        number: '0%',
        img: use
    },

]
export default function LableDetail(props) {
    const [loading, setLoading] = useState(false)
    const [barData, setBarData] = useState([])
    const [showName, setShowName] = useState('')
    const [id] = useState(props.match.params.id)

    async function getDetailData(id) {
        try {
            setLoading(true)
            const { code, data } = await getDetail(id)
            if (code && code === Const.SUCCESS_CODE) {
                setShowName(data.labelInfo.showName)
                setBarData(data.usedHistoryList)
                cardData[0].number = data.labelStatistics.useageNums
                cardData[1].number = data.labelStatistics.useageTimes
                cardData[2].number = data.labelStatistics.utilizationRate + '%'
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }

    }

    useEffect(() => {
        getDetailData(id)
    }, [id])

    return (
        <div className="lable-detail">
            <div className="mt-20 bg-white p-10 header">
                <Link to="/label/list"><LeftOutlined />{showName + '详情'}</Link>
            </div>
            <div className="content-container m-20">
                <div className='content-header p-10-20'>
                    <Row>
                        <Col md={12}>{showName}</Col>
                    </Row>
                </div>
                <div className="p-40">
                    <div className="mb-38">{showName ? `消费者在${showName}购买的人数统计，该标签为` : ''}</div>
                    <Row justify="space-around" align="middle">
                        {
                            cardData.map((item, index) => (
                                <Col span="7" key={index}>
                                    <div className='lable-detail-card'>
                                        <div>
                                            <div className="card-title">{item.text}</div>
                                            <div className="card-text">{item.number}</div>
                                        </div>
                                        <div className="card-detail-img mr-20">
                                            <img src={item.img} alt="" />
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div>
            <div className="content-container m-20">
                <div className='content-header p-10-20'>
                    <Row>
                        <Col md={12}>{showName ? showName + '标签历史详情' : ''}</Col>
                    </Row>
                </div>
                <div className="p-40">
                    <BarView data={barData} />
                </div>
            </div>
        </div>

    );
}
