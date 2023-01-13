import React, { useState, useEffect } from 'react';
import Const from 'utils/Const';
import { useHistory, Link } from 'react-router-dom';
import { LeftOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Select, Form, Input, Button, message, Modal, Cascader, Spin } from 'antd';
import { addGroup, editGroup, deleteGroup } from 'api/many-insight';
import { getLabelList } from 'api/label';
import './style.less';
import { groupConditionList } from 'utils/Json';

const { Option, OptGroup } = Select;
const { confirm } = Modal;

const Edit = (props) => {
    const history = useHistory()
    const [group] = useState(props.location.state && props.location.state.group)
    const [groupId] = useState(props.match.params.id)
    const [condition, setCondition] = useState('and')
    const [editFlag, setEditFlag] = useState('0') // 针对Rule 0:未编辑 1: 已编辑
    const [updateMode, setUpdateMode] = useState(group && group.insightInfo ? group.insightInfo.updateMode : '0')
    const [insightInfo, setInsightInfo] = useState(group && group.insightInfo ? group.insightInfo : {})
    const [ruleList, setRuleList] = useState([{
        conditionType: null,
        conditionField: null,
        conditionContext: null, // 1: 等于 0: 不等于
        conditionRange: null, // 0:女 1:男 2:未知
        conjunctions: null,
        sortNum: 0,
        groupId: groupId,
        option: [],
        lastSelect: []
    }]) //[group.rules]
    const [allData, setAllData] = useState([])
    const [firstData, setFirstData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getLabelList().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setAllData(res.rows)
                setFirstData(res.rows.filter(x => !x.parentId && x.hasChildren === '1').sort((x1, x2) => x1.sort - x2.sort))
                if (group && group.rules) {
                    group.rules = group.rules.sort((x1, x2) => x1.sortNum - x2.sortNum)
                    setCondition(group.rules.length > 1 ? group.rules[1].conjunctions : 'and')
                    group.rules.sort((x1, x2) => x1.sortNum - x2.sortNum).map(rule => {
                        rule.conditionField = rule.conditionField + ',' + rule.labelParentId
                        rule.secondData = res.rows.filter(x => x.parentId === rule.conditionType)
                        let select = res.rows.filter(x => x.parentId === rule.labelParentId)
                        rule.lastSelect = select
                    })
                    setRuleList(group.rules)
                }
                setLoading(false)
            }
        })
    }, [group])

    const addRule = () => {
        let sortNums = ruleList.map((x) => x.sortNum)
        let maxSortNum = Math.max(...sortNums)
        let newRule = {
            conditionType: null,
            conditionField: null,
            conditionContext: null, // 1: 等于 0: 不等于
            conditionRange: null, // 0:未知 1:男 2:女
            conjunctions: 'and',
            sortNum: maxSortNum + 1,
            groupId: groupId,
            secondData: [],
            lastSelect: []
        }
        let newRuleList = ruleList.map(x => x)
        newRuleList.push(newRule)
        setEditFlag('1')
        setRuleList(newRuleList)
    }

    const deleteRule = (sortNum) => {
        let newRuleList = ruleList.filter((x) => x.sortNum !== sortNum);
        setEditFlag('1')
        setRuleList(newRuleList)
    }

    const onChange = (field, value) => {
        let data = insightInfo
        if (field === 'updateMode') {
            setUpdateMode(value)
        }
        data[field] = value
        setInsightInfo(data)
    };

    const onRuleChange = (field, value, sortNum) => {
        let newRuleList = ruleList.map(item => {
            if (item.sortNum === sortNum) {
                if (field === 'conditionType') {
                    let secondList = allData.filter(x => x.parentId === value).sort((x1, x2) => x1.sort - x2.sort)
                    item['secondData'] = secondList
                    item[field] = value
                    item['conditionField'] = null
                    item['conditionRange'] = null
                }
                if (field === 'conditionField') {
                    let valueList = value && value.split(',')
                    let select = allData.filter(x => x.parentId === valueList[1]).sort((x1, x2) => x1.sort - x2.sort)
                    item[field] = value // 0: code 1: parentId
                    item['labelParentId'] = valueList[1]
                    item['conditionRange'] = null
                    item['lastSelect'] = select
                }
                item[field] = value
            }
            return item
        })
        setEditFlag('1')
        setRuleList(newRuleList)
    }

    const onConditionChange = (value) => {
        let newRuleList = ruleList.map(item => {
            item.conjunctions = value
            return item
        })
        setCondition(value)
        setRuleList(newRuleList)
    }

    const validateRuleList = () => {
        let errorMessage = ''
        ruleList.map(r => {
            if (!r.conditionField) {
                errorMessage = '规则字段名称不能为空'
                return
            }
            if (!r.conditionContext) {
                errorMessage = '规则条件不能为空'
                return
            }
            if (!r.conditionRange) {
                errorMessage = '规则值不能为空'
                return
            }
        })
        return errorMessage
    }

    const saveInsight = () => {
        let errorMessage = validateRuleList()
        if (errorMessage) {
            message.warning(errorMessage)
            return
        }
        setLoading(true)
        let ruleListData = ruleList.map(x => {
            let valueList = x.conditionField.split(',') // 0: code 1: parentId
            return {
                conditionType: x.conditionType,
                conditionField: valueList[0],
                conditionContext: x.conditionContext, // 1: 等于 0: 不等于
                conditionRange: x.conditionRange,
                conjunctions: x.sortNum === 0 ? ' ' : x.conjunctions,
                labelParentId: valueList[1],
                sortNum: x.sortNum,
                groupId: x.groupId,
            }
        })
        if (group) {
            let parmeters = { insightInfo: { ...insightInfo, updateMode }, rules: ruleListData, editFlag }
            editGroup(parmeters).then(res => {
                if (res.code === Const.SUCCESS_CODE) {
                    message.success('编辑成功')
                    setLoading(false)
                    history.push('/many-insight/list')
                }
            }).catch(error => {
                setLoading(false)
            })
        } else {
            let parmeters = { insightInfo: { ...insightInfo, updateMode }, rules: ruleListData }
            addGroup(parmeters).then(res => {
                if (res.code === Const.SUCCESS_CODE) {
                    message.success('创建成功')
                    setLoading(false)
                    history.push('/many-insight/list')
                }
            }).catch(error => {
                setLoading(true)
            })
        }
    }

    const deleteGroupById = () => {
        confirm({
            content: '是否确认删除此条消费者客群洞察',
            onOk() {
                setLoading(true)
                deleteGroup(groupId).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        message.success('删除成功')
                        setLoading(false)
                        history.push('/many-insight/list')
                    }
                })
            },
            onCancel() {
            },
        });
    }
    return (
        <div id="many-edit">
            <Spin spinning={loading}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    onFinish={saveInsight}
                    initialValues={insightInfo}
                >
                    <div className="mt-20 bg-white p-10">
                        <Link to="/many-insight/list"><LeftOutlined /> {groupId ? '编辑' : '创建'}消费者客群洞察</Link>
                    </div>
                    <div className="mt-20 bg-white p-20-40">
                        <div className="name">
                            <span className="title">基础信息</span>
                        </div>
                        <div className="border"></div>
                        <div>
                            <Row gutter={20}>
                                <Col md={8}>
                                    <Form.Item
                                        label="分群显示名"
                                        name="showName"
                                        rules={[{ required: true, message: '请输入分群显示名' }]}
                                    >
                                        <Input onChange={(e) => onChange('showName', e.target.value)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="分群名称"
                                        name="groupName"
                                        rules={[{ required: true, message: '请输入分群名称' }]}
                                    >
                                        <Input onChange={(e) => onChange('groupName', e.target.value)} />
                                    </Form.Item>
                                    <Form.Item label="更新方式"
                                        name="updateMode">
                                        <Row>
                                            <Col md={12} className={`condition left-border ${updateMode === '0' ? 'active' : ''}`} onClick={() => { onChange('updateMode', '0') }}>
                                                例行
                                            </Col>
                                            <Col md={12} className={`condition right-border ${updateMode === '1' ? 'active' : ''}`} onClick={() => { onChange('updateMode', '1') }}>
                                                手动
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Col>
                                <Col md={16}>
                                    <Form.Item
                                        label="备注"
                                        name="remark"
                                        labelCol={{ span: 1 }}
                                        wrapperCol={{ span: 22 }}
                                    ><Input.TextArea rows={7} onChange={(e) => onChange('remark', e.target.value)}></Input.TextArea></Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="mt-20 bg-white p-20-40">
                        <div className="title mb-20">分群规则</div>
                        <div className="user-rule">
                            <div className="rule-header">
                                <Row>
                                    <Col md={12}>用户群规则满足</Col>
                                    <Col md={12} className="primary-color text-right cursor-pointer"><PlusCircleOutlined /> 添加</Col>
                                </Row>
                            </div>
                            <div className="rule-body">
                                <Row>
                                    {ruleList.length > 1 ?
                                        <Col md={1}>
                                            <div style={{ marginTop: 15 }} className={`condition ${condition === 'and' ? 'active' : ''}`} onClick={() => onConditionChange('and')}>
                                                且
                                            </div>
                                            <div className={`condition ${condition === 'or' ? 'active' : ''}`} onClick={() => onConditionChange('or')}>
                                                或
                                            </div>
                                        </Col> : null}
                                    <Col md={23}>
                                        {ruleList.map((item) => (
                                            <Row key={item.sortNum} gutter={20} className="mt-15">
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        placeholder="类型名称"
                                                        value={item.conditionType}
                                                        onChange={(value) => onRuleChange('conditionType', value, item.sortNum)}>
                                                        {firstData.map(f => (
                                                            <Option key={f.id} value={f.id}>{f.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        showSearch
                                                        optionFilterProp="children"
                                                        placeholder="字段名称"
                                                        value={item.conditionField}
                                                        onChange={(value) => onRuleChange('conditionField', value, item.sortNum)}>
                                                        {item.secondData && item.secondData.map(f => (
                                                            <Option key={f.id} value={`${f.sqlCode},${f.id}`}>{f.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        placeholder="条件"
                                                        value={item.conditionContext}
                                                        onChange={(value) => onRuleChange('conditionContext', value, item.sortNum)}>
                                                        {groupConditionList.map(item => (
                                                            <Option key={item.value} value={item.value}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        placeholder="值"
                                                        mode="multiple"
                                                        value={item.conditionRange ? item.conditionRange.split(',') : undefined}
                                                        onChange={(value) => onRuleChange('conditionRange', value && value.join(','), item.sortNum)}>
                                                        {item.lastSelect && item.lastSelect.map(ls => (
                                                            <Option key={ls.id} value={ls.labelName}>{ls.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2} className="primary-color text-right cursor-pointer" onClick={() => addRule()} >
                                                    <PlusCircleOutlined /> 新增
                                                </Col>
                                                {ruleList.length > 1 ? <Col md={2} className="primary-color text-right cursor-pointer" onClick={() => deleteRule(item.sortNum)} >
                                                    <DeleteOutlined /> 删除
                                                </Col> : null}
                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="user-rule" style={{ marginTop: 20 }}>
                            <div className="rule-header">
                                <Row>
                                    <Col md={12}>用户群行为满足</Col>
                                    <Col md={12} className="primary-color text-right cursor-pointer"><PlusCircleOutlined /> 添加</Col>
                                </Row>
                            </div>
                            <div className="rule-body"></div>
                        </div>
                    </div>
                    <div className="mt-20 text-center">
                        {groupId ?
                            <Button onClick={() => deleteGroupById()}
                                type="default"
                                style={{ width: '120px', marginRight: '30px' }}
                            >删除</Button> : null}
                        <Button htmlType="submit" type="primary" style={{ width: '120px' }}> {groupId ? '保存' : '创建'}</Button>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}

export default Edit