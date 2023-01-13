import React from 'react';
import '../style.less'
import {Col, DatePicker, Form, Input, Table, Row, Select, InputNumber} from "antd";

const {Option} = Select;
const {RangePicker} = DatePicker;

export default function ModleGroup(props) {
    const columns = [
        {
            title: '分层',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '区间值(按数据值由大到小)',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
            render(text, record, index) {
                return (
                    <>
                        <Row justify="center" align="middle">
                            <Col span={1}>
                                [
                            </Col>
                            <Col span={5}>
                                <Input addonAfter="%" value={record.min} disabled/>
                            </Col>
                            <Col span={1}>
                                ,
                            </Col>
                            <Col span={5}>
                                <Input type="number" addonAfter="%" value={record.max} disabled={index === 2}
                                       onChange={(e) => props.dataSourceChange(e, index)}/>
                            </Col>
                            <Col span={1}>
                                ]
                            </Col>
                        </Row>
                    </>
                )
            }
        },
    ];
    return (
        <div>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{span: 0}}
                        wrapperCol={{span: 24}}
                        name="groupTime"
                    >
                        <RangePicker
                            className="w-100"
                            format='YYYY-MM-DD'
                            allowClear={false}
                        />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item
                        label=""
                        labelCol={{span: 0}}
                        wrapperCol={24}
                    >
                        <Input className="text-center" disabled value="交易金额"/>
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item
                        name="groupStatus"
                        labelCol={{span: 0}}
                        wrapperCol={24}
                    >
                        <Select className="w-100">
                            <Option value="≥">≥</Option>
                            <Option value="≤">≤</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item
                        name="groupNumber"
                        labelCol={0}
                        wrapperCol={24}
                        rules={[{required: true, message: '请输入次数'}]}
                    >
                        <InputNumber className="w-100" min={1}
                                     placeholder="Basic usage"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Table className="mb-20" rowKey="id" pagination={false} dataSource={props.dataSource}
                           columns={columns}/>
                </Col>
            </Row>
        </div>
    );
}
