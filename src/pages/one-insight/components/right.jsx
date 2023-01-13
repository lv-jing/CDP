import React, { useState, useEffect } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import './style/right-style.less'
import { getEquityList } from 'api/one-insight'
import Const from 'utils/Const';

export default function Right(props) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getEquityList({ memberId: props.id }).then(res => {
            if (res.code === Const.SUCCESS_CODE) {
                setEquityList(res.rows)
                setLoading(false)
            }
        })
    }, [props.id])
    const [equityList, setEquityList] = useState([])
    const handleChange = (tablePagination) => {
    }
    const columns = [
        {
            title: '渠道来源',
            dataIndex: 'registerSource',
        },

        {
            title: '会员等级',
            dataIndex: 'newGrade',
        },
        {
            title: '变更类型',
            dataIndex: 'createBy'
        }, 
        {
            title: '变更时间',
            dataIndex: 'changeTime',
        },
        {
            title: '审阅时间',
            dataIndex: 'updateTime',
        }
    ]
    return (
        <div id="right">
            <div className="one-table" style={{ padding: 0 }}>
                <Table loading={loading} dataSource={equityList} columns={columns} pagination={false} rowKey="id" onChange={handleChange} />
            </div>
        </div>
    )
}