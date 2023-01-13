import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import './style.less'


export default function Cricle(props) {
    const [level, setLevel] = useState('')
    const [descption, setDescption] = useState('')
    useEffect(() => {
        if(!props.point) {
            return
        }
        let point = parseFloat(props.point)
        if (point >= 0 && point <= 2) {
            setLevel('low')
            if(props.title==='忠诚度') {
                setDescption('低度忠诚')
            }
            if(props.title==='活跃度') {
                setDescption('低度活跃')
            }
            if(props.title==='价值度') {
                setDescption('低价值')
            }
        }
        if (point >= 3 && point <= 4) {
            setLevel('middle')
            if(props.title==='忠诚度') {
                setDescption('中度忠诚')
            }
            if(props.title==='活跃度') {
                setDescption('中度活跃')
            }
            if(props.title==='价值度') {
                setDescption('中价值')
            }
        }
        if (point >= 5) {
            setLevel('high')
            if(props.title==='忠诚度') {
                setDescption('高度忠诚')
            }
            if(props.title==='活跃度') {
                setDescption('高度活跃')
            }
            if(props.title==='价值度') {
                setDescption('高价值')
            }
        }
    }, [props.point, props.title])

    return (
        <div className={` cricle-border ${level}`} id="cricle">
            <Row>
                <Col md={8}>
                    <div className="left-cricle">
                        <div className="cricle cricle-color"></div>
                        <div className="water water-color"></div>
                        <img src={props.image} alt="huoyuedu" />
                    </div>
                </Col>
                <Col md={16}>
                    <div>
                        <div className="rata-panel">
                            <span className="rate-lable">{props.title}:</span>
                            <span className="rate"> {props.point} </span>
                        </div>
                        <div className="rate-level">{descption}</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}