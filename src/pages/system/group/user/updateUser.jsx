import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, TreeSelect, Radio, Modal, message, Switch } from "antd";
import intl from "react-intl-universal";
import Const from 'utils/Const';
import { addUsers, editUsers, getDepartments, getRoles } from 'api/user';
import { getTreeData } from 'utils/Tree';

const { SHOW_CHILD } = TreeSelect;
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};



const UpdateUser = (props) => {
    const [title, setTitle] = useState('')
    const [form] = Form.useForm()
    const [roles, setRoles] = useState([])
    const [visible, setVisible] = useState()

    const [treeData, setTreeData] = useState([]);
    const [resetPassword, setResetPassword] = useState(false)

    useEffect(() => {
        setVisible(props.visible)
        if (props.visible === false) {
            return
        }
        setTitle(props.user ? '编辑用户' : '创建用户')
        getDepartments().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                let treeList = res.data.map(item => {
                    return {
                        id: item.deptId,
                        key: item.deptId,
                        parentId: item.parentId,
                        sort: item.orderNum,
                        title: item.deptName,
                        value: item.deptId
                    }
                })
                let treeData = getTreeData(treeList)
                setTreeData(treeData)
            }
        })

        getRoles().then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setRoles(res.rows)
            }
        })
        if (props.user) {
            form.setFieldsValue({
                email: props.user.email,
                password: props.user.password,
                nickName: props.user.nickName,
                roleIds: props.user.roles.length > 0 ? props.user.roles[0].roleId : null,
                phonenumber: props.user.phonenumber,
                sex: props.user.sex,
                deptId: props.user.deptId
            })
        } else {
            form.setFieldsValue({
                sex: '1'
            })
        }
    }, [props.user, props.visible, form])


    const handleOk = () => {
        form.validateFields().then(values => {
            console.log(values)
            if (props.user) {
                editUsers({ ...values, roleIds: [values.roleIds], userName: values.email, userId: props.user.userId}).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        handleCancel()
                        props.reflash()
                        message.success('编辑成功')
                    }
                })
            } else {
                addUsers({ ...values, roleIds: [values.roleIds], userName: values.email }).then(res => {
                    if (res.code === Const.SUCCESS_CODE) {
                        handleCancel()
                        props.reflash()
                        message.success('创建成功')
                    }
                })
            }
        })
    }

    const handleCancel = () => {
        form.resetFields()
        props.cancel()
        setResetPassword(false)
    }
    return (
        <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} form={form} name="control-hooks">
                <Form.Item name="email" label="邮箱" rules={[
                    { required: true, message: '请输入您的邮箱!' },
                    { type: "email", message: intl.get("Login.email_address_vld1") }]}>
                    <Input />
                </Form.Item>
                {resetPassword || !props.user ?
                    <>
                        <Form.Item name="password" label="密码"
                            rules={[{ required: true, message: '请输入您的密码!' }]}>
                            <Input.Password placeholder="密码" />
                        </Form.Item>
                        <Form.Item name="confirmPassword" label="确认密码"
                            rules={[
                                {
                                    required: true,
                                    message: intl.get("Login.confirm_password_vld"),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(intl.get("Login.confirm_password_vld1"))
                                        );
                                    },
                                }),
                            ]}>
                            <Input.Password placeholder="确认密码" />
                        </Form.Item></>
                    : null}
                <Form.Item name="nickName" label="姓名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="roleIds" label="角色" rules={[{ required: true }]}>
                    <Select>
                        {roles.map(item => (
                            <Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="phonenumber" label="电话">
                    <Input />
                </Form.Item>
                <Form.Item name="sex" label="性别">
                    <Radio.Group>
                        <Radio value='1'>男</Radio>
                        <Radio value='2'>女</Radio>
                        <Radio value='0'>未知</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="deptId" label="所属组织">
                    <TreeSelect
                        showCheckedStrategy={SHOW_CHILD}
                        treeDefaultExpandAll
                        treeData={treeData}
                        // treeCheckable={true}
                        placeholder='请选择'
                        style={{ width: '100%' }} />
                </Form.Item>
                {props.user ?
                    <Form.Item label="重设密码">
                        <Switch onChange={(value) => setResetPassword(value)} />
                    </Form.Item>
                    : null}
            </Form>
        </Modal>
    )

}

export default UpdateUser