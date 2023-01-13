import React, { useState, useEffect } from 'react';
import './style.less'
import { Col, Row, Spin } from "antd";
import ValueLabelEdit from './components/valueLabelEdit';
import ImportAdd from './components/importAdd';
import SolAdd from './components/solAdd';
import CustomerLabel from './components/customerLabel';

import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import one from 'assets/images/one.png';
import two from 'assets/images/two.png';
import three from 'assets/images/three.png';


const data = [
    {
        title: '创建方式-规则创建',
        text: '自定义标签值 (自定义每个标签的名称 和计算规则,将人群划分为多个分层)',
        img: one
    },
    {
        title: '创建方式-SQL创建',
        text: 'SQL创建 (使用返回的SQL结果作为标签值,为用户进行标记)',
        img: two
    },
    {
        title: '创建方式-导入创建',
        text: '导入创建 (使用上传文件计算结果作为 标签值,为用户进行标记)',
        img: three
    },

]

export default function LableCreate(props) {

    const [active, setActive] = useState(0)
    const [id] = useState(props.match.params.id)
    const [root] = useState(props.location.state && props.location.state.root)
    const [selectParent] = useState(props.location.state && props.location.state.selectParent)
    const [loading, setLoading] = useState(false)
    const handeleActive = (index) => {
        if (id) return
        setActive(index)
    }

    function loadingSet(val) {
        setLoading(val)
    }

    const returnUI = () => {
        if (!id) {
            return <CustomerLabel loadingSet={loadingSet}/>
        } else {
            if (root.labelName === '价值标签') {
                return <ValueLabelEdit id={id} loadingSet={loadingSet} />
            } else {
                return <CustomerLabel loadingSet={loadingSet} id={id} parentLabelName={root.labelName} selectParent={selectParent}/>
            }
        }
    }

    return (
        <Spin spinning={loading}>
            <div className="lable-list" id="label">
                <div className="mt-20 bg-white p-10 header">
                    <Link to="/label/list"><LeftOutlined />{id ? '编辑标签': '创建标签'}</Link>
                </div>
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>创建方式-规则创建</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        <Row justify="space-around" align="middle" gutter={24}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <Col span="8" key={index}>
                                            <div className={`lable-card ${active === index && 'active-show'
                                                }`} onClick={() => handeleActive(index)}>
                                                <div className="card-img mr-20">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <div>
                                                    <div className="card-title">{item.title}</div>
                                                    <div className="card-text">{item.text}</div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
                {
                    active === 0 ?
                        returnUI() : null
                }
                {
                    active === 1 ? <SolAdd /> : null
                }
                {
                    active === 2 ? <ImportAdd /> : null
                }

            </div>
        </Spin>

    );
}
