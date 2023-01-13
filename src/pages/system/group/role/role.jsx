import React, { useState, useEffect } from 'react';
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { getRoles, addRole, editRole, setRole, deleteRole } from 'api/user';
import { getMenus } from 'api/menu';
import Const from 'utils/Const';
import { Button, Col, Form, Input, Row, Tree, Table, message, Modal } from "antd";
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

const Role = () => {
    const [loading, setLoading] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [setttingVisible, setSettingVisiable] = useState(false)
    const [list, setList] = useState([])
    const [form] = Form.useForm()
    const [selectRole, setSelectRole] = useState('')
    const [allMenus, setAllMenus] = useState([])
    const [menuIds, setMenusIds] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    const [treeData, setTreeData] = useState([])
    const [title, setTitle] = useState(false)

    useEffect(() => {
        getMenus().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setAllMenus(res.data)
                let treeList = res.data.map(m => {
                    return {
                        id: m.menuId,
                        parentId: m.parentId,
                        sort: m.orderNum,
                        key: m.menuId,
                        title: m.menuName,
                        value: m.menuId
                    }
                })
                let treeData = getTreeData(treeList)
                setTreeData(treeData)
                getRoleList({
                    current: 1,
                    pageSize: 10
                })
            }
        })
    }, [])

    const getRoleList = (newPagination) => {
        setLoading(true)
        let parmeters = { pageNum: newPagination.current, pageSize: newPagination.pageSize }
        getRoles(parmeters).then(res => {
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
        getRoleList(tablePagination)
    }

    const showPermissions = (role) => {
        setSettingVisiable(true)
        setMenusIds(role.menuIds)
        setSelectRole(role)
    }

    const showEditRole = (role) => {
        setTitle('编辑角色')
        setEditVisible(true)
        setSelectRole(role)
        form.setFieldsValue({
            roleName: role.roleName,
            roleKey: role.roleKey
        })
    }

    const updateRole = () => {
        form.validateFields().then(values => {
            if (selectRole.roleId) {
                editRole({ ...selectRole, ...values }).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        handleCancel('update')
                        getRoleList(pagination)
                        message.success('编辑成功')
                    }
                })
            } else {
                addRole({ ...values, roleSort: list.length + 1, status: '0', roleKey: values.roleName }).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        handleCancel('update')
                        getRoleList({
                            current: 1,
                            pageSize: 10
                        })
                        message.success('创建成功')
                    }
                })
            }
        })
    }

    const onSelect = (selectedKeysValue, info) => {
        setMenusIds(selectedKeysValue);
    };

    const onCheck = (checkedKeysValue) => {
        setMenusIds(checkedKeysValue);
    };

    const setRolePermssion = () => {
        setRole({ menuIds, roleId: selectRole.roleId }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                handleCancel('setting')
                message.success('设置成功')
                getRoleList({
                    current: 1,
                    pageSize: 10
                })
            }
        })
    }

    const handleCancel = (type) => {
        if (type === 'update') {
            setEditVisible(false)
            setSelectRole({})
            form.resetFields()
        } else if (type === 'setting') {
            setSettingVisiable(false)
            setSelectRole({})
            setMenusIds([])
        }
    }

    const deleteRoleById = (id) => {
        confirm({
            content: '是否确认删除此角色',
            onOk() {
                setLoading(true)
                deleteRole(id).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        message.success('删除成功')
                        setLoading(false)
                        getRoleList(pagination)
                    }
                }).catch(error => {
                    setLoading(false)
                })
            },
            onCancel() {
            },
        });
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'roleName',
            width: '30%'
        },
        {
            title: '拥有菜单权限',
            dataIndex: '',
            width: '50%',
            render: (text, record) => {
                let menus = allMenus.filter(x => record.menuIds && record.menuIds.includes(x.menuId))
                return menus.map(x => x.menuName).join(' , ')
            }
        },
        {
            title: '操作',
            dataIndex: '',
            width: '20%',
            render: (text, record) => (
                <div className="primary-color cursor-pointer" style={{ fontSize: '16px' }}>
                    {record.roleKey !== 'admin' ?
                        <>
                            <SettingOutlined className="mr-10" onClick={() => showPermissions(record)} />
                            <FormOutlined className="mr-10" onClick={() => showEditRole(record)} />
                            <DeleteOutlined onClick={() => deleteRoleById(record.roleId)} />
                        </>
                        : ''}
                </div>
            )
        }
    ]
    return (
        <div id="role">
            <div className="content-container m-20">
                <div className="p-20">
                    <Row>
                        <Col md={12} className="f-w600">
                            权限管理
                        </Col>
                        <Col md={12} className="text-right">
                            <Button className="black" onClick={() => { setEditVisible(true); setTitle('新建角色') }}>
                                新建角色
                            </Button>
                        </Col>
                    </Row>
                    <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                        <Table loading={loading} dataSource={list} columns={columns} pagination={pagination} rowKey="id"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
            <Modal title={title} visible={editVisible} onOk={updateRole} onCancel={() => handleCancel('update')}>
                <Form {...layout} form={form} name="control-hooks">
                    <Form.Item name="roleName" label="名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="roleKey" label="唯一代码" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item> */}
                </Form>
            </Modal>
            <Modal title="设置权限菜单" visible={setttingVisible} onOk={setRolePermssion} onCancel={() => handleCancel('setting')}>
                <Tree
                    checkable
                    checkedKeys={menuIds}
                    selectedKeys={menuIds}
                    defaultExpandAll={true}
                    onSelect={onSelect}
                    onCheck={onCheck}
                    autoExpandParent={true}
                    treeData={treeData}
                />
            </Modal>

        </div>
    )
}

export default Role