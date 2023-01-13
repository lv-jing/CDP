import React from 'react';
import { Layout } from 'antd';
import VIcon from 'components/icon';
import SiteHeader from './header';
import Footer from './footer';

const { Header, Sider } = Layout;

export default function MainLayout({ menu, onCollapsedChange, children }) {

  return (
    <Layout className="main-layout">
      <Header className="main-header bg-white flex align-center">
        <SiteHeader />
      </Header>
      <Layout>
        <Layout className="site-layout scrollbar">
          <div>
            {children}
          </div>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </Layout>
  );
}
