import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Button } from 'antd';
import logo from 'assets/images/login/logo.png';
import intl from "react-intl-universal";
import { Link, useHistory } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { register } from 'api/login';
import Const from 'utils/Const';
import './style.less';

const Register = () => {
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const onFinish = (values) => {
        setLoading(true)
        register(values).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setHasError(false)
                setLoading(false)
                history.push('/login')
            } else {
                setLoading(false)
                setHasError(true)
            }
        }).catch(e => {
            setLoading(false)
            setHasError(true)
        })
    };
    return (
        <div id="register">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="register-panel">
                <div className="text-center">
                    <div className="header mt-40">
                        欢迎来到 <span>GODIVA</span>
                    </div>
                    <div className="mt-40">
                        <div>要创建您的帐户，请填写下面的表格。</div>
                        <div className="mt-20">已经有账户？<Link to="/login">登录</Link> </div>
                    </div>
                    {hasError ? <div className="error register-error">创建帐户时出错, 请稍后重试或使用其他电子邮件地址。<span onClick={() => setHasError(false)}><CloseOutlined/></span></div> : null}
                </div>
                <Form className="submit-form mt-40"
                    onFinish={onFinish}>
                    <Row gutter={40}>
                        <Col md={12}>
                            <Form.Item name="xing"
                                rules={[{ required: true, message: '请输入您的姓!' }]}>
                                <Input disabled={loading} placeholder="姓" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name="ming"
                                rules={[{ required: true, message: '请输入您的名!' }]}>
                                <Input disabled={loading} placeholder="名" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ height: 40 }}></div>
                    <Row gutter={40}>
                        <Col md={12}>
                            <Form.Item name="email"
                                rules={[
                                    { required: true, message: '请输入您的邮箱!' },
                                    { type: "email", message: intl.get("Login.email_address_vld1") }]}>
                                <Input disabled={loading} placeholder="邮箱" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name="phone"
                                rules={[{ required: true, message: '请输入您的电话!' }]}>
                                <Input disabled={loading} placeholder="电话" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ height: 40 }}></div>
                    <Row gutter={40}>
                        <Col md={12}>
                            <Form.Item name="password"
                                rules={[{ required: true, message: '请输入您的密码!' }]}>
                                <Input.Password disabled={loading} placeholder="密码" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item name="confirmPassword"
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
                                <Input.Password disabled={loading} placeholder="确认密码" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="text-center mt-40">
                        <Checkbox> 我接受隐私政策 </Checkbox>
                    </div>
                    <div className="text-center mt-40">
                        <Button loading={loading} className="confirm-btn" type="primary" htmlType="submit">注册</Button>
                        <Button type="default" htmlType="submit" onClick={() => history.push('/login')}>取消</Button>
                        <div style={{ height: 40 }}></div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register