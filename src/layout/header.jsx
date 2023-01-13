import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';

import StoreInfo from './components/store-info';
import SearchBar from './components/search-bar';
import TaskInfo from './components/task-info';
import UserInfo from './components/user-info';

export default function Header() {

  return (
    <>
      <div className="store-info hmargin-level-4 flex align-center">
        <StoreInfo />
      </div>
      <div className="flex-item flex-main top-widget hpadding-level-2 flex flex-end align-center">
        <div className="search-info hmargin-level-4">
          <SearchBar />
        </div>
        <div className="hmargin-level-4"><QuestionCircleOutlined style={{fontSize: 18}} /></div>
        <div className="hmargin-level-4">
          <TaskInfo />
        </div>
        <div className="user-info hmargin-level-4">
          <UserInfo />
        </div>
      </div>
    </>
  );
}
