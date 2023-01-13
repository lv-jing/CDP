import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Button, message } from 'antd';
import logo from 'assets/images/login/logo.png';
import footer from 'assets/images/login/footer.png';
import { Link, useHistory } from 'react-router-dom';
import intl from "react-intl-universal";
import FooterLink from './footer.jsx';
import { changePassword } from 'api/login';
import Const from 'utils/Const';
import qs from 'querystring';
import './style.less';


const ResetPassword = (props) => {
    const history = useHistory()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true)
        let urlObject = qs.parse(props.history.location.search
            && props.history.location.search.replace('?', ''))
        changePassword({ ...values, userId: urlObject.id }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setSuccess(true)
                setLoading(false)
            }
        }).catch((error) => {
            setLoading(false)
            history.push('/forget-password')
        })
    };
    return (
        <div id="reset-password">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="forget-panel">
                {!success ?
                    <>
                        <div className="text-center">
                            <div className="login-title mt-40">重设您的密码</div>
                        </div>
                        <Form className="submit-form mt-40"
                            onFinish={onFinish}>
                            <Form.Item name="password"
                                rules={[{ required: true, message: '请输入您的新密码!' }]}>
                                <Input.Password placeholder="密码" />
                            </Form.Item>
                            <div style={{ height: 40 }}></div>
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
                                <Input.Password placeholder="确认密码" />
                            </Form.Item>
                            <div style={{ height: 40 }}></div>
                            <div className="text-center">
                                <Button loading={loading} type="primary" htmlType="submit">更改密码</Button>
                            </div>
                        </Form>
                    </> :
                    <>
                        <div className="text-center">
                            <div className="login-title mt-40">您更改了密码</div>
                            <div className="mt-80">随时更新您的 <span className="primary-color mt-40"> Godiva CDP 账户  </span></div>
                        </div>
                        <div className="submit-form text-center mt-40">
                            <Button onClick={() => history.push('/login')} type="primary" htmlType="submit">登录</Button>
                        </div>
                    </>}
                <FooterLink />
            </div>
        </div>
    )
}

export default ResetPassword