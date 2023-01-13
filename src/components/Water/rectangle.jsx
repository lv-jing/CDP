import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import './style.less'

export default function Rectangle(props) {
    const [level, setLevel] = useState('')
    const [descption, setDescption] = useState('')
    useEffect(() => {
        let point = parseFloat(props.point)
        if (point > 0 && point <= 6) {
            setLevel('low')
            setDescption('等级: 低')
        }
        if (point > 6 && point <= 8) {
            setLevel('middle')
            setDescption('等级: 中')
        }
        if (point > 8 && point <= 10) {
            setLevel('high')
            setDescption('等级: 高')
        }
    }, [props.point])
    return (
        <div className={`rectangle-border ${level}`}>
            <Row gutter={10}>
                <Col md={8}>
                    <div className="left-cricle">
                        <div className="cricle cricle-color"></div>
                        <div className="water water-color"></div>
                        <img src={props.image} alt="huoyuedu" />
                    </div>
                </Col>
                <Col md={8}>
                    <div>
                        <div className="rata-panel">
                            <span className="rate-lable">{props.title}</span>
                        </div>
                        <div className="rate-level">{descption}</div>
                    </div>
                </Col>
                <Col md={8}>
                    <span className="rate"> {props.point} </span>
                </Col>
            </Row>
        </div>
    )
}
