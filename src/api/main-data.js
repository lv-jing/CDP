import request from "./../utils/request";

export function getMainData(params) {
  return request({
    method: "GET",
    url: `/druid/product/list`,
    params: params
  });
}
