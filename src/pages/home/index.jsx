import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Drawer, DatePicker, message } from 'antd';
import { toComma } from 'utils/tools';
import Member from './components/member';
import Top5 from './components/top5';
import './style.less'
import { getHomeData, getTrendData } from 'api/home'
import Const from 'utils/Const';
import list from 'assets/images/home/list.png';
import total from 'assets/images/home/total.png';
import totalsmall from 'assets/images/home/totalsmall.png';
import member from 'assets/images/home/member.png';
import membersmall from 'assets/images/home/membersmall.png';
import wmember from 'assets/images/home/wmember.png';
import wmembersmall from 'assets/images/home/wmembersmall.png';
import fans from 'assets/images/home/fans.png';
import fanssmall from 'assets/images/home/fanssmall.png';
import segmentsmall from 'assets/images/home/segmentsmall.png';
import groupsmall from 'assets/images/home/groupsmall.png';
import Level from './components/level'
import moment from 'moment';


const Home = () => {
    const [peopleData, setPeopleData] = useState([])
    const [lableData, setLableData] = useState([])
    const [groupData, setGroupData] = useState([])
    const [top5Data, setTop5Data] = useState([])
    const [trendData, setTrendData] = useState([])
    const [levelData, setLevelData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [monthDate, setMonthDate] = useState(moment(new Date()).format('YYYY-MM'))
    const [createTime, setCreateTime] = useState('')

    useEffect(() => {
        setLoading(true)
        getHome(monthDate)
    }, [monthDate])

    const getHome = (statisticsMonth) => {
        console.log(1);
        // 36意思是取3种不同的数据各12条
        Promise.all([getHomeData({ statisticsMonth }), getTrendData({ pageNum: 1, pageSize: 36, statisticsMonth })]).then((res) => {
            if (res[0].code === Const.SUCCESS_CODE) {
                //1，2，3，4，5是与后端约定取对应的数据
                setCreateTime(res[0].data[0]?.createTime)
                setPeopleData(res[0].data.filter(x => x.mainType === '1')) //人数
                setLableData(res[0].data.filter(x => x.mainType === '2')) //标签数
                setGroupData(res[0].data.filter(x => x.mainType === '3')) //消费客群数
                setTop5Data(res[0].data.filter(x => x.mainType === '4')) //top5标签
                setLevelData(res[0].data.filter(x => x.mainType === '5')) //等级分布
            }
            if (res[1].code === Const.SUCCESS_CODE) {
                setTrendData(res[1].data)
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    }
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    const dateChange = (dateStrings) => {
        setMonthDate(dateStrings)
    }

    return (
        <div id="home">
            <div className="dictionary" onClick={showDrawer}><img src={list} alt="list" /><span>数据字典</span></div>
            <Drawer title="数据字典" width={360} placement="right" onClose={onClose} visible={visible}>
                <div className="mt-20">
                    <div><b>标签个数:</b></div>
                    <div>包含所有内置标签和新建标签</div>
                    <div><b>使用率:</b></div>
                    <div>(消费者客群所用的标签个数/标签个数) x 100%</div>
                </div>
                <div className="mt-20">
                    <div><b>消费者客群个数:</b></div>
                    <div>所有新建的消费者客群个数</div>
                    <div><b>使用率:</b></div>
                    <div>(被活动所使用的客群数/所有消费者客群个数) x 100%</div>
                </div>
                <div className="content mt-20">
                    <div><b>Member:</b></div>
                    <div>在任一渠道（微信公众号，天猫，京东等）注册即为会员，一人在多渠道注册若能关联仅记一人</div>
                    <div><b>Walk-in Consumer:</b></div>
                    <div>非会员在任一渠道（线下，微信商城，官网，天猫，京东等）直接购买的人（每一笔交易记一人）</div>
                </div>
                <div className="content mt-20">
                    <div><b>Top5标签:</b></div>
                    <div>建立消费者客群时，标签将被作为规则条件。Top5标签为当前所有消费者客群中各标签被使用的次数，从大致小排列前5名。</div>
                </div>
            </Drawer>
            <Spin spinning={loading}>
                <div className="mb-20">
                    <DatePicker
                        disabledDate={disabledDate}
                        defaultValue={moment(monthDate)}
                        picker="month"
                        allowClear={false}
                        onChange={(dates, dateStrings) => dateChange(dateStrings)} />
                    <span className="date-tip">*数据截止 {createTime}</span>
                </div>
                <div className="bg-white p-20">
                    <div className="f-w600"><span className="primary-color mr-10">|</span>渠道消费统计</div>
                    <Row gutter={20} className="mt-20">
                        <Col md={6}>
                            <div className="totol-people" style={{ height: '168px' }}>
                                <div className="total-title mb-10">
                                    <img src={totalsmall} alt="totalsmall" /> 全渠道消费者总数
                                </div>
                                <div className="people-card">
                                    <div>
                                        <div
                                            className="people-amount">{toComma((peopleData.find(x => x.subType === '11'))?.statisticsValue)} 人
                                        </div>
                                    </div>
                                    <div className="footer-icon">
                                        <img src={total} alt="total" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="totol-people gray" style={{ height: '168px' }}>
                                <div className="total-title mb-10">
                                    <img src={membersmall} alt="membersmall" /> 会员(Member)
                                </div>
                                <div className="people-card">
                                    <div>
                                        <div
                                            className="people-amount">{toComma((peopleData.find(x => x.subType === '12'))?.statisticsValue)} 人
                                        </div>
                                    </div>
                                    <div className="footer-icon">
                                        <img src={member} alt="member" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="totol-people gray" style={{ height: '168px' }}>
                                <div className="total-title mb-10">
                                    <img src={wmembersmall} alt="wmembersmall" /> 潜客(Walk-in Consumer)
                                </div>
                                <div className="people-card">
                                    <div>
                                        <div
                                            className="people-amount">{toComma((peopleData.find(x => x.subType === '13'))?.statisticsValue)} 人
                                        </div>
                                    </div>
                                    <div className="footer-icon">
                                        <img src={wmember} alt="wmember" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="totol-people gray" style={{ height: '168px' }}>
                                <div className="total-title mb-10">
                                    <img src={fanssmall} alt="fanssmall" /> 粉丝(Fans)
                                </div>
                                <div className="people-card">
                                    <div>
                                        <div
                                            className="people-amount">{toComma((peopleData.find(x => x.subType === '14'))?.statisticsValue)} 人
                                        </div>
                                    </div>
                                    <div className="footer-icon">
                                        <img src={fans} alt="fans" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row gutter={20} className="mt-20">
                    <Col md={8} style={{ height: '250px' }}>
                        <div className="level">
                            <div className="f-w600"><span className="primary-color mr-10">|</span>会员等级分布</div>
                            <Level data={levelData} />
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row className="segment" style={{ height: '250px' }}>
                            <Col md={22}>
                                <div className="member-title">标签个数</div>
                                <div
                                    className="home-number">{(lableData.find(x => x.subType === '21'))?.statisticsValue ?? 0}
                                    <span style={{ fontSize: 12 }}>个</span>
                                </div>
                                <div
                                    className="home-rate">使用率：{(((lableData.find(x => x.subType === '22'))?.statisticsValue ?? 0) * 100).toFixed(2)}%
                                </div>
                            </Col>
                            <Col md={2}>
                                <img src={segmentsmall} alt="segment" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <Row className="twopeople" style={{ height: '250px' }}>
                            <Col md={22}>
                                <div className="member-title">消费者客群个数</div>
                                <div
                                    className="home-number">{toComma((groupData.find(x => x.subType === '31')?.statisticsValue ?? '0'))}
                                    <span style={{ fontSize: 12 }}>个</span>
                                </div>
                                {/* <div
                                    className="home-rate">使用率：{(groupData.find(x => x.subType === '32'))?.statisticsValue ?? 0}%
                                </div> */}
                            </Col>
                            <Col md={2}>
                                <img src={groupsmall} alt="groupsmall" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: '20px' }}>
                    <Col md={12}>
                        <div className="home-chart">
                            <div className="f-w600"><span className="primary-color mr-10">|</span>会员(Member)/潜客(Walk-in Consumer)/粉丝(Fans) 数量趋势</div>
                            <Member data={trendData} />
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="home-chart">
                            <div className="f-w600"><span className="primary-color mr-10">|</span>TOP5 标签</div>
                            <Top5 data={top5Data} />
                        </div>
                    </Col>
                </Row>
                <div className="footer">版权所有©Godiva 2021. 保留一切权利</div>
            </Spin>
        </div>
    )
}

export default Home