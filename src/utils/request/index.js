import axios from 'axios';
import intl from 'react-intl-universal';
import { OpenMessage, logOut } from 'utils/tools';
import Const from 'utils/Const';
import { message } from 'antd';

let isErrorShowing = false;

const handleRequestError = (responseData, config) => {
  //如果returnResponse为true 直接返回responseData
  if(config.returnResponse){
    return responseData
  }
  if (!config.customTip && responseData.code !== Const.SUCCESS_CODE) {
    // !isErrorShowing && OpenMessage({
    //   success: false,
    //   message: responseData.message || intl.get('Public.Feedback.request_failed'),
    //   handleAfterClose: () => {
    //     isErrorShowing = false;
    //     // if (['K-000002', 'K-000005', 'K-000015'].includes(responseData.code)) {
    //     //   logOut();
    //     // }
    //   },
    // });
    if(responseData.code === Const.Authentication_Failed) {
      logOut();
    } else {
      message.warning(responseData.msg)
    }
    isErrorShowing = true;
    return Promise.reject(responseData);
  } else {

    //TODO 和后端约定返回的数据格式, 然后再细分
    //保存当前请求时间
    if(responseData.defaultLocalDateTime){
      sessionStorage.setItem('defaultLocalDateTime',responseData.defaultLocalDateTime)
    }

    return Promise.resolve(responseData);
  }
};

export const DEFAULT_REQUEST_CONFIG = {
  customTip: false,
  returnResponse:false
};

export default function request(params = { method: 'get', url: '', params: {}, data: {} }, config = DEFAULT_REQUEST_CONFIG) {

  const token = localStorage.getItem('token') || '';
  const URL = `${process.env.REACT_APP_HOST}${params.url}`;
  // const URL = `${params.url}`;
  if (token) {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return axios(Object.assign({}, params, { url: URL }, { headers })).then(response => response.data).then((data) => handleRequestError(data, config));
  }

  return axios(Object.assign({}, params, { url: URL }))
  .then(response => response.data)
  .then((data) => handleRequestError(data, config));
}