import React, { useState, useEffect } from 'react';
import './style.less'
import { Button, Col, Form, Input, Row, Select, Spin, Switch, Divider, InputNumber, message, Popconfirm, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { creatDictionary, editDictionary, deleteDictionary, getDetail, getType } from "../../../api/system";
import Const from "../../../utils/Const";

const { confirm } = Modal
const { Option } = Select
const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};

export default function DictionaryCreate(props) {
    const [form] = Form.useForm()
    const history = useHistory();
    const [typeList, setTypeList] = useState([])
    const [name, setName] = useState('')
    const [initialValues, setInitialValues] = useState({
        status: false
    })
    const [id] = useState(props.match.params.id)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTypeList()
        form.setFieldsValue({ status: true })
        if (id) {
            setLoading(true)
            getDetailData()
        }

        async function getDetailData() {
            try {
                const { code, data } = await getDetail(id)
                if (code && code === Const.SUCCESS_CODE) {
                    form.setFieldsValue({ ...data, status: data.status !== '1' })
                    setLoading(false)
                }
            } catch (err) {
                setLoading(false)
            }
        }

    },
        [form, id]
    )

    async function getTypeList() {
        const { code, rows } = await getType()
        if (code && code === Const.SUCCESS_CODE) {
            setTypeList(rows)
        }
    }

    const onFinish = (values) => {
        setLoading(true)
        if (id) {
            edit(values)
        } else {
            setAdd(values)
        }
    }

    function edit(params) {
        editDictionary({
            id,
            ...params,
            status: params.status ? 0 : 1
        }).then(res => {
            if (res.code === 200) {
                setLoading(false)
                message.success('编辑成功')
                history.push('/system/dictionary')
            }
        })
    }

    function setAdd(params) {
        creatDictionary({
            ...params,
            status: params.status ? 1 : 0
        }).then(res => {
            if (res.code === 200) {
                message.success('创建成功')
                setLoading(false)
                history.push('/system/dictionary')
            }
        })
    }

    const onNameChange = event => {
        setName(event.target.value)
    };
    const addItem = () => {
        if (name) {
            setTypeList([...typeList, { dictType: name }])
            setTimeout(() => {
                form.setFieldsValue({ dictType: name })
                setName('')
            })
        }
    };

    /**
     * 删除
     */
    function handleDelete() {
        setLoading(true)
        confirm({
            content: '是否确认删除此字典吗？',
            onOk() {
                deleteDictionary(id).then(res => {
                    if (res.code === 200) {
                        setLoading(false)
                        message.success('删除成功')
                        history.push('/system/dictionary')
                    }
                })
            },
            onCancel() {
            },
        });
    }

    return (
        <Spin spinning={loading}>
            <div className="lable-list">
                <div className="mt-20 bg-white p-10 header">
                    <Link to="/system/dictionary"><LeftOutlined />新建字典管理</Link>
                </div>
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>新建字典管理条件</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        <Form form={form} initialValues={initialValues} {...layout} name="control-ref"
                            onFinish={onFinish}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="字典名称："
                                        name="label"
                                        rules={[{ required: true, message: '请输入字典名称' }]}
                                    >
                                        <Input size={'large'} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="字典类型："
                                        name="dictType"
                                        rules={[{ required: true, message: '请输入字典类型' }]}
                                    >
                                        <Select
                                            className="w-100"
                                            placeholder="请选择字典类型"
                                            dropdownRender={menu => (
                                                <div>
                                                    {menu}
                                                    <Divider style={{ margin: '4px 0' }} />
                                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                        <Input style={{ flex: 'auto' }} value={name}
                                                            onChange={onNameChange} />
                                                        <a
                                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                            onClick={addItem}
                                                        >
                                                            <PlusOutlined /> 添加类型
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            {typeList.map((item, idnex) => (
                                                <Option value={item.dictType} key={idnex}>{item.dictType}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="字典值："
                                        name="value"
                                        rules={[{ required: true, message: '请输入字典值' }]}
                                    >
                                        <Input size={'large'} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="描述："
                                        name="remark"
                                    >
                                        <Input.TextArea rows={7} className="w-100"></Input.TextArea>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="优先级："
                                        name="sort"
                                    >
                                        <InputNumber min={0} size={'large'} className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="启用："
                                        valuePropName="checked"
                                        name="status">
                                        <Switch />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24} className="text-center">
                                <Col span={24}>
                                    {
                                        id ?
                                            <Button htmlType="button" type="default" onClick={() => handleDelete()}
                                                className="create-but mr-20">删除</Button>
                                            : null

                                    }
                                    <Button htmlType="submit" type="primary"
                                        className="create-but">{id ? '保存' : '创建'}</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </Spin>

    );
}
