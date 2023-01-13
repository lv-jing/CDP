import React from 'react';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './index.less';

export default function MobileHeader({ backUrl, title, showLeftIcon = true }) {
  const history = useHistory();
  const onBack = () => {
    if (backUrl) {
      history.push(backUrl);
    } else {
      history.go(-1);
    }
  }

  return (
    <div className="mobile-header flex align-center">
      {showLeftIcon && <span className="left-icon" onClick={onBack}><LeftOutlined style={{fontSize:28}} /></span>}
      <span className="title flex-item flex-main">{title}</span>
      {showLeftIcon && <span className="right-icon"><LeftOutlined style={{fontSize:28}} /></span>}
    </div>
  );
}
