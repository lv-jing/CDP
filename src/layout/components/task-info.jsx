import React, { useState } from 'react';
import { Tabs, Badge, Empty, Drawer } from 'antd';
import { BellOutlined, RightOutlined } from '@ant-design/icons';

export default function TaskInfo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Badge size="small" count={11} onClick={() => setVisible(true)}><BellOutlined style={{fontSize: 18}} /></Badge>
      <Drawer
        title="Notifications"
        width={480}
        onClose={() => setVisible(false)}
        visible={visible}
        footer={
          <a href="/" className="word flex align-center space-between">
            <span>View all task</span>
            <RightOutlined className="word small" />
          </a>
        }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key="1" tab="Reminder">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="To Do Task">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
}
