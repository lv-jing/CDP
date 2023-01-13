import React from 'react';
import { Divider } from 'antd';
import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import VIcon from 'components/icon';

import StoreInfo from './components/store-info';
import SearchBar from './components/search-bar';
import TaskInfo from './components/task-info';
import UserInfo from './components/user-info';

import logoImg from 'assets/images/pic_logo.png';

export default function Header({ menu }) {

  return (
    <>
      <div className="logo" style={{ marginLeft: '1rem' }}>
        <img src={logoImg} height="36" alt="" />
      </div>
      <div id="step_menu" className="flex-item flex-main">
        {menu}
      </div>
      <div className="flex-item top-widget hpadding-level-2 flex align-center">
        <div id="step_searchbar" className="search-info hmargin-level-3">
          <SearchBar />
        </div>
        {/* <div className="store-info hmargin-level-3">
          <StoreInfo>
            <VIcon type="icon-dianpu" style={{fontSize: 18}} />
          </StoreInfo>
        </div> */}
        {/* <div id="step_help" className="hmargin-level-3"><QuestionCircleOutlined style={{ fontSize: 18 }} /></div>
        <div className="hmargin-level-3"><SettingOutlined style={{ fontSize: 18 }} /></div> */}
        {/* <div id="step_task" className="hmargin-level-3">
          <TaskInfo />
        </div> */}
        <Divider type="vertical" style={{ borderColor: '#cacaca', height: 30 }} />
        <div id="step_user" className="user-info hmargin-level-4">
          <UserInfo />
        </div>
      </div>
    </>
  );
}

