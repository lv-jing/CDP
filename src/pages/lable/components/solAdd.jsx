import React, {useState, useEffect} from 'react';
import '../style.less'
import {Button, Col, Form, Input, Row, Select, Radio, Upload, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';

import {Link} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import one from 'assets/images/one.png';
import two from 'assets/images/two.png';
import three from 'assets/images/three.png';

const {Option} = Select;

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

const typeList = [
    {label: '购买渠道', value: '0'},
    {label: '购买产品偏好', value: '1'},
    {label: '会员来源', value: '2'},
]
const data = [
    {
        title: '创建方式-规则创建',
        text: '自定义标签值 (自定义每个标签的名称 和计算规则,将人群划分为多个分层)',
        img: one
    },
    {
        title: '创建方式-SQL创建',
        text: 'SQL创建 (使用返回的SQL结果作为标签值,为用户进行标记)',
        img: two
    },
    {
        title: '创建方式-导入创建',
        text: '导入创建 (使用上传文件计算结果作为 标签值,为用户进行标记)',
        img: three
    },

]
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    fileList:[],
    onChange(info) {
        console.log(info);
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default function LableCreate() {
    const [initialValues, setInitialValues] = useState({
        updateMode: 'a'
    })
    const [active, setActive] = useState(0)

    const onFinish = (values) => {
        console.log(values);
    };
    const handeleActive = (index) => {
        setActive(index)
    }
    return (
        <div className="lable-list">
            <Form {...layout} name="control-ref" onFinish={onFinish} initialValues={initialValues}>
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>创建方式-SQL创建</Col>
                        </Row>
                    </div>
                </div>
            </Form>
        </div>

    );
}
