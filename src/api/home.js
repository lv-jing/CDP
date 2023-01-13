import request from "../utils/request";

export function getHomeData(params) {
  return request({
    method: "GET",
    url: `/druid/homepage/list`,
    params
  });
}

export function getTrendData(params) {
  return request({
    method: "GET",
    url: `/druid/homepage/trend/list`,
    params
  });
}

export function getSearchData(params) {
  return request({
    method: "GET",
    url: `/druid/homepage/search/list`,
    params
  });
}
