import React, { useState, useEffect } from 'react';
import {
    Menu, Col, Form, Input, Row, Button, Radio, Select, message, Dropdown, Popconfirm, Modal
} from "antd";
import { CopyOutlined, PlusCircleOutlined, DeleteOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import '../style.less';
import { getValueList, generateCode, createCustomerLabel, getLabelDictionary, editCustomerLabel, deleteCustomerLabel } from "api/label";
import Const from "utils/Const";
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { conditionList } from 'utils/Json';

const { confirm } = Modal;

const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

const CustomerLabel = (props) => {
    const history = useHistory()
    const [id] = useState(props.id)
    const [form] = Form.useForm()
    const [ruleForm] = Form.useForm()
    const [initialValues, setInitialValues] = useState({
        updateMode: '例行'
    })
    const [labelDictionary, setLabelDictionary] = useState([])
    const [nameList, setNameList] = useState([{ name: '分层', id: 1, remark: '', condition: 'and' }]) //分层的list
    const [selectName, setSelectName] = useState('分层') //为了显示对应的name，与提交数据无关
    const [selectRemark, setSelectRemark] = useState('') //为了显示对应的ramark，与提交数据无关
    const [selectCondition, setSelectCondition] = useState('and') //为了显示对应的条件，与提交数据无关
    const [selectId, setSelectId] = useState(1)
    const [ruleList, setRuleList] = useState([{
        conditionType: null,
        conditionField: null,
        conditionContext: null,
        conditionRange: null,
        conjunctions: 'and',
        sortNum: 0,
        templateId: 1 //用于联动分层，后端不会获取该数据
    }]) //分层的list的id对应ruleList的templateId
    const [selectRuleList, setSelectRuleList] = useState([])
    const [topLabels] = useState((JSON.parse(localStorage.getItem('lable-top-parent'))).filter(x => x.title !== '价值标签')) //不能新建价值标签

    useEffect(() => {
        props.loadingSet(true)
        getLabelDictionary().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setLabelDictionary(res.rows)
            }
        })
        if (props.id) {
            getValueList({
                labelId: props.id,
                parentLabelName: props.parentLabelName,
                lableCnName: props.selectParent.labelName,
                sqlCode: props.selectParent.sqlCode
            }).then(res => {
                if (res.code === Const.SUCCESS_CODE) {
                    const result = res.data
                    let newNameList = result.childLabelStatistics.map(item => {
                        let nameRuleList = result.ruleList && result.ruleList.filter(x => x.labelId === item.labelId)
                        return {
                            name: item.labelName,
                            id: item.labelId,
                            remak: item.remark,
                            condition: nameRuleList.length > 1 ? nameRuleList[1].conjunctions : 'and'
                        }
                    })
                    let newRules = result.ruleList && result.ruleList.map(item => {
                        return {
                            conditionField: item.conditionField,
                            conditionContext: item.conditionContext,
                            conditionRange: item.conditionRange,
                            conjunctions: item.conjunctions,
                            sortNum: item.sortNum,
                            templateId: item.labelId
                        }
                    })
                    form.setFieldsValue({
                        ...result.labelInfo
                    })
                    setNameList(newNameList)
                    setRuleList(newRules)
                    if (newNameList.length > 0) {
                        ruleForm.setFieldsValue({
                            ruleName: newNameList[0].name,
                            remark: newNameList[0].remark
                        })
                        setSelectRemark(newNameList[0].remark)
                        setSelectName(newNameList[0].name)
                        setSelectId(newNameList[0].id)
                        setSelectCondition(newNameList[0].condition)
                    }
                    props.loadingSet(false)
                }
            })
        } else {
            generateCode().then(res => {
                if (res.code === Const.SUCCESS_CODE) {
                    form.setFieldsValue({ 'labelCode': res.data })
                    props.loadingSet(false)
                }
            })
            ruleForm.setFieldsValue({
                ruleName: '分层'
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, ruleForm])

    useEffect(() => {
        setSelectRuleList(ruleList.filter(x => x.templateId === selectId))
    }, [ruleList, selectId])

    const validateRuleList = () => {
        let errorMessage = ''
        ruleList.filter(x => x.templateId === selectId).map(r => {
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

    const setSelectItem = (item, isDelete) => {
        if (isDelete) {
            ruleForm.setFieldsValue({
                ruleName: item.name,
                remark: item.remark
            })
        }
        ruleForm.validateFields().then(values => {
            if (!isDelete) {
                let errorMessage = validateRuleList()
                if (errorMessage) {
                    message.warning(errorMessage)
                    return
                }
            }
            ruleForm.setFieldsValue({
                ruleName: item.name,
                remark: item.remark
            })
            setSelectRemark(item.remark)
            setSelectName(item.name)
            setSelectId(item.id)
            setSelectCondition(item.condition)
        })
    }

    const addRule = (newId) => {
        let sortNums = ruleList.map((x) => x.sortNum)
        let maxSortNum = Math.max(...sortNums)
        let newRule = {
            conditionType: null,
            conditionField: null,
            conditionContext: null,
            conditionRange: null,
            conjunctions: 'and',
            sortNum: maxSortNum + 1,
            templateId: newId
        }
        let newRuleList = ruleList.map(x => x)
        newRuleList.push(newRule)
        setRuleList(newRuleList)
    }

    const deleteRule = (sortNum, selectId) => {
        let newRuleList = ruleList.filter((x) => x.templateId !== selectId || x.sortNum !== sortNum);
        setRuleList(newRuleList)
    }

    const onConditionChange = (value, selectId) => {
        let newRuleList = ruleList.map(item => {
            if (item.templateId === selectId) {
                item.conjunctions = value
            }
            return item
        })
        let newNameList = nameList.map(item => {
            if (item.id === selectId) {
                item.condition = value
            }
            return item
        })
        setSelectCondition(value)
        setNameList(newNameList)
        setRuleList(newRuleList)
    }

    const onRuleChange = (field, value, sortNum) => {
        let newRuleList = ruleList.map(item => {
            if (item.templateId === selectId) {
                if (item.sortNum === sortNum) {
                    if (field === 'conditionField') {
                        item.conditionField = value
                        item['conditionContext'] = null
                        item['conditionRange'] = null
                    } else {
                        item[field] = value
                    }
                }
            }
            return item
        })
        setRuleList(newRuleList)
    }

    const onRuleNameChange = (value) => {
        setSelectName(value)
        let newNameList = nameList.map(item => {
            if (item.id === selectId) {
                item.name = value
            }
            return item
        })
        setNameList(newNameList)
    }

    const onRemarkChange = (value) => {
        let newNameList = nameList.map(item => {
            if (item.id === selectId) {
                item.remark = value
            }
            return item
        })
        setSelectRemark(value)
        setNameList(newNameList)
    }

    const addLableRule = () => {
        ruleForm.validateFields().then(values => {
            let errorMessage = validateRuleList()
            if (errorMessage) {
                message.warning(errorMessage)
                return
            }
            let newNameList = nameList
            let newId = uuidv4().replaceAll('-', '')
            let newName = `分层`
            let newNameItem = { name: newName, id: newId, condition: 'and', remark: '' }
            newNameList.push(newNameItem)
            setSelectItem(newNameItem)
            setNameList(newNameList)
            addRule(newId)
        })
    }

    const createNewLabel = () => {
        form.validateFields().then(values => {
            ruleForm.validateFields().then(ruleValues => {
                let errorMessage = validateRuleList()
                if (errorMessage) {
                    message.warning(errorMessage)
                    return
                }
                let labelValueList = []
                nameList.map((item, index) => {
                    let newRuleList = ruleList.filter(x => x.templateId === item.id)
                    let sortNumList = newRuleList.map(x => x.sortNum)
                    let min = Math.min(...sortNumList)
                    newRuleList.map(newRule => {
                        if (newRule.sortNum === min) {
                            newRule.conjunctions = ' '
                        }
                    }) //第一个规则不存and和or 存空 方便拼SQL
                    let labelValue = {
                        labelName: item.name,
                        remark: item.remark,
                        parentId: id,
                        rules: newRuleList,
                        sort: index
                    }
                    labelValueList.push(labelValue)
                })
                let parent = topLabels.find(x => x.id === values.parentId)
                if (id) {
                    editCustomerLabel({
                        labelInfo: {
                            ...values, showName: parent.title, id: id, sqlCode: values.labelName
                        },
                        editFlag: "1",
                        labelValues: labelValueList
                    }).then(res => {
                        if (res.code === Const.SUCCESS_CODE) {
                            history.push('/label/list')
                        }
                    })
                } else {
                    createCustomerLabel({
                        labelInfo: {
                            ...values, showName: parent.title, sqlCode: values.labelName
                        },
                        labelValues: labelValueList
                    }).then(res => {
                        if (res.code === Const.SUCCESS_CODE) {
                            history.push('/label/list')
                        }
                    })
                }
            })
        })
    }

    const deleteName = () => {
        let newNameList = nameList.filter(x => x.id !== selectId)
        setSelectItem(newNameList[0], true)
        setNameList(newNameList)

        let newRuleList = ruleList.filter(x => x.templateId !== selectId)
        setRuleList(newRuleList)
    }

    const copyName = () => {
        ruleForm.validateFields().then(values => {
            let errorMessage = validateRuleList()
            if (errorMessage) {
                message.warning(errorMessage)
                return
            }
            let copiedName = nameList.find(x => x.id === selectId)
            let newId = uuidv4().replaceAll('-', '')
            let newName = { name: copiedName.name + '-copy', id: newId, remark: copiedName.remark, condition: 'and' }
            setSelectItem(newName)

            let newNameList = nameList
            newNameList.push(newName)
            setNameList(newNameList)
            addRule(newName.id)
        })
    }

    const handleMenuClick = ({ key }) => {
        if (key === 'copy') {
            copyName()
        }
        if (key === 'delete') {
            deleteName()
        }
    }

    const handleDelete = () => {
        confirm({
            content: '是否确认删除此标签吗？',
            onOk() {
                deleteCustomerLabel(id).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        message.success('删除成功')
                        history.push('/label/list')
                    }
                })
            },
            onCancel() {
            },
        });
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="copy" style={{ color: 'dodgerblue' }}>
                <div><CopyOutlined className="mr-10" />复制</div>
            </Menu.Item>
            {nameList.length > 1 ?
                <Menu.Item key="delete" style={{ color: 'red' }}>
                    <div><DeleteOutlined className="mr-10" />删除</div>
                </Menu.Item> : null}
        </Menu>
    );

    return (
        <div className="lable-list">
            <div className="content-container m-20">
                <div className='content-header p-10-20'>
                    <Row>
                        <Col md={12}>规则创建-基础信息</Col>
                    </Row>
                </div>
                <div className="p-40">
                    <Form form={form} initialValues={initialValues} {...layout} name="control-ref"
                    >
                        <Row gutter={24}>
                            <Col span="8">
                                <Col span={24}>
                                    <Form.Item
                                        label="标签ID"
                                        name="labelCode"
                                        rules={[{ required: true, message: '请输入标签ID' }]}
                                    >
                                        <Input size={'large'} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="标签名"
                                        name="labelName"
                                        rules={[{ required: true, message: '请输入标签名' }]}
                                    >
                                        <Input size={'large'} />
                                    </Form.Item>
                                </Col>
                                {/* <Col span={24}>
                                    <Form.Item
                                        label="SQL Code"
                                        name="sqlCode"
                                        rules={[{ required: true, message: '请输入标签SQL Code' }]}
                                    >
                                        <Input size={'large'} />
                                    </Form.Item>
                                </Col> */}
                                <Col span={24}>
                                    <Form.Item name="parentId"
                                        label='标签类型'
                                        rules={[{ required: true, message: '请选择标所属类型' }]}
                                    >
                                        <Select>
                                            {topLabels.map(item => (
                                                <Option key={item.id} value={item.id}>{item.title}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span="24">
                                    <Form.Item
                                        label="更新方式："
                                        name="updateMode"
                                        rules={[{ required: true, message: '请输入分群显示名' }]}
                                    >
                                        <Radio.Group size={'large'} buttonStyle="solid"
                                            style={{ width: "100%" }}>
                                            <Radio.Button value="例行"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>例行</Radio.Button>
                                            <Radio.Button value="手动"
                                                style={{
                                                    width: "50%",
                                                    textAlign: "center"
                                                }}>手动</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    label="备注："
                                    name="remark"
                                    labelCol={{ span: 1 }}
                                    wrapperCol={{ span: 22 }}
                                >
                                    <Input.TextArea rows={7} className="w-100"></Input.TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="content-container m-20">
                <div className='content-header p-10-20'>
                    <Row>
                        <Col md={12}>规则创建-标签规则</Col>
                    </Row>
                </div>
                <div className="p-40">
                    <Row gutter={10}>
                        {nameList.sort((x1, x2) => x1.id - x2.id).map(item => (
                            <Col span={4} key={item.id} className="mb-20">
                                <Row onClick={() => { setSelectItem(item) }} className={`label-btn ${selectId === item.id ? 'active' : ''}`}>
                                    <Col md={24}>{item.name} </Col>
                                </Row>
                                {
                                    selectId === item.id ? <Dropdown trigger={['click']} overlay={menu}>
                                        <a className="ant-dropdown-link name-link" onClick={e => e.preventDefault()}>
                                            <MoreOutlined />
                                        </a>
                                    </Dropdown> : null
                                }
                            </Col>
                        ))}

                        <Col span={4}>
                            <div className="add-label-btn" onClick={() => addLableRule()}><PlusOutlined />添加分层</div>
                        </Col>
                    </Row>
                    <div>
                        <Form form={ruleForm}>
                            <Form.Item
                                label=""
                                name="ruleName"
                                rules={[{ required: true, message: '请输入分层名称' }]}
                            >
                                <Input className="w-64 mt-20" placeholder="分层名称"
                                    value={selectName}
                                    onChange={(e) => onRuleNameChange(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="remark"
                            >
                                <Input.TextArea rows={7} className="w-64 mt-20" placeholder="分层描述"
                                    value={selectRemark}
                                    onChange={(e) => onRemarkChange(e.target.value)}></Input.TextArea>
                            </Form.Item>
                        </Form>
                        <div className="user-rule mt-20">
                            <div className="rule-header">
                                <Row>
                                    <Col md={12}>用户群规则满足</Col>
                                </Row>
                            </div>
                            <div className="rule-body">
                                <Row>
                                    {selectRuleList.length > 1 ?
                                        <Col md={1}>
                                            <div style={{ marginTop: 15 }} className={`condition ${selectCondition === 'and' ? 'active' : ''}`} onClick={() => onConditionChange('and', selectId)}>
                                                且
                                            </div>
                                            <div className={`condition ${selectCondition === 'or' ? 'active' : ''}`} onClick={() => onConditionChange('or', selectId)}>
                                                或
                                            </div>
                                        </Col> : null}
                                    <Col md={23}>
                                        {selectRuleList.map((item) => (
                                            <Row key={item.sortNum} gutter={20} className="mt-15">
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        showSearch
                                                        optionFilterProp="children"
                                                        placeholder="字段名称"
                                                        value={item.conditionField}
                                                        onChange={(value) => onRuleChange('conditionField', value, item.sortNum)}>
                                                        {labelDictionary.map(item => (
                                                            <Option key={item.labelCode} value={item.labelCode}>{item.labelName}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Select className="w-100"
                                                        placeholder="条件"
                                                        value={item.conditionContext}
                                                        onChange={(value) => onRuleChange('conditionContext', value, item.sortNum)}>
                                                        {conditionList.map(item => (
                                                            <Option key={item.value} value={item.value}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Input placeholder="值" value={item.conditionRange} onChange={(e) => onRuleChange('conditionRange', e.target.value, item.sortNum)} />
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2} className="primary-color text-right cursor-pointer" onClick={() => addRule(selectId)} >
                                                    <PlusCircleOutlined /> 新增
                                                </Col>
                                                {selectRuleList.length > 1 ? <Col md={2} className="primary-color text-right cursor-pointer" onClick={() => deleteRule(item.sortNum, selectId)} >
                                                    <DeleteOutlined /> 删除
                                                </Col> : null}
                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <Row span={24} className="mt-20">
                        <Col span="24" className="text-center">
                            {
                                id ?
                                    <Button htmlType="button" type="default" onClick={() => handleDelete()}
                                        className="create-but mr-20">删除</Button> : null
                            }
                            <Button htmlType="submit" type="primary" onClick={() => createNewLabel()}
                                className="create-but">{id ? '保存' : '创建'}</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default CustomerLabel