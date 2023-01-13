import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Input, Checkbox, Form, Button, Table, message } from 'antd';
import intl from 'react-intl-universal';
import { useHistory, Link } from 'react-router-dom';
import onepeople from 'assets/images/home/onepeople.png';
import twopeople from 'assets/images/home/twopeople-opacity.png';
import segment from 'assets/images/home/segment-opacity.png';
import { getPagedGroups, exportData } from 'api/many-insight';
import Const from 'utils/Const';
import { FormOutlined, DownloadOutlined } from '@ant-design/icons';
import './style.less';

export default function PoList(props) {
  const history = useHistory();
  const [tableLoading, setTableLoading] = useState(false);
  const [parmeters, setParmeters] = useState({});
  const [segmentList, setSegmentList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    getGroups({
      current: 1,
      pageSize: 10
    }, {})
  }, [])

  const onChange = (name, value) => {
    let data = parmeters;
    if (name === 'createBy') {
      if(value.target.checked) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        data['createBy'] = userInfo.userName
      } else {
        data['createBy'] = null
      }
    } else {
      data[name] = value;
    }
    setParmeters(data)
  }

  function getGroups(newPagination, newParmeters) {
    setTableLoading(true)
    let parmeters = { pageNum: newPagination.current, pageSize: newPagination.pageSize, ...newParmeters }
    getPagedGroups(parmeters).then(res => {
      if (res.code === Const.SUCCESS_CODE) {
        setPagination({
          current: newPagination.current,
          pageSize: newPagination.pageSize,
          total: res.total
        })
        setSegmentList(res.rows)
        setTableLoading(false)
      }
    })
  }

  const searchGroup = () => {
    getGroups({
      current: 1,
      pageSize: 10
    }, parmeters)
  }

  const handleChange = (tablePagination) => {
    getGroups(tablePagination, parmeters)
  }

  const downloadData = (id) => {
    let exportHref = `${process.env.REACT_APP_HOST}/druid/export/customerInsight?id=${id}`
    window.open(exportHref);
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'showName',
      key: 'showName',
      render: (text, record) => (
        <>
          <a onClick={() => history.push(`/many-insight/detail/${record.insightInfo.id}`, { group: record })}>{record.insightInfo.showName}</a>
          <div className="group-name">{record.insightInfo.groupName}</div>
        </>
      )
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      key: 'createBy',
      render: (text, record) => (record.insightInfo.createBy)
    },
    {
      title: '更新方式',
      dataIndex: 'updateMode',
      key: 'updateMode',
      render: (text, record) => (record.insightInfo.updateMode === '0' ? '例行' : '手动')
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => (record.insightInfo.createTime)
    },
    {
      title: '客群人数',
      dataIndex: 'userNum',
      key: 'userNum'
    },
    {
      title: '统计时间',
      dataIndex: 'statisticsTime',
      render: (text, record) => (record.insightInfo.statisticsTime)
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operate',
      render: (text, record) => (
        <div className="primary-color cursor-pointer" style={{ fontSize: '16px' }}>
          <FormOutlined onClick={() => history.push(`/many-insight/edit/${record.insightInfo.id}`, { group: record })} />
        </div>
      )
    },
    {
      title: '下载',
      dataIndex: '',
      key: 'operate',
      render: (text, record) => (
        <div className="primary-color cursor-pointer" style={{ fontSize: '20px' }}>
          <DownloadOutlined onClick={() => downloadData(record.insightInfo.id)} />
        </div>
      )
    }
  ]
  return (
    <div id="many-list">
      <div className="content-container m-20">
        <div className="content-header p-10-20">
          <Row>
            <Col md={12}>消费者客群洞察</Col>
            <Col md={12} className="text-right">
              <Button className="black" onClick={() => history.push('/many-insight/create')}>
                创建消费者客群洞察
              </Button>
            </Col>
          </Row>
        </div>
        <div className="p-20">
          <Row gutter={30}>
            <Col md={8}>
              <Row className="list-header">
                <Col md={6}>
                  <div className="list-icon">
                    <img src={onepeople} alt='onepeople' />
                  </div>
                </Col>
                <Col md={18}>
                  <span>使用标签、用户属性进行筛选，获得目标群体</span>
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Row className="list-header">
                <Col md={6}>
                  <div className="list-icon">
                    <img src={segment} alt='segment' />
                  </div>
                </Col>
                <Col md={18}>
                  <span>观察目标消费者群体的标签分布和 用户构成，得出消费者客群画像</span>
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Row className="list-header">
                <Col md={6}>
                  <div className="list-icon">
                    <img src={twopeople} alt='twopeople' />
                  </div>
                </Col>
                <Col md={18}>
                  <span style={{ lineHeight: '65px' }}>将目标群体保存为新的消费者客群</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div className="segment-table">
        <Row>
          <Col md={18}>
            <strong className="display-inline-block mt-5">消费者洞察列表</strong>
          </Col>
          <Col md={2} className="text-right px-10 mt-5">
            <Checkbox onChange={(value) => onChange('createBy', value)} /> <span>仅我创建</span>
          </Col>
          <Col md={3} className="px-10">
            <Input placeholder="搜索名称" onChange={(e) => onChange('showName', e.target.value)} />
          </Col>
          <Col md={1}>
            <Button className="black" onClick={() => searchGroup()}>
              {intl.get("Public.Operation.serach")}
            </Button>
          </Col>
        </Row>
        <div className="one-table" style={{ padding: 0, marginTop: 10 }}>
          <Table loading={tableLoading} dataSource={segmentList} columns={columns} pagination={pagination} rowKey="id" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
