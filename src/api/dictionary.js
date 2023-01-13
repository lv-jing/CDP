import request from "./../utils/request";

export function getDictionary(type) {
  return request({
    method: "GET",
    url: `/druid/dict/commonList`,
    params: { dictType: type, pageNum: 0, pageSize: 10000 }
  });
}

export function getRegion() {
  return request({
    method: "GET",
    url: `/druid/region/list`
  });
}
