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
                            <Col md={12}>导入创建-基础信息</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        <Row gutter={24}>
                            <Col span="8">
                                <Col span="24">
                                    <Form.Item
                                        label="标签显示名："
                                        name="labelType"
                                        rules={[{required: true, message: '请输入分群显示名'}]}
                                    >
                                        <Select className="w-64 w-100" size={"large"} allowClear>
                                            {typeList.map(item => (
                                                <Option key={item.value} value={item.value}>{item.label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span="24">
                                    <Form.Item
                                        label="标签名称："
                                        name="showName"
                                        rules={[{required: true, message: '请输入分群显示名'}]}
                                    >
                                        <Input size={'large'}/>
                                    </Form.Item>
                                </Col>
                                <Col span="24">
                                    <Form.Item
                                        label="更新方式："
                                        name="updateMode"
                                        rules={[{required: true, message: '请输入分群显示名'}]}
                                    >
                                        <Radio.Group size={'large'} buttonStyle="solid"
                                                     style={{width: "100%"}}>
                                            <Radio.Button value="a"
                                                          style={{width: "50%", textAlign: "center"}}>例行</Radio.Button>
                                            <Radio.Button value="b"
                                                          style={{width: "50%", textAlign: "center"}}>手动</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    label="备注："
                                    name="remark"
                                    labelCol={{span: 1}}
                                    wrapperCol={{span: 22}}
                                >
                                    <Input.TextArea rows={7} className="w-100"></Input.TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="content-container m-20">
                    <div className='content-header p-10-20'>
                        <Row>
                            <Col md={12}>导入创建-标签规则</Col>
                        </Row>
                    </div>
                    <div className="p-40">
                        <div className="mb-38">上传文件,通过用户属性筛选目标用户,对目标用户进行标记</div>
                        <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item
                                    label="标签数据类型："
                                    name="update"
                                    // rules={[{required: true, message: '请选择标签数据类型'}]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>字符串</Radio>
                                        <Radio value={2}>布尔</Radio>
                                        <Radio value={3}>数值</Radio>
                                        <Radio value={4}>时间</Radio>
                                        <Radio value={5}>集合</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item
                                    label="用户属性："
                                    name="updateMode1"
                                >
                                    <Select className="w-64 w-100" size={"large"} allowClear>
                                        {typeList.map(item => (
                                            <Option key={item.value} value={item.value}>{item.label}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item
                                    label="上传："
                                    name="uplod"
                                >
                                    <Upload {...props}>
                                        <Button className="mb-20" icon={<UploadOutlined/>}>上传文件</Button>
                                        <div className="mb-20">
                                            <Row span="24">
                                                <Col span="20" className="mb-20">
                                                    <span>上传TXT、CSV、JSON格式的文件,文件内容包含“用户属性与对应的标签值</span>
                                                </Col>
                                                <Col span="4">
                                                    <a>查看上传规则</a>
                                                </Col>
                                                <Col span="4">
                                                    <a>下我TXT模板</a>
                                                </Col>
                                                <Col span="4">
                                                    <a>下CSV模版</a>
                                                </Col>
                                                <Col span="4">
                                                    <a>下载JSON模版</a>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <Row span="24">
                                                <Col span="13">
                                                    <span>可暂不上传文件,在标签创建成功后通过接口上传</span>
                                                </Col>
                                                <Col span="6">
                                                    <a>查看接口文档</a>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24" className="text-center">
                                <Button htmlType="submit" type="primary" className="create-but">创建</Button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </Form>
        </div>

    );
}
