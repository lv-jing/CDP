import React, { useState, useEffect } from 'react';
import './style.less'
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import intl from "react-intl-universal";
import { Link, useHistory } from "react-router-dom";

const { Option } = Select;
import { getCommonList, getType } from "../../../api/system";
import Const from "../../../utils/Const";
import { FormOutlined } from "@ant-design/icons";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

export default function Dictionary(props) {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState({});
    const [pagination, setPagintion] = useState({
        current: 1,
        pageSize: 10
    });
    const [typeList, setTypeList] = useState([])
    const handleChange = (tablePagination) => {
        setPagintion(tablePagination);
        getListData(tablePagination, params)
    }

    async function getListData(pagination, params) {
        try {
            setLoading(true)
            getType().then(res => {
                if (res.code === Const.SUCCESS_CODE) {
                    setTypeList(res.rows.map(x => x.dictType))
                }
            })
            const { code, rows, total } = await getCommonList({
                ...pagination, ...params
            })
            if (code && code === Const.SUCCESS_CODE) {
                setTotal(total)
                setList(rows)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }

    }

    useEffect(() => {
        getListData({
            current: 1,
            pageSize: 10
        }, {})
    }, [])

    const onFinish = (values) => {
        setParams(values)
        getListData(pagination, values)
    };
    const columns = [
        {
            title: '字典名称',
            dataIndex: 'label',
        },
        {
            title: '字典类型',
            dataIndex: 'dictType',
        },
        {
            title: '字典值',
            dataIndex: 'value',
        },
        {
            title: '描述',
            dataIndex: 'remark',
        },
        {
            title: '优先级',
            dataIndex: 'sort',
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <div className="primary-color cursor-pointer" style={{ fontSize: '16px' }}>
                    <FormOutlined onClick={() => history.push(`/system/edit/${record.id}`, { group: record })} />
                </div>
            )
        }
    ]
    const history = useHistory();
    return (
        <>
            <div className="content-container m-20">
                <div className="content-header p-10-20">
                    {intl.get("one.searchCondition")}
                </div>
                <div className="p-20">
                    <Form {...layout} name="control-ref" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col sm={24} md={8}>
                                <Form.Item name="dictType" label="字典类型">
                                    <Select className="w-64" allowClear placeholder="请选择">
                                        {typeList.map(item => (
                                            <Option key={item} value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={8}>
                                <Form.Item name="keyword" label='关键词'>
                                    <Input allowClear className="w-64" placeholder="请输入字典名称, 类型或者值" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={8} className="btn-panel text-right">
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
                        <Col md={24} className="text-right">
                            <Button className="black" onClick={() => history.push('/system/create')}>
                                新建
                            </Button>
                        </Col>
                    </Row>
                    <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
                        <Table loading={loading} dataSource={list} columns={columns} pagination={pagination} rowKey="id"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
        </>

    );
}
