import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Avatar, Menu, message } from 'antd';
import { LogoutOutlined, UserOutlined, SettingOutlined, BgColorsOutlined } from '@ant-design/icons';
import { GlobalContext } from 'context/globalContext';
import { logOut } from 'utils/tools';
import defaultSmall from 'assets/images/font/default-small.png'

const colorList = ['#448bff', '#e2001a', '#722ed1', '#52c41a', '#eb2f96'];

export default function UserInfo() {
  const [theme, setTheme] = useState(0);
  const [user, setUser] = useState({})
  const history = useHistory();
  const [initStatus, setInitStutas] = useState(false)

  useEffect(() => {
    if (!initStatus) {
      init()
      setInitStutas(true)
    }
  }, [initStatus])

  const init = () => {
    if (localStorage.getItem('userInfo')) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        setUser(userInfo)
      }
    }

  };

  const onUserDropDownMenuClick = ({ key }) => {
    if (key === '4') {
      logOut();
    }
  };
  const userMenu = (
    <Menu className="head-dropdown-menu" onClick={onUserDropDownMenuClick}>
      {/* <Menu.Item key="1" icon={<UserOutlined />}>Personal center</Menu.Item> */}
      {/* <Menu.Divider /> */}
      <Menu.Item key="4" icon={<LogoutOutlined />}>Sign out</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={userMenu} trigger={['click']} placement="bottomCenter" overlayClassName="header-item-popover">
      <div className="flex align-center">
        {user.avatar ?
          <Avatar className="head-avatar" src={user.avatar}></Avatar>
          : <img src={defaultSmall} alt="defaultSmall" />}
        <span className="hpadding-level-3">{user.xing}</span>
      </div>
    </Dropdown>
  );
}
