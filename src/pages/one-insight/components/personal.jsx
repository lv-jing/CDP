import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import jibenxinxi from "assets/images/font/jibenxinxi.png";
import lianxixinxi from "assets/images/font/lianxixinxi.png";
import './style/personal-style.less'
import { levelMemberOptions } from 'utils/Json'

export default function Personal(props) {
    const [userInfo, setUserInfo] = useState({})
    const [isMember, setIsMember] = useState(false)
    const [levelMember, setLevelMember] = useState({})

    useEffect(() => {
        if (props.userInfo) {
            setUserInfo(props.userInfo)
            setIsMember(props.isMember)
            if (props.userInfo && props.userInfo.memberLevel) {
                const levelMember = levelMemberOptions.find(x => x.value === props.userInfo.memberLevel);
                if (levelMember) {
                    setLevelMember(levelMember)
                }
            }
        }
    }, [props.userInfo, props.isMember])

    return (
        <div id="personal" className="mt-20">
            {isMember ?
                <div className="personal-panel">
                    <div>
                        <img src={jibenxinxi} alt="jibenxinxi" /> <span className="title">基本信息</span>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div className="field">
                                <div className="lable">姓</div>
                                <div className="text">{userInfo.xing}</div>
                            </div>
                            <div className="field">
                                <div className="lable">名</div>
                                <div className="text">{userInfo.ming}</div>
                            </div>
                            <div className="field">
                                <div className="lable">会员等级</div>
                                <div className="text">{levelMember ? levelMember.label : null}</div>
                            </div>
                            <div className="field">
                                <div className="lable">入会时间</div>
                                <div className="text">{userInfo.joinTime}</div>
                            </div>
                            <div className="field">
                                <div className="lable">关注公众号</div>
                                <div className="text">{userInfo.fans === '1' ? '是' : '否'}</div>
                            </div>
                            {/* <div className="field">
                                <div className="lable">可用积分</div>
                                <div className="text">{userInfo.availableSource}</div>
                            </div> */}
                        </Col>
                        <Col md={12}>
                            <div className="field">
                                <div className="lable">性别</div>
                                <div className="text">{userInfo.sex === '1' ? '男' : '女'}</div>
                            </div>
                            <div className="field">
                                <div className="lable">入会渠道</div>
                                <div className="text">{userInfo.joinType}</div>
                            </div>
                            <div className="field">
                                <div className="lable">入会月龄</div>
                                <div className="text">{userInfo.joinMonth}</div>
                            </div>
                            <div className="field">
                                <div className="lable">是否微信绑定</div>
                                <div className="text">{userInfo.isWeiBind === '0' ? '否' : '是'}</div>
                            </div>
                            {/* <div className="field">
                                <div className="lable">积分兑换次数</div>
                                <div className="text">{userInfo.exchangeNum}</div>
                            </div> */}
                        </Col>
                    </Row>
                </div > :
                <div className="personal-panel">
                    <div>
                        <img src={jibenxinxi} alt="jibenxinxi" /> <span className="title">基本信息</span>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div className="field">
                                <div className="lable">姓</div>
                                <div className="text">{userInfo.xing}</div>
                            </div>
                            <div className="field">
                                <div className="lable">名</div>
                                <div className="text">{userInfo.ming}</div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="field">
                                <div className="lable">性别</div>
                                <div className="text">{userInfo.sex === '1' ? '男' : '女'}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            }

            <div className="personal-panel">
                <div>
                    <img src={lianxixinxi} alt="lianxixinxi" /> <span className="title">联系信息</span>
                </div>
                <Row>
                    <Col md={12}>
                        <div className="field">
                            <div className="lable">邮箱</div>
                            <div className="text">{userInfo.email}</div>
                        </div>
                        <div className="field">
                            <div className="lable">省份</div>
                            <div className="text">{userInfo.province}</div>
                        </div>
                        <div className="field">
                            <div className="lable">城市</div>
                            <div className="text">{userInfo.city}</div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="field">
                            <div className="lable">联系电话</div>
                            <div className="text">{userInfo.phone}</div>
                        </div>
                        <div className="field">
                            <div className="lable">区</div>
                            <div className="text">{userInfo.district}</div>
                        </div>
                        <div className="field">
                            <div className="lable">详细地址</div>
                            <div className="text">{userInfo.address}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}