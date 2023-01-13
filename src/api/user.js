import request from "../utils/request";

export function getUsers(params) {
    return request({
      method: "GET",
      url: `/druid/system/user/list`,
      params
    });
}

export function addUsers(user) {
    return request({
      method: "POST",
      url: `/druid/system/user`,
      data: user
    });
}

export function editUsers(user) {
    return request({
      method: "PUT",
      url: `/druid/system/user`,
      data: user
    });
}

export function deleteUsers(id) {
    return request({
      method: "DELETE",
      url: `/druid/system/user/${id}`
    });
}

export function getDepartments() {
  return request({
    method: "GET",
    url: `/druid/system/dept/list`
  });
} 

export function addDepartment(department) {
  return request({
    method: "POST",
    url: `/druid/system/dept`,
    data: department
  });
}

export function editDepartment(department) {
  return request({
    method: "PUT",
    url: `/druid/system/dept`,
    data: department
  });
}

export function deleteDepartment(id) {
  return request({
    method: "DELETE",
    url: `/druid/system/dept/${id}`
  });
}

export function getRoles(params) {
  return request({
    method: "GET",
    url: `/druid/system/role/list`,
    params
  });
} 

export function addRole(role) {
  return request({
    method: "POST",
    url: `/druid/system/role`,
    data: role
  });
}

export function setRole(data) {
  return request({
    method: "PUT",
    url: `/druid/system/role/menuEdit`,
    data: data
  });
}

export function editRole(role) {
  return request({
    method: "PUT",
    url: `/druid/system/role/roleEdit`,
    data: role
  });
}

export function deleteRole(id) {
  return request({
    method: "DELETE",
    url: `/druid/system/role/${id}`
  });
}