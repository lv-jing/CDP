import request from "../utils/request";

export function getPagedGroups(parmeter) {
  return request({
    method: "GET",
    url: "/druid/customerInsight/list",
    params: parmeter
  });
}

export function getGroupsPortrait(id) {
  return request({
    method: "GET",
    url: `/druid/group/portrait/list/${id}`
  });
}

export function getCustomerInsight(id) {
  return request({
    method: "GET",
    url: `/druid/customerInsight/${id}`
  });
}

export function getGroupsBehaviorPortrait(id) {
  return request({
    method: "GET",
    url: `/druid/group/behavior/portrait/list/${id}`
  });
}

export function addGroup(data) {
  return request({
    method: "POST",
    url: "/druid/customerInsight",
    data: data
  });
}

export function editGroup(data) {
  return request({
    method: "PUT",
    url: "/druid/customerInsight",
    data: data
  });
}

export function deleteGroup(id) {
  return request({
    method: "DELETE",
    url: `/druid/customerInsight/${id}`
  });
}

export function exportData(id) {
  return request({
    method: "POST",
    url: `/druid/customerInsightDownload/export?id=${id}`,
    responseType: 'blob'
  });
}
