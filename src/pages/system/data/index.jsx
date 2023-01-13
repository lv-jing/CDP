import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { getMainData } from 'api/main-data';
import Const from 'utils/Const';
import intl from "react-intl-universal";
import { mainDataType } from 'utils/Json';
import { getCommonList } from 'api/system';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};



const Data = () => {
    const [loading, setLoading] = useState(false)
    const [parmeters, setParmeters] = useState({})
    const [list, setList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [oneList, setOneList] = useState([])
    const [twoList, setTwoList] = useState([])
    const [threeList, setThreeList] = useState([])
    const [form] = Form.useForm()

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    useEffect(() => {
        let first = mainDataType.map(x => x.name)
        setOneList(first)
        getCommonList({
            pageNum: 0,
            pageSize: 1000,
            dictType: 'ProductState'
        }).then(res=>{
            if (res.code === Const.SUCCESS_CODE) {
                setStatusList(res.rows)
            }
        })
        getProductList({
            current: 1,
            pageSize: 10
        }, {})
    }, [])

    const oneChange = (value) => {
        let seondList = mainDataType.find(x => x.name === value)
        let second = seondList && seondList.children ? seondList.children : []
        form.resetFields(['categoryS', 'categoryT'])
        setTwoList(second)
    }

    const twoChange = (value) => {
        let thridList = twoList.find(x => x.name === value)
        let thrid = thridList && thridList.children ? thridList.children : []
        form.resetFields(['categoryT'])
        setThreeList(thrid)
    }

    const onFinish = (values) => {
        setParmeters(values)
        getProductList({
            current: 1,
            pageSize: 10
        }, values)
    };

    const getProductList = (newPagination, newParmeters) => {
        setLoading(true)
        let parmeters = { pageNum: newPagination.current, pageSize: newPagination.pageSize, ...newParmeters }
        getMainData(parmeters).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setPagination({
                    current: newPagination.current,
                    pageSize: newPagination.pageSize,
                    total: res.total
                })
                setList(res.rows)
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
        })
    }

    const handleChange = (tablePagination) => {
        getProductList(tablePagination, parmeters)
    }

    const columns = [
        {
            title: '产品代码',
            dataIndex: 'productErpId',
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
        },
        {
            title: '一级分类值',
            dataIndex: 'categoryF',
        },
        {
            title: '二级分类',
            dataIndex: 'categoryS',
        },
        {
            title: '三级分类',
            dataIndex: 'categoryT',
        },
        {
            title: '产品状态',
            dataIndex: 'productStatus',
        }
    ]
    return (
        <div>
            <div className="content-container m-20">
                <div className="content-header p-10-20">
                    {intl.get("one.searchCondition")}
                </div>
                <div className="p-20">
                    <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col sm={24} md={7}>
                                <Form.Item name="productErpId" label="产品代码">
                                    <Input allowClear className="w-64" placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="productName" label='产品名称'>
                                    <Input allowClear className="w-64" placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="productStatus" label='产品状态'>
                                    <Select className="w-64" allowClear placeholder="请选择">
                                        {statusList.map(item => (
                                            <Option key={item.value} value={item.value}>{item.label}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col sm={24} md={7}>
                                <Form.Item name="categoryF" label="一级分类">
                                    <Select className="w-64" allowClear placeholder="请选择" onChange={(value) => oneChange(value)}>
                                        {oneList.map(item => (
                                            <Option key={item} value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="categoryS" label='二级分类'>
                                    <Select className="w-64" allowClear placeholder="请选择" onChange={(value) => twoChange(value)}>
                                        {twoList.map(item => (
                                            <Option key={item.name} value={item.name}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={7}>
                                <Form.Item name="categoryT" label='三级分类'>
                                    <Select className="w-64" allowClear placeholder="请选择">
                                        {threeList.map(item => (
                                            <Option key={item.name} value={item.name}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={3} className="btn-panel text-left">
                                <Button htmlType="submit" className="black">
                                    {intl.get("Public.Operation.serach")}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="content-container m-20">
                <div className="p-20">
                    <Row>
                        <Col md={24} className="text-left f-w600">
                            主数据列表
                        </Col>
                    </Row>
                    <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                        <Table loading={loading} dataSource={list} columns={columns} pagination={pagination} rowKey="id"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data