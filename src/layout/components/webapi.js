import request from '../../utils/request'

export function logout() {
  return request({
    method: 'get',
    url: '/logout',
  });
}