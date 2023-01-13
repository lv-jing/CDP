import React from 'react';
import { Modal } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { createBrowserHistory } from 'history';
import intl from 'react-intl-universal';

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME
});

export const logOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  history.push('/login');
};

export const isMobileApp = () => {
  const devices = navigator.userAgent.toLowerCase();
  return /iphone/.test(devices) || /android/.test(devices);
};

export const OpenMessage = ({ success, message, handleAfterClose }) => {
  const config = {
    icon: null,
    centered: true,
    maskClosable: true,
    closable: false,
    okButtonProps: {style: {display: 'none'}},
    afterClose: () => {
      if (handleAfterClose) {
        handleAfterClose();
      }
    },
  };
  if (isMobileApp()) {
    Object.assign(config, {
      className: 'rc-mobile-modal',
      content: (
        <div className="align-item-center">
          <div className="vpadding-level-2 word big bold">{success ? intl.get('Public.Feedback.success') : intl.get('Public.Feedback.error')}</div>
          <div className="vpadding-level-2 word big">{message}</div>
        </div>
      ),
      okButtonProps: {style: {display: 'none'}},
      cancelButtonProps: {type: 'link', size: 'large', style: {width: '100%'}},
      cancelText: intl.get('Public.Operation.confirm'),
      width: '80%',
    });
  } else {
    Object.assign(config, {
      className: 'rc-desktop-modal',
      title: intl.get('Public.Operation.title'),
      closable: true,
      width: 360,
      content: (
        <div className="align-item-center">
          {success ? <CheckCircleFilled className="hmargin-level-1" style={{color:'#52c41a',fontSize:16}} /> : <CloseCircleFilled className="hmargin-level-1" style={{color:'#f5222d',fontSize:16}} />}
          <span className="word big bold">{message}</span>
        </div>
      ),
      okButtonProps: {style: {display: 'none'}},
      cancelButtonProps: {style: {display: 'none'}},
    });
  }
  Modal.confirm(config);
}

export const ConfirmAction = (message, handler) => {
  Modal.confirm({
    title: intl.get('Public.Feedback.need_you_confirm'),
    content: message || intl.get('Public.Feedback.default_tip'),
    okText: intl.get('Public.Operation.confirm'),
    cancelText: intl.get('Public.Operation.cancel'),
    onOk() {
      if (handler) {
        handler()
      }
    },
  });
}



/**
 * 转化为嵌套结构
 * @param sourceData 源数据
 * @param parent 父级
 * @param current 当前层级
 */
export const treeNesting = function (sourceData,parent,current){
  const immData = sourceData
  const newDataList = immData
      .filter((item) => item[parent] == 0)
      .map((data) => {
        const children = immData
            .filter((item) => item[parent] == data[current])
            .map((childrenData) => {
              const lastChildren = immData.filter((item) => item[parent] == childrenData[current]);
              if (lastChildren && lastChildren.length > 0) {
                childrenData.children = lastChildren;
              }
              return childrenData;
            });

        if (children && children.length > 0) {
            data.children = children;
        }
        return data;
      });
  return newDataList
}

export const toComma = (number) => {
  return number ? number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : ''
};
