import React, { useState, useEffect } from 'react';
import { Avatar, Row, Col, Tooltip } from 'antd';
import man from "assets/images/font/man.png";
import woman from "assets/images/font/woman.png";
import vip from "assets/images/font/icon-vip.png";
import phone from "assets/images/font/dianhua.png";
import id from "assets/images/font/id.png";
import brith from "assets/images/font/shengri.png";
import status from "assets/images/font/huiyuanzhuangtai.png";
import zhongchengdu from "assets/images/font/zhongchengdu.png";
import huoyuedu from "assets/images/font/huoyuedu.png";
import jiazhidu from "assets/images/font/jiazhidu.png";
import defaultImage from "assets/images/font/default.png";
import './style/profile-style.less';
import Cricle from 'components/Water/cricle';
import { levelMemberOptions } from 'utils/Json';

export default function Profile(props) {
    const [userInfo, setUserInfo] = useState({})
    const [levelMember, setLevelMember] = useState({})

    useEffect(() => {
        if (props.userInfo) {
            setUserInfo(props.userInfo)
            if (props.userInfo && props.userInfo.memberLevel) {
                const levelMember = levelMemberOptions.find(x => x.value === props.userInfo.memberLevel);
                if (levelMember) {
                    setLevelMember(levelMember)
                }
            }
        }
    }, [props.userInfo, props.isMember])
    return (
        <div id="profile">
            <div className="container">
                <div className="avatar">
                    {userInfo.headUrl ? <Avatar shape="circle" size={80} src={userInfo.headUrl} /> : <img src={defaultImage} alt="defaultImage" />}
                    <p>{userInfo.nickname}</p>
                </div>
                <Row>
                    <Col md={12}>
                        {userInfo.sex === '1' ? <><img src={man} alt="man" /> 男</> : <>  <img src={woman} alt="woman" /> 女</>}
                    </Col>
                    <Col md={12}>
                        {userInfo.age ? `${userInfo.age}岁` : '未知'}
                    </Col>
                </Row>
                <div className="vip">
                    <Row>
                        <Col md={6} className="icon">
                            <img src={vip} alt="vip" />
                        </Col>
                        <Col md={18}>
                            <div className="vip-level">{levelMember ? levelMember.label : null}</div>
                        </Col>
                    </Row>
                </div>
                <div className="info">
                    <Row>
                        <Col md={2}>
                            <img src={id} alt="id" />
                        </Col>
                        <Col md={22} className="word word-hide">
                            <Tooltip placement="top" title={userInfo.id}>
                                <span className="profile-lable">消费者ID</span>
                                <span>{userInfo.id}</span>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <img src={id} alt="id" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">会员号</span>
                            <span>{userInfo.memberNumber}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <img src={phone} alt="phone" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">电话:</span>
                            <span>{userInfo.phone}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <img src={brith} alt="brith" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">生日:</span>
                            <span>{userInfo.birthday}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <img src={status} alt="status" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">会员状态:</span>
                            <span>{userInfo.status === '0' ? '正常' : '注销'}</span>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col md={2}>
                            <img src={status} alt="status" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">关注公众号:</span>
                            <span>{userInfo.isWeiBind === '0' ? '否' : '是'}</span>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col md={2}>
                            <img src={status} alt="status" />
                        </Col>
                        <Col md={22} className="word">
                            <span className="profile-lable">个人积分:</span>
                            <span>{userInfo.availableSource}</span>
                        </Col>
                    </Row>
                </div>
                <div className="du">
                    <Cricle image={zhongchengdu} title='忠诚度' point={userInfo.loyalty} />
                    <Cricle image={huoyuedu} title='活跃度' point={userInfo.activity} />
                    <Cricle image={jiazhidu} title='价值度' point={userInfo.valueDegree} />
                </div>
            </div>
        </div>
    )
}