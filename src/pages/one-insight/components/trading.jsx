import React, { useState, useEffect } from 'react';
import intl from 'react-intl-universal';
import { Row, Col, Input, Checkbox, Form, DatePicker, Select, Button, Table, Tabs } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import sousuotiaojian from "assets/images/font/sousuotiaojian.png"
import './style/trading-style.less'
import { getPagedOrder, getPagedOrderDetail } from 'api/one-insight'
import moment from 'moment';
import Const from 'utils/Const';
import { getDictionary } from 'api/dictionary';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export default function Trading(props) {
    const [loading, setLoading] = useState(false);
    const [parmeters, setParmeters] = useState({});
    const [traddingList, setTraddingList] = useState([])
    const [traddingDetailList, settraddingDetailList] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [sourceOptions, setSourceOptions] = useState([])

    useEffect(() => {
        getDictionary('sourceChannel').then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setSourceOptions(res.rows)
            }
        })
        getOrders({
            current: 1,
            pageSize: 10
        }, {}) //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getOrders(newPagination, newParmeters) {
        setLoading(true)
        let parmeters = { memberId: props.id, pageNum: newPagination.current, pageSize: newPagination.pageSize, ...newParmeters }

        Promise.all([getPagedOrder(parmeters), getPagedOrderDetail(parmeters)]).then(res => {
            if (res[0].code === Const.SUCCESS_CODE) {
                setPagination({
                    current: newPagination.current,
                    pageSize: newPagination.pageSize,
                    total: res[0].total
                })
                setTraddingList(res[0].rows)
                setLoading(false)
            }

            if (res[1].code === Const.SUCCESS_CODE) {
                setPagination({
                    current: newPagination.current,
                    pageSize: newPagination.pageSize,
                    total: res[1].total
                })
                settraddingDetailList(res[1].rows)
                setLoading(false)
            }
        }).catch(error => {
            setLoading(false)
        })
    }
    const onFinish = (values) => {
        let beginTime = values.tradingTime ? moment(values.tradingTime[0]).format('YYYY-MM-DD') : null
        let endTime = values.tradingTime ? moment(values.tradingTime[1]).format('YYYY-MM-DD') : null
        if (values.tradingTime) {
            values.tradingTime = null
        }
        let parmeters = { ...values, beginTime, endTime }
        setParmeters(parmeters);
        getOrders({
            current: 1,
            pageSize: 10
        }, parmeters)
    };
    const handleChange = (tablePagination) => {
        getOrders(tablePagination, parmeters)
    }

    const detailColumns = [
        {
            title: '订单编号',
            dataIndex: 'orderNo'
        },
        {
            title: '来源渠道',
            dataIndex: 'sourceType',
        },
        {
            title: '店铺ID',
            dataIndex: 'shopId'
        },
        {
            title: '产品ID',
            dataIndex: 'productId'
        },
        {
            title: '产品名',
            dataIndex: 'productName'
        },
        {
            title: '产品数量',
            dataIndex: 'productQuantity'
        },
        {
            title: '订单金额',
            dataIndex: 'orderAmount'
        },
        {
            title: '折扣金额',
            dataIndex: 'discountAmount '
        },
        {
            title: '交易时间',
            dataIndex: 'orderTime'
        },
    ]

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNo'
        },
        {
            title: '来源渠道',
            dataIndex: 'sourceType',
        },
        {
            title: '店铺ID',
            dataIndex: 'shopId'
        },
        {
            title: '发票号',
            dataIndex: 'invoiceNo'
        },
        {
            title: '订单金额',
            dataIndex: 'payAmount'
        },
        {
            title: '折扣金额',
            dataIndex: 'discountAmount '
        },
        {
            title: '交易时间',
            dataIndex: 'finishTime'
        }
    ]

    return (
        <div id="trading" className="mt-20">
            <div className="search-container">
                <div>
                    <img src={sousuotiaojian} alt="sousuotiaojian" />
                    <span className="title">搜索条件</span>
                </div>
                <div className="search">
                    <Form {...layout} name="control-ref" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col sm={24} md={7}>
                                <Form.Item name="sourceType" label={intl.get("one.sourceChannel")}>
                                    <Select className="w-80" allowClear>
                                        {sourceOptions && sourceOptions.map(item => (
                                            <Option key={item.value} value={item.value}>{item.label}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="orderNo" label="订单编号">
                                    <Input className="w-80" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="tradingTime" label="交易时间">
                                    <RangePicker />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={3} className="btn-panel">
                                <Button htmlType="submit">
                                    {intl.get("Public.Operation.serach")}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="container">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="历史订单" key="1">
                        <div className="one-table" style={{ padding: 0 }}>
                            <Table loading={loading} dataSource={traddingList} columns={columns} pagination={pagination} rowKey="id" onChange={handleChange} />
                        </div>
                    </TabPane>
                    <TabPane tab="历史订单产品明细" key="2">
                        <div className="one-table" style={{ padding: 0 }}>
                            <Table loading={loading} dataSource={traddingDetailList} columns={detailColumns} pagination={pagination} rowKey="id" onChange={handleChange} />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}