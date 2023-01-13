import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Drawer, Spin } from 'antd';
import intl from 'react-intl-universal';
import Profile from './components/profile'
import Summary from './components/summary'
import Personal from './components/personal'
import Label from './components/label'
import Right from './components/right'
import Trading from './components/trading'
import Behavior from './components/behavior'
import { getConsumersDetail } from 'api/one-insight'
import Const from 'utils/Const';
import './style.less';
import list from 'assets/images/home/list.png';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Detail(props) {
  const [isMember, setIsMember] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  const [consumerId] = useState(props.match.params.id)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getConsumersDetail(props.match.params.id).then(res => {
      if (res.code === Const.SUCCESS_CODE) {
        setUserInfo(res.data)
        setIsMember(res.data.consumerIdentity === '1')
        setLoading(false)
      }
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id])
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div id="insight-detail">
      <Spin spinning={loading}>
        <div className="dictionary" onClick={showDrawer}><img src={list} alt="list" /><span>数据字典</span></div>
        <Drawer title="数据字典" width={360} placement="right" onClose={onClose} visible={visible}>
          <div className="mt-20">
            <div><b>忠诚度:</b></div>
            <div>根据过去一年所有消费者的交易次数分布划分</div>
            <div>
              {`1分：0次，2分：1次，3分：2次，4分：3次，5分：>= 4次`}
            </div>
          </div>
          <div className="mt-20">
            <div><b>活跃度: </b></div>
            <div>
              根据最近一次交易距今天数分布划分</div>
            <div>
              1分：(360,]，2分：(180,360]，3分：(90,180]，4分：(30,90]，5分：[0,30]
            </div>
          </div>
          <div className="content mt-20">
            <div><b>价值度: </b></div>
            <div>
              根据过去一年所有消费者的交易金额分布划分
            </div>
            <div>
              1分：0，2分：(0,500]，3分：(500,2000]，4分：(2000,10000]，5分：(10000,]
            </div>
          </div>
        </Drawer>
        <Row>
          <Col sm={24} md={5}>
            <div className="mt-20 bg-white p-12 mb-20">
              <Link to="/one-insight/list">  <LeftOutlined /> 消费者洞察详情 </Link>
            </div>
            <Profile userInfo={userInfo} />
          </Col>
          <Col sm={24} md={19} className="tabs-panel">
            <div className="top-tabs">
              <Tabs defaultActiveKey="1">
                {isMember ?
                  <>
                    <TabPane tab={intl.get("one.Summary")} key="1">
                      <Summary id={props.match.params.id} />
                    </TabPane>

                    <TabPane tab={intl.get("one.PersonalInformation")} key="2">
                      <Personal userInfo={userInfo} isMember={isMember} />
                    </TabPane>

                    <TabPane tab={intl.get("one.LabelPortrait")} key="3">
                      <Label id={props.match.params.id} userInfo={userInfo} />
                    </TabPane>

                    <TabPane tab={intl.get("one.ClassRight")} key="4">
                      <Right id={props.match.params.id} />
                    </TabPane>

                    <TabPane tab={intl.get("one.TradingHistory")} key="5">
                      <Trading id={props.match.params.id} />
                    </TabPane>

                    {/* <TabPane tab={intl.get("one.BehaviorHistory")} key="6">
                    <Behavior />
                  </TabPane> */}
                  </>
                  :
                  <TabPane tab={intl.get("one.PersonalInformation")} key="1">
                    <Personal userInfo={userInfo} isMember={isMember} />
                  </TabPane>}

              </Tabs>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
