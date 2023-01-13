import React, {useState, useEffect} from 'react';
import '../style.less'
import {Col, DatePicker, Form, Input, InputNumber, Row, Select, Button} from "antd";

const {TextArea} = Input;
const {Option} = Select;
const {RangePicker} = DatePicker;

export default function LableCreate(props) {
    return (
        <div>
            <Row span={24} style={{display: props.listValue === '高' || props.listValue === '远' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="标签类型："
                        rules={[{required: true, message: `请输入标签类型`}]}
                    >
                        <Input disabled value={props.listValue} className="text-center"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} style={{display: props.listValue === '中' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="标签类型："
                        rules={[{required: true, message: `请输入标签类型`}]}
                    >
                        <Input disabled value={props.listValue} className="text-center"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} style={{display: props.listValue === '低' || props.listValue === '近' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="标签类型："
                        rules={[{required: true, message: `请输入标签类型`}]}
                    >
                        <Input disabled value={props.listValue} className="text-center"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} style={{display: props.listValue === '高' || props.listValue === '远' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="分层描述："
                        name="remark1"
                    >
                        <TextArea autoSize={{minRows: 5, maxRows: 5}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} style={{display: props.listValue === '中' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="分层描述："
                        name="remark2"
                    >
                        <TextArea autoSize={{minRows: 5, maxRows: 5}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} style={{display: props.listValue === '低' || props.listValue === '近' ? 'block' : 'none'}}>
                <Col span={8}>
                    <Form.Item
                        label="分层描述："
                        name="remark3"
                    >
                        <TextArea autoSize={{minRows: 5, maxRows: 5}}/>
                    </Form.Item>
                </Col>
            </Row>
            {
                props.initialValues.showNameCode[1] === 'R' ?
                    <div>
                        <Row style={{display: props.listValue === '高' || props.listValue === '远' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Form.Item
                                    label="用户群规则满足："
                                    name="time1"
                                    labelCol={{span: 6}}
                                    rules={[{required: true, message: '请选择时间'}]}
                                >
                                    <RangePicker className="w-100"
                                                 format='YYYY-MM-DD'
                                                 allowClear={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{display: props.listValue === '中' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Form.Item
                                    label="用户群规则满足："
                                    name="time2"
                                    labelCol={{span: 6}}
                                    rules={[{required: true, message: '请选择时间'}]}
                                >
                                    <RangePicker className="w-100"
                                                 format='YYYY-MM-DD'
                                                 allowClear={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{display: props.listValue === '低' || props.listValue === '近' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Form.Item
                                    label="用户群规则满足："
                                    name="time3"
                                    labelCol={{span: 6}}
                                    rules={[{required: true, message: '请选择时间'}]}
                                >
                                    <RangePicker className="w-100"
                                                 format='YYYY-MM-DD'
                                                 allowClear={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div> :
                    <div>
                        <Row gutter={24}
                             style={{display: props.listValue === '高' || props.listValue === '远' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Row gutter={20}>
                                    <Col span={11}>
                                        <Form.Item
                                            label="用户群规则满足："
                                            labelCol={{span: 13}}
                                        >
                                            <Input className="text-center" disabled value={props.initialValues.showNameCode[1]==='M'?'实际支付金额':'购买次数'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name="status1"
                                            labelCol={0}
                                            wrapperCol={24}
                                        >
                                            <Select className="w-100">
                                                <Option value="≥">≥</Option>
                                                <Option value="≤">≤</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="number1"
                                            labelCol={0}
                                            wrapperCol={24}
                                            rules={[{required: true, message: '请输入'}]}
                                        >
                                            <InputNumber className="w-100" min={1}
                                                         placeholder="Basic usage"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>{props.initialValues.showNameCode[1] === 'F' ? '次' : 'RMB'}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{display: props.listValue === '中' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Row gutter={20}>
                                    <Col span={11}>
                                        <Form.Item
                                            label="用户群规则满足："
                                            labelCol={{span: 13}}
                                        >
                                            <Input className="text-center" disabled value={props.initialValues.showNameCode[1]==='M'?'实际支付金额':'购买次数'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name="status2"
                                            labelCol={0}
                                            wrapperCol={24}
                                        >
                                            <Select className="w-100" disabled>
                                                <Option value="≥">≥</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="number2"
                                            labelCol={0}
                                            wrapperCol={24}
                                            rules={[{required: true, message: '请输入'}]}
                                        >
                                            <InputNumber className="w-100" min={1}
                                                         placeholder="Basic usage"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>{props.initialValues.showNameCode[1] === 'F' ? '次' : 'RMB'}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{display: props.listValue === '中' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Row gutter={20}>
                                    <Col span={11}>
                                        <Form.Item
                                            label="且"
                                            labelCol={{span: 13}}
                                        >
                                            <Input className="text-center" disabled value={props.initialValues.showNameCode[1]==='M'?'实际支付金额':'购买次数'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name="status4"
                                            labelCol={0}
                                            wrapperCol={24}
                                        >
                                            <Select className="w-100" disabled>
                                                <Option value="≤">≤</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="number4"
                                            labelCol={0}
                                            wrapperCol={24}
                                            rules={[{required: true, message: '请输入'}]}
                                        >
                                            <InputNumber className="w-100" min={1}
                                                         placeholder="Basic usage"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>{props.initialValues.showNameCode[1] === 'F' ? '次' : 'RMB'}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={24}
                             style={{display: props.listValue === '低' || props.listValue === '近' ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Row gutter={20}>
                                    <Col span={11}>
                                        <Form.Item
                                            label="用户群规则满足："
                                            labelCol={{span: 13}}
                                        >
                                            <Input className="text-center" disabled value={props.initialValues.showNameCode[1]==='M'?'实际支付金额':'购买次数'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name="status3"
                                            labelCol={0}
                                            wrapperCol={24}
                                        >
                                            <Select className="w-100">
                                                <Option value="≥">≥</Option>
                                                <Option value="≤">≤</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="number3"
                                            labelCol={0}
                                            wrapperCol={24}
                                            rules={[{required: true, message: '请输入'}]}
                                        >
                                            <InputNumber className="w-100" min={1}
                                                         placeholder="Basic usage"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>{props.initialValues.showNameCode[1] === 'F' ? '次' : 'RMB'}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
            }

        </div>
    );
}
