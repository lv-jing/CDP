import request from "../utils/request";

export function login(data) {
  return request({
    method: "POST",
    url: "/druid/loginCdp",
    data: data
  });
}


export function register(data) {
    return request({
      method: "POST",
      url: "/druid/register",
      data: data
    });
  }

  export function sendEmail(params) {
    return request({
      method: "POST",
      url: "/druid/cdp/sendForgetEmail",
      params
    });
  }

  export function changePassword(data) {
    return request({
      method: "POST",
      url: "/druid/cdp/modifyPwd",
      data: data
    });
  }
