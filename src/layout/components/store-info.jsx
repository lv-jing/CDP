import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import catLogo from 'assets/images/cat_store_logo.png';
import dogLogo from 'assets/images/dog_store_logo.png';

const stores = [
  {
    logo: catLogo,
    storeName: 'Cat Mall',
  },
  {
    logo: dogLogo,
    storeName: 'Dog Mall',
  }
];

export default function StoreInfo({ children }) {
  const [selectedKey, setSelectedKey] = useState('0');
  const handleDropdownMenuClick = ({ key }) => {
    setSelectedKey(key);
  };
  const storeMenu = (
    <Menu className="head-dropdown-menu" onClick={handleDropdownMenuClick}>
      {stores.map((store, idx) => (
        <Menu.Item key={idx} className={`${idx}` === selectedKey ? 'store-info-menu-selected' : ''}>
          <span className="flex align-center">
            <span className="flex-item noshrink"><img src={store.logo} alt="" /></span>
            <span className="flex-item hmargin-level-2">{store.storeName}</span>
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={storeMenu} trigger={['click']} placement="bottomLeft" overlayClassName="header-item-popover">
      {children ?? 
      <div className="flex align-center">
        <span><img src={stores[selectedKey].logo} alt="" /></span>
        <span className="hmargin-level-2 word big primary">{stores[selectedKey].storeName}</span>
        <DownOutlined className="word small primary" />
      </div>}
    </Dropdown>
  );
}
