import React, { useState, useEffect } from 'react';
import { FormOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Form, message, Modal, Input } from "antd";
import { getDepartments, addDepartment, editDepartment, deleteDepartment } from 'api/user';
import Const from 'utils/Const';
import { getTreeData } from 'utils/Tree';

const { confirm } = Modal;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};


const Department = (props) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [title, setTitle] = useState('新建第一级组织架构')
    const [parentId, setParentId] = useState('')
    const [selectId, setSelectId] = useState('')
    const [selectName, setSelectName] = useState('')
    const [currentOrderNum, setCurrentOrderNum] = useState('')
    const [currentParentId, setCurrentParentId] = useState('')
    const [originData, setOriginData] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        getDepartmentList()
    }, [])

    const getDepartmentList = () => {
        setLoading(true)
        getDepartments().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setOriginData(res.data)
                let treeList = res.data.map(item => {
                    return {
                        id: item.deptId,
                        parentId: item.parentId,
                        sort: item.orderNum,
                        name: item.deptName,
                        count: item.userNum ?? 0
                    }
                })
                let treeData = getTreeData(treeList)
                setList(treeData)
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
        })
    }

    const addChildDepartment = (parentId) => {
        setParentId(parentId)
        setVisible(true)
        setTitle('新建子组织架构')
    }

    const editChildDepartment = (department) => {
        setTitle('编辑子组织架构')
        form.setFieldsValue({ deptName: department.name })
        setSelectName(department.name)
        setSelectId(department.id)
        setCurrentOrderNum(department.sort)
        setCurrentParentId(department.parentId)
        setVisible(true)
    }

    const deleteDepartmentById = (id) => {
        confirm({
            content: '是否确认删除此组织',
            onOk() {
                setLoading(true)
                deleteDepartment(id).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        message.success('删除成功')
                        setLoading(false)
                        getDepartmentList()
                    }
                }).catch(error => {
                    setLoading(false)
                })
            },
            onCancel() {
            },
        });
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            if (!parentId) {
                if (selectId) {
                    editDepartment({ ...values, deptId: selectId, orderNum: currentOrderNum, parentId: currentParentId, editFlag: selectName === values.deptName ? '0' : '1' }).then(res => {
                        if (res.code === Const.SUCCESS_CODE) {
                            handleCancel()
                            getDepartmentList()
                            message.success('保存成功')
                        }
                    })
                } else {
                    addDepartment({ ...values, status: "0", orderNum: list.length + 1, parentId: 0 }).then(res => {
                        if (res.code === Const.SUCCESS_CODE) {
                            handleCancel()
                            getDepartmentList()
                            message.success('创建成功')
                        }
                    })
                }
            } else {
                let children = originData.filter(x => x.parentId === parentId)
                addDepartment({ ...values, parentId: parentId, orderNum: children.length + 1, status: "0" }).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        handleCancel()
                        getDepartmentList()
                        message.success('创建成功')
                    }
                })
            }
        })
    }

    const handleCancel = () => {
        setVisible(false)
        setLoading(false)
        setParentId('')
        setSelectId('')
        form.resetFields()
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            width: '50%'
        },
        {
            title: '用户人数',
            dataIndex: 'count',
            width: '30%'
        },
        {
            title: '操作',
            dataIndex: '',
            width: '20%',
            render: (text, record) => (
                <div className="primary-color cursor-pointer" style={{ fontSize: '16px' }}>
                    <PlusSquareOutlined className="mr-10" onClick={() => addChildDepartment(record.id)} />
                    <FormOutlined className="mr-10" onClick={() => editChildDepartment(record)} />
                    <DeleteOutlined onClick={() => deleteDepartmentById(record.id)} />
                </div>
            )
        }
    ]
    return (
        <div id="department">
            <div className="content-container m-20">
                <div className="p-20">
                    <Row>
                        <Col md={12} className="f-w600">
                            组织架构
                        </Col>
                        <Col md={12} className="text-right">
                            <Button className="black" onClick={() => { setTitle('新建第一级组织架构'); setVisible(true) }}>
                                新建第一级组织架构
                            </Button>
                        </Col>
                    </Row>
                    <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                        <Table loading={loading} dataSource={list} columns={columns} rowKey="id" />
                    </div>
                </div>
            </div>
            <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <Form {...layout} form={form} name="control-hooks">
                    <Form.Item name="deptName" label="名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Department