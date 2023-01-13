import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Button } from 'antd';
import logo from 'assets/images/login/logo.png';
import footer from 'assets/images/login/footer.png';
import { Link, useHistory } from 'react-router-dom';
import intl from "react-intl-universal";
import FooterLink from './footer.jsx';
import { sendEmail } from 'api/login';
import Const from 'utils/Const';
import './style.less';

const ForgetPassword = () => {
    const history = useHistory()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const onFinish = (values) => {
        setLoading(true)
        let baseUrl = process.env.NODE_ENV === 'production' ? window.origin + process.env.REACT_APP_BASENAME : window.origin
        sendEmail({ ...values, baseUrl: baseUrl }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setEmail(values.email)
                setSuccess(true)
                setLoading(false)
            }
        })
    };
    return (
        <div id="forget-password">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="forget-panel">
                {!success ? <>
                    <div className="text-center">
                        <div className="login-title mt-40">忘记密码？</div>
                        <div className="mt-20">输入与您的帐户关联的电子邮件地址。</div>
                    </div>
                    <Form className="submit-form mt-40"
                        onFinish={onFinish}>
                        <Form.Item name="email"
                            rules={[
                                { required: true, message: '请输入您的邮箱!' },
                                { type: "email", message: intl.get("Login.email_address_vld1") }]}>
                            <Input placeholder="邮箱" />
                        </Form.Item>
                        <div style={{ height: 40 }}></div>
                        <div className="text-center">
                            <Button loading={loading} className="confirm-btn" type="primary" htmlType="submit">发送</Button>
                            <Button className="cancel-btn" type="default" htmlType="submit" onClick={() => history.push('/login')}>取消</Button>
                        </div>
                    </Form>
                    <div className="footer text-center mt-40">
                        <img src={footer} alt="footer" />
                    </div>
                </> :
                    <div className="text-center">
                        <div className="login-title mt-40">重设您的密码</div>
                        <div className="mt-20">如果您的帐户存在，您将在以下地址收到一封电子邮件：<span className="email">{email}</span></div>
                        <div className="mt-20">按照电子邮件中的说明重置密码</div>
                        <div style={{ height: '80px' }}></div>
                        <div className="mt-20">如果您还没有收到电子邮件。 点击以下链接：</div>
                        <div className="submit-form mt-40">
                            <Button loading={loading} className="confirm-btn" type="primary" onClick={() => onFinish({ email: email })}>重新发送</Button>
                        </div>
                        <FooterLink />
                    </div>}
            </div>
        </div>
    )
}

export default ForgetPassword