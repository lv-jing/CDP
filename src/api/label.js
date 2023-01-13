import request from "../utils/request";

export function generateCode() {
  return request({
    method: "GET",
    url: `/druid/label/code`
  });
}

export function getDict(params) {
  return request({
    method: "GET",
    url: `/druid/dict/list?dictType=${params}`
  });
}
export function getLabelList(params) {
  return request({
    method: "GET",
    url: `/druid/label/list`,
    params
  });
}

export function getDetail(labelId) {
  return request({
    method: "GET",
    url: `/druid/label/statisticsList`,
    params: { labelId }
  });
}

export function createLabel(params) {
  return request({
    method: "POST",
    url: "/druid/label",
    data: params
  });
}
export function editLabel(params) {
  return request({
    method: "PUT",
    url: "/druid/label",
    data: params
  });
}
export function deleteLabel(id) {
  return request({
    method: "DELETE",
    url: `/druid/label/${id}`
  });
}

export function getValueList(params) {
  return request({
    method: "GET",
    url: `/druid/label/statisticsList`,
    params
  });
}

export function getLabelDictionary() {
  return request({
    method: "GET",
    url: `/druid/label/dict/list`
  });
}

export function createCustomerLabel(data) {
  return request({
    method: "POST",
    url: "/druid/label/value",
    data: data
  });
}

export function editCustomerLabel(data) {
  return request({
    method: "PUT",
    url: "/druid/label/value",
    data: data
  });
}

export function deleteCustomerLabel(id) {
  return request({
    method: "DELETE",
    url: "/druid/label/value/" + id
  });
}
