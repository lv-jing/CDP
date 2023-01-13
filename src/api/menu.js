import request from "../utils/request";

export function getMenus() {
    return request({
      method: "GET",
      url: `/druid/system/menu/list`
    });
}