import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import './style.less';

const index = (props) => {
    const getValue = (subClass, value) => {
        if (subClass === '57') {
            return (value * 100).toFixed(2)
        }
        return value
    }
    const getUnit = (subClassification) => {
        switch (subClassification) {
            case '51': //上一次购买距今天数
                return '天'
            case '52': // 上一次购买金额
                return '元'
            case '53': // 消费金额
                return '元'
            case '54': // 消费单数
                return '笔'
            case '55': // 笔单价
                return '元'
            case '56': // 笔单件
                return '件'
            case '57': // 折扣率
                return '%'
            case '58': // 年度退还金额
                return '元'
            default:
                break;
        }
    }
    return (
        <Row className="rectangle-value">
            <Col md={8}>
                <img src={props.image} alt="" />
            </Col>
            <Col md={16}>
                <div className="rectangle-title word-hide">
                    <Tooltip placement="top" title={props.title}>
                        {props.title}
                    </Tooltip>
                </div>
                <div className="my-value word-hide">
                    <Tooltip placement="top" title={getValue(props.subClass, props.value) + ' '+ getUnit(props.subClass)}>
                        {getValue(props.subClass, props.value)} {getUnit(props.subClass)}
                    </Tooltip>
                </div>
            </Col>
        </Row>
    )
}

export default index