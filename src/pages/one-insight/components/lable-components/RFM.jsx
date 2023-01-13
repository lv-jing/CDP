import React, { useState, useEffect } from 'react';
import { Row, Col,Tag } from 'antd';

export default function RFM(props) {
    const [labelWallList] = useState(props.data.labelWall)
    return (
        <div className="RFM p-20-40">
            <div className="title">标签墙</div>
            <Row gutter={20}>
                <Col md={24}>
                    {
                        labelWallList&&labelWallList.split(',').map((item,index)=>{
                            return(
                                <Tag className="mt-10" color="blue" key={index}>{item}</Tag>
                            )
                        })
                    }
                </Col>
            </Row>
        </div>
    )
}