import React, { useState, useEffect } from 'react';
import intl from 'react-intl-universal';
import { Row, Col, Input, Checkbox, Form, DatePicker, Select, Button, Table, Radio, message, Tooltip, Popover } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getPagedConsumers } from 'api/one-insight';
import { getDictionary, getRegion } from 'api/dictionary';
import Const from 'utils/Const';
import moment from 'moment';
import { memberOptions, levelOptions, levelMemberOptions } from 'utils/Json';
import './style.less';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';

const { RangePicker } = DatePicker;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};


export default function List(props) {

  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [parmeters, setParmeters] = useState({});
  const [consumerList, setConsumerList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [sourceOptions, setSourceOptions] = useState([])
  const [currentIdentity, setCurrentIdentity] = useState('')
  const [regionData, setRegionData] = useState([])
  const [proviceList, setProviceList] = useState([])
  const [cityList, setCityList] = useState([])

  useEffect(() => {
    getRegion().then(res => {
      if (res.code === Const.SUCCESS_CODE) {
        setRegionData(res.rows)
        let provices = res.rows.map(x => x.province)
        let proviceSet = [...new Set(provices)]
        setProviceList(proviceSet)
      }
    })

    getDictionary('sourceChannel').then(res => {
      if (res.code === Const.SUCCESS_CODE) {
        setSourceOptions(res.rows)
      }
    })
    let parmeters = sessionStorage.getItem('member-parmeters') ?
      JSON.parse(sessionStorage.getItem('member-parmeters')) : {}
    form.setFieldsValue(parmeters)
    getConsumers({
      current: 1,
      pageSize: 10
    }, parmeters)
  }, [form])

  const provinceChange = (value) => {
    form.resetFields(['city'])
    let cities = regionData.filter(x => x.province === value)
    setCityList(cities)
  }

  function getConsumers(newPagination, newParmeters) {
    setLoading(true)
    setConfirmLoading(true)
    let parmeters = { pageNum: newPagination.current, pageSize: newPagination.pageSize, ...newParmeters }
    getPagedConsumers(parmeters).then(res => {
      if (res.code === Const.SUCCESS_CODE) {
        setPagination({
          current: newPagination.current,
          pageSize: newPagination.pageSize,
          total: res.total
        })
        setConsumerList(res.rows)
        setLoading(false)
        setConfirmLoading(false)
        sessionStorage.removeItem('member-parmeters')
      }
    }).catch(error => {
      setLoading(false)
      setConfirmLoading(false)
    })
  }

  const onFinish = (values) => {
    console.log(values)
    let parmeters = { ...values }
    setParmeters(parmeters);
    getConsumers({
      current: 1,
      pageSize: 10
    }, parmeters)
  };

  const onReset = () => {
    form.resetFields()
    getConsumers({
      current: 1,
      pageSize: 10
    }, {})
  }

  const handleChange = (tablePagination) => {
    getConsumers(tablePagination, parmeters)
  }

  const identityChange = (value) => {
    form.resetFields(['memberLevel', 'fans'])
    if (value && value.length === 0) {
      setCurrentIdentity('')
    } // ????????????
    if (value && value.length === 1) {
      sessionStorage.setItem('identityPreviousSelect', value[0]) //????????????
      form.setFieldsValue({
        consumerIdentity: value[0]
      })
      setCurrentIdentity(value[0])
    } // ??????????????????

    if (value.length > 1) {
      let currentSelect = value.filter(x => x !== sessionStorage.getItem('identityPreviousSelect')) //??????????????????
      form.setFieldsValue({
        consumerIdentity: currentSelect[0]
      })
      setCurrentIdentity(currentSelect[0])
      sessionStorage.setItem('identityPreviousSelect', currentSelect[0])
    } // ???????????????, ?????????????????????
  }

  const levelChange = (value) => {
    if (value && value.length === 1) {
      sessionStorage.setItem('levelPreviousSelect', value[0]) //????????????
      form.setFieldsValue({
        memberLevel: value[0]
      })
    } // ??????????????????

    if (value.length > 1) {
      let currentSelect = value.filter(x => x !== sessionStorage.getItem('levelPreviousSelect')) //??????????????????
      form.setFieldsValue({
        memberLevel: currentSelect[0]
      })
      sessionStorage.setItem('levelPreviousSelect', currentSelect[0])
    } // ???????????????, ?????????????????????
  }

  const content1 = (
    <div>
      <div>?????????????????????????????????</div>
      <div>?????????????????????????????????????????????????????????</div>
      <div>????????????????????????????????????????????????</div>
    </div>
  );

  const columns = [
    {
      title: intl.get("one.ID"),
      dataIndex: 'id',
    },
    {
      title: intl.get("one.clientMebmerNo"),
      dataIndex: 'memberNumber',
    },
    {
      title: intl.get("one.name"),
      dataIndex: 'realName',
    },
    {
      title: intl.get("one.phone"),
      dataIndex: 'phone',
    },
    {
      title: intl.get("one.clinetType"),
      dataIndex: 'consumerIdentity',
      render: (text) => {
        return text === '1' ? intl.get("one.member") : intl.get("one.walkInConsumer")
      } // 1 member  0 walkInConsumer

    },
    {
      title: "????????????",
      dataIndex: 'memberLevel',
      render: (text) => {
        const levelMember = levelMemberOptions.find(x => x.value === text);
        if (levelMember) {
          return levelMember.label
        } else {
          return 'walk in'
        }
      }
    },
    {
      title: <div>{intl.get("one.sourceChannel")}
        <div className="cursor-pointer display-inline-block ml-10">
          <Popover content={content1} title="??????" placement="top">
            <QuestionCircleOutlined />
          </Popover>
        </div></div>,
      dataIndex: 'sourceType',
    },
    {
      title: '??????',
      dataIndex: 'detail',
      render: (text, record) => (
        <Tooltip placement="top" title="??????">
          <Link
            to={`/one-insight/detail/${record.id}`}
            onClick={() => sessionStorage.setItem('member-parmeters', JSON.stringify(parmeters))}>
            <MenuOutlined />
          </Link>
        </Tooltip>
      )
    },
  ]

  return (
    <div id="insight-list">
      <div className="content-container m-20">
        <div className="content-header p-10-20">
          {intl.get("one.searchCondition")}
        </div>
        <div className="p-20">
          <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
            <Row gutter={16}>
              <Col sm={24} md={8}>
                <Form.Item name="memberNumber" label={intl.get("one.memberNo")}>
                  <Input className="w-64" allowClear />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="phone" label={intl.get("one.phone")}>
                  <Input className="w-64" allowClear />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="realName" label='??????'>
                  <Input className="w-64" allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col sm={24} md={8}>
                <Form.Item name="consumerIdentity" label={intl.get("one.clinetType")}>
                  {/* <Checkbox.Group options={memberOptions} onChange={(value) => identityChange(value)} /> */}
                  <Select className="w-64" placeholder="?????????">
                    {memberOptions.map(item => (
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="fans" label="????????????">
                  <Select className="w-64" placeholder="?????????">
                    <Option value="1">???</Option>
                    <Option value="0">???</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="memberLevel" label={intl.get("one.membershipLevel")}>
                  <Checkbox.Group options={levelOptions} onChange={(value) => levelChange(value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col sm={24} md={8}>
                <Form.Item name="sourceType" label={intl.get("one.sourceChannel")}>
                  <Select className="w-64" allowClear placeholder="?????????">
                    {sourceOptions && sourceOptions.map(item => (
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="province" label={intl.get("one.province")}>
                  <Select className="w-64" placeholder="?????????" allowClear onChange={(value) => provinceChange(value)}>
                    {proviceList.map(item => (
                      <Option key={item} value={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item name="city" label={intl.get("one.city")}>
                  <Select className="w-64" allowClear placeholder="?????????">
                    {cityList.map(item => (
                      <Option key={item.city} value={item.city}>{item.city}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={24} md={24} className="btn-panel text-right">
                <Button className="mr-10" htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button  loading={confirmLoading} htmlType="submit" className="black">
                  {intl.get("Public.Operation.serach")}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="one-table">
        <div className="total-people">???????????????{pagination.total}???</div>
        <Table loading={loading} dataSource={consumerList} columns={columns} pagination={pagination} rowKey="id" onChange={handleChange} />
      </div>
    </div>
  );
}

