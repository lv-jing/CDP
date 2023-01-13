import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import logo from 'assets/images/login/logo.png';
import right from 'assets/images/login/right.png';
import { Link, useHistory } from 'react-router-dom';
import intl from "react-intl-universal";
import { login } from 'api/login';
import Const from 'utils/Const';
import './style.less';

const Login = () => {
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const onFinish = (values) => {
        setLoading(true)
        login(values).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userInfo', JSON.stringify(res.data.user))
                setHasError(false)
                setLoading(false)
                history.push('/')
            } else {
                setHasError(true)
                setLoading(false)
            }
        }).catch(e => {
            setHasError(true)
            setLoading(false)
        })
    };
    return (
        <div id="login">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <Row>
                <Col md={12}>
                    <div className="left">
                        <div className="login-title">登录您的账户</div>
                        {/* <Row className="mt-40">
                            <Col md={12}>没有账户?</Col>
                            <Col md={12} className="text-right"><Link to="/register">创建一个帐户</Link></Col>
                        </Row> */}
                        {hasError ? <div className="error">请检查电子邮件地址和密码，然后重试。<span onClick={() => setHasError(false)}><CloseOutlined /></span></div> : null}
                        <Form className="submit-form mt-40" onFinish={onFinish}>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '请输入您的邮箱!' },
                                    { type: "email", message: intl.get("Login.email_address_vld1") }]}>
                                <Input disabled={loading} placeholder="邮箱" />
                            </Form.Item>
                            <div style={{ height: 40 }}></div>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入您的密码!' }]}>
                                <Input.Password disabled={loading} placeholder="输入您的密码" />
                            </Form.Item>
                            <Row className="mt-40">
                                <Col md={12}>
                                    <Checkbox> 记住账号</Checkbox>
                                </Col>
                                <Col md={12} className="text-right"><Link to="/forget-password">忘记密码</Link></Col>
                            </Row>
                            <Row className="mt-40">
                                <Col md={12}>
                                    <Button loading={loading} type="primary" htmlType="submit">登录</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col md={12} className="right">
                    <img src={right} alt="right" />
                </Col>
            </Row>
        </div>
    )
}

export default Login