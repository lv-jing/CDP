import React, {useState, useEffect} from 'react';
import './style.less'
import {Button, Col, Form, Input, Row, Select, Table} from "antd";
import intl from "react-intl-universal";
import {Link, useHistory} from "react-router-dom";

const {Option} = Select;
import {getLabelList} from "../../api/label";
import Const from "../../utils/Const";
import {FormOutlined} from "@ant-design/icons";

const layout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};

const typeList = [
    {label: '购买渠道', value: '0'},
    {label: '价值贡献', value: '1'},
    {label: '价值评估', value: '2'},
    {label: '其他', value: '3'}
]
export default function LableList(props) {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState({});
    const [pagination, setPagintion] = useState({
        current: 1,
        pageNum: 1,
        pageSize: 10
    });
    const handleChange = (tablePagination) => {
        setPagintion({...tablePagination, pageNum: tablePagination.current - 1});
        getListData({...tablePagination, pageNum: tablePagination.current - 1}, params)
    }

    async function getListData(pagination, params) {
        try {
            setLoading(true)
            const {code, rows, total} = await getLabelList({
                ...pagination, ...params
            })
            if (code && code === Const.SUCCESS_CODE) {
                setTotal(total)
                setPagintion({...pagination, total})
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
            pageNum: 1,
            pageSize: 10
        }, {})
    }, [])

    const onFinish = (values) => {
        setParams(values)
        getListData(pagination, values)
    };
    const columns = [
        {
            title: '标签值',
            dataIndex: 'labelName',
        },
        {
            title: '消费者人数',
            dataIndex: 'createBy',
        },
        {
            title: '占比',
            dataIndex: 'updateMode',
        }
    ]
    const history = useHistory();
    return (
        <>
            <div className="content-container m-20">
                <div className="content-header p-10-20">
                    <Button className="black" onClick={() => history.push('/label/create')}>
                        创建标签
                    </Button>
                </div>
                <div className="p-20">
                    <Form {...layout} name="control-ref" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col sm={24} md={8}>
                                <Form.Item name="typeCode" label='标签ID'>

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="content-container m-20">
                <div className="p-20">
                    <Row>
                        <Col md={24} className="text-right">
                            <Button className="black" onClick={() => history.push(`/label/edit/1`)}>
                                编辑标签
                            </Button>
                        </Col>
                    </Row>
                    <div className="one-table" style={{padding: 0, marginTop: 10}}>
                        <Table loading={loading} dataSource={list} columns={columns} pagination={pagination} rowKey="id"
                               onChange={handleChange}/>
                    </div>
                </div>
            </div>
        </>

    );
}
