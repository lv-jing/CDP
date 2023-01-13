import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, Table, message, Modal } from "antd";
import Const from 'utils/Const';
import intl from "react-intl-universal";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUser from './updateUser';
import { getUsers, deleteUsers } from 'api/user';

const { confirm } = Modal;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};



const User = () => {
    const [loading, setLoading] = useState(false)
    const [parmeters, setParmeters] = useState({})
    const [list, setList] = useState([])
    const [form] = Form.useForm()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectUser, setSelectUser] = useState(null)

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    useEffect(() => {
        getUserList({
            current: 1,
            pageSize: 10
        }, {})
    }, [])

    const onFinish = (values) => {
        setParmeters(values)
        getUserList({
            current: 1,
            pageSize: 10
        }, values)
    };

    const getUserList = (newPagination, newParmeters) => {
        setLoading(true)
        let parmeters = { pageNum: newPagination.current, pageSize: newPagination.pageSize, ...newParmeters }
        getUsers(parmeters).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setPagination({
                    current: newPagination.current,
                    pageSize: newPagination.pageSize,
                    total: res.total
                })
                setList(res.rows)
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
        })
    }

    const handleChange = (tablePagination) => {
        getUserList(tablePagination, parmeters)
    }

    const editUser = (user) => {
        setSelectUser(user)
        setModalVisible(true)
    }

    const deleteUser = (userId) => {
        confirm({
            content: '是否确认删除此用户',
            onOk() {
                setLoading(true)
                deleteUsers(userId).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        message.success('删除成功')
                        setLoading(false)
                        getUserList(pagination, parmeters)
                    }
                })
            },
            onCancel() {
            },
        });
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'nickName',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phonenumber',
        },
        {
            title: '角色',
            dataIndex: '',
            render: (text, record) => (
                record.roles.map(x=>x.roleName).join(',')
            )
        },
        {
            title: '所属组织',
            dataIndex: '',
            render: (text, record) => (
                record.dept && record.dept.deptName
            )
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <div className="primary-color cursor-pointer" style={{ fontSize: '16px' }}>
                    <FormOutlined className="mr-10" onClick={() => editUser(record)} />
                    <DeleteOutlined onClick={() => deleteUser(record.userId)} />
                </div>
            )
        }
    ]

    return (
        <div id="user">
            <div className="content-container m-20">
                <div className="content-header p-10-20">
                    {intl.get("one.searchCondition")}
                </div>
                <div className="p-20">
                    <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col sm={24} md={7}>
                                <Form.Item name="nickName" label='姓名'>
                                    <Input allowClear className="w-64" placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="email" label="邮箱">
                                    <Input allowClear className="w-64" placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="phonenumber" label='电话'>
                                    <Input allowClear className="w-64" placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={3} className="btn-panel text-left">
                                <Button htmlType="submit" className="black">
                                    {intl.get("Public.Operation.serach")}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="content-container m-20">
                <div className="p-20">
                    <Row>
                        <Col md={24} className="text-right">
                            <Button className="black" onClick={() => setModalVisible(true)}>
                                新建
                            </Button>
                        </Col>
                    </Row>
                    <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                        <Table loading={loading} dataSource={list} columns={columns} pagination={pagination} rowKey="id"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
            <UpdateUser
                user={selectUser}
                visible={modalVisible}
                cancel={() => {
                    setModalVisible(false)
                    setSelectUser(null)
                }}
                reflash={() =>  getUserList(pagination, parmeters)} />
        </div>
    )
}

export default User