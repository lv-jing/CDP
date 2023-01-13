import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import intl from 'react-intl-universal';


const { SubMenu } = Menu;

export default function TopMenu({ selectedKeys, setSelectedKeys, menus }) {
  const onMenuItemClick = ({ key }) => {
    setSelectedKeys(key);
  };


  return (
    <Menu
      mode="horizontal"
      selectedKeys={selectedKeys}
      onClick={onMenuItemClick}
    >
      {menus.map(m => (
        m.children ?
          <SubMenu key={m.key} title={m.title}>
            {m.children.map(c => (
              c.children ?
                <SubMenu key={c.key} title={c.title}>
                  {c.children.map(t => (
                    <Menu.Item key={t.key}>
                      <Link to={t.path}>{t.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
                :
                <Menu.Item key={c.key}>
                  <Link to={c.path}>{c.title}</Link>
                </Menu.Item>
            ))}
          </SubMenu> :
          <Menu.Item key={m.key}>
            <Link to={m.path}>{m.title}</Link>
          </Menu.Item>
      ))}
    </Menu>
  );
}
