import React, { useState, useEffect } from 'react';
import Const from 'utils/Const';
import { Row, Col, Select, Cascader, message, Spin } from 'antd';
import { DownOutlined, LeftOutlined, UpOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import Peopel from './components/people'
import Sex from './components/sex';
import Level from './components/level';
import China from './components/china';
import Category from './components/category';
import ThreeTab from './components/three-tab';
import From from './components/from';
import Award from './components/award';
import Action from './components/action';
import Approach from './components/approach';
import Frequency from './components/frequency';
import Price from './components/price';
import { getGroupsPortrait, getCustomerInsight } from 'api/many-insight';
import { getLabelList } from 'api/label';
import './style.less';
import { groupConditionList } from 'utils/Json';

const { Option, OptGroup } = Select;


const Detail = (props) => {
    const [group, setGroup] = useState(props.location.state && props.location.state.group) //点击详情后存的缓存数据
    const [title, setTitle] = useState()
    const [ruleList, setRuleList] = useState([])
    const [condition, setCondition] = useState('1')
    const [showCondition, setShowCondition] = useState(true)
    const [basicData, setBasicData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [marketData, setMarketData] = useState([])
    const [priceData, setPrice] = useState([])
    const [firstData, setFirstData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getLabelList().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setFirstData(res.rows.filter(x => !x.parentId && x.hasChildren === '1'))
                if (!group && props.match.params.id) {
                    getCustomerInsight(props.match.params.id).then(resGroup => {
                        if (resGroup.code === Const.SUCCESS_CODE) {
                            setTitle(resGroup.data?.insightInfo.showName)
                            setDefaultGroup(resGroup.data, res.rows)
                            setLoading(false)
                        }
                    })
                }
                else if (group && group.rules) {
                    setTitle(group.insightInfo.showName)
                    setDefaultGroup(group, res.rows)
                    setLoading(false)
                }
            }
        })
    }, [group, props.match.params.id])

    const setDefaultGroup = (group, labelList) => {
        setCondition(group.rules[0].conjunctions)
        group.rules.sort((x1, x2) => x1.sortNum - x2.sortNum).map(rule => {
            rule.conditionField = rule.conditionField + ',' + rule.labelParentId
            rule.secondData = labelList.filter(x => x.parentId === rule.conditionType)
            let select = labelList.filter(x => x.parentId === rule.labelParentId)
            rule.lastSelect = select
        })
        setRuleList(group.rules)
    }

    useEffect(() => {
        getGroupsPortrait(props.match.params.id).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                //1，2，3，4是与后端约定取对应的数据
                setBasicData(res.data.filter(x => x.mainClassification === '1')) //性别，等级，地图
                setCategoryData(res.data.filter(x => x.mainClassification === '2')) //品类偏好
                setMarketData(res.data.filter(x => x.mainClassification === '3')) //三块活动信息
                setPrice(res.data.filter(x => x.mainClassification === '4')) //Approach Recency，频次，价格
            }
        })
    }, [props.match.params.id])
    return (
        <div id="many-detail">
            <Spin spinning={loading}>
                <div className="mt-20 bg-white p-10">
                    <Link to="/many-insight/list">  <LeftOutlined /> {title}</Link>
                </div>
                <div className="mt-20 bg-white p-20-40">
                    <div className="name">
                        <span>消费者客群洞察名称： {title}</span>
                    </div>
                    <div className="border"></div>
                    <div className="dorp-down" onClick={() => setShowCondition(!showCondition)}>
                        {showCondition ? <DownOutlined /> : <UpOutlined />}   当前消费者客群洞察的筛选条件
                    </div>
                    {showCondition ? <div>
                        <div className="user-rule">
                            <div className="rule-header">用户群规则满足</div>
                            <div className="rule-body">
                                <Row>
                                    {ruleList.length > 1 ?
                                        <Col md={1}>
                                            <div style={{ marginTop: 15 }} className={`condition ${condition === '1' ? 'active' : ''}`}>
                                                且
                                            </div>
                                            <div className={`condition ${condition === '0' ? 'active' : ''}`}>
                                                或
                                            </div>
                                        </Col> : null}
                                    <Col md={23}>
                                        {ruleList.map((item) => (
                                            <Row key={item.sortNum} gutter={20} className="mt-15">
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        disabled
                                                        value={item.conditionType}>
                                                        {firstData.map(f => (
                                                            <Option key={f.id} value={f.id}>{f.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        disabled
                                                        value={item.conditionField}
                                                    >
                                                        {item.secondData && item.secondData.map(f => (
                                                            <Option key={f.id} value={`${f.sqlCode},${f.id}`}>{f.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        value={item.conditionContext}
                                                        disabled>
                                                          {groupConditionList.map(item => (
                                                            <Option key={item.value} value={item.value}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        value={item.conditionRange ? item.conditionRange.split(',') : undefined}
                                                        disabled>
                                                        {item.lastSelect && item.lastSelect.map(ls => (
                                                            <Option key={ls.id} value={ls.labelName}>{ls.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="user-rule" style={{ marginTop: 20 }}>
                            <div className="rule-header">用户群行为满足</div>
                            <div className="rule-body"></div>
                        </div>
                    </div> : null}
                </div>
                <div className="mt-20 bg-white">
                    <div className="p-20-40">{title}-客户群洞察信息</div>
                </div>
                <div className="mt-20">
                    <Row gutter={20}>
                        <Col md={12}>
                            <Peopel title={title} data={basicData} />
                        </Col>
                        <Col md={12}>
                            <Sex title={title} data={basicData} />
                        </Col>
                    </Row>
                </div>
                <div className="mt-20">
                    <Row gutter={20}>
                        <Col md={12}>
                            <Level title={title} data={basicData} />
                        </Col>
                        <Col md={12}>
                            <China title={title} data={basicData} />
                        </Col>
                    </Row>
                </div>
                <div className="mt-20 bg-white">
                    <Category title={title} data={categoryData} />
                </div>
                <div className="mt-20 bg-white">
                    <ThreeTab title={title} id={props.match.params.id} />
                </div>
                <div className="mt-20">
                    <Row gutter={20}>
                        <Col md={12}>
                            <From title={title} data={marketData} />
                        </Col>
                        <Col md={12}>
                            <Award title={title} data={marketData} />
                        </Col>
                    </Row>
                </div>
                <div className="mt-20 bg-white">
                    <Action title={title} data={marketData} />
                </div>
                <div className="mt-20">
                    <Row gutter={20}>
                        <Col md={9}>
                            <Approach title={title} data={priceData} />
                        </Col>
                        <Col md={10}>
                            <Frequency title={title} data={priceData} />
                        </Col>
                        <Col md={5}>
                            <Price title={title} data={priceData} />
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    )
}

export default Detail