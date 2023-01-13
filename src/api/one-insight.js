import request from "../utils/request";

export function getPagedConsumers(parmeter) {
  return request({
    method: "GET",
    url: "/druid/member/list",
    params: parmeter
  });
}

export function getConsumersDetail(id) {
  return request({
    method: "GET",
    url: `/druid/member/${id}`
  });
}

export function getLableData(parmeter) {
  return request({
    method: "GET",
    url: `/druid/portrait/list`,
    params: parmeter
  });
}

export function getValueMarketData(id) {
  return request({
    method: "GET",
    url: `/druid/behaviorPortrait/list/${id}`
  });
}
export function getSummarizeData(parmeter) {
  return request({
    method: "GET",
    url: `/druid/summarize/list`,
    params: parmeter
  });
}

export function getPagedOrder(parmeter) {
  return request({
    method: "GET",
    url: "/druid/orderHistory/list",
    params: parmeter
  });
}

export function getPagedOrderDetail(parmeter) {
  return request({
    method: "GET",
    url: "/druid/order/list",
    params: parmeter
  });
}

export function getEquityList(parmeter) {
  return request({
    method: "GET",
    url: "/druid/hierarchical/equity/list",
    params: parmeter
  });
}
