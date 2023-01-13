import React from 'react';
import { Layout } from 'antd';
import SiteHeader from './header-hoz';

const { Header, Sider } = Layout;

export default function HozLayout({ menu, submenu, children }) {

  return (
    <Layout className="top-layout">
      <Header className="main-header bg-head-menu flex align-center">
        <SiteHeader menu={menu} />
      </Header>
      <Layout>
        <Layout className="site-layout scrollbar" id="page-content">
          <div>
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}
