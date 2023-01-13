import request from "../utils/request";

  export function getType(params) {
    return request({
      method: "GET",
      url: `/druid/dict/dictType`,
      params
    });
  }
  export function getCommonList(params) {
    return request({
      method: "GET",
      url: `/druid/dict/commonList`,
      params
    });
  }

  export function getDetail(labelId) {
    return request({
      method: "GET",
      url: `/druid/dict/${labelId}`
    });
  }

  export function creatDictionary(params) {
    return request({
      method: "POST",
      url: '/druid/dict',
      data:params
    });
  }
  export function editDictionary(params) {
    return request({
      method: "PUT",
      url: '/druid/dict',
      data:params
    });
  }
  export function deleteDictionary(id) {
    return request({
      method: "DELETE",
      url: `/druid/dict/${id}`
    });
  }

