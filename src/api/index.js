/*
 * @Date: 2024-04-05 11:42:48
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-05 20:24:37
 * @FilePath: /MyTransfer-front/src/api/index.js
 */
import request from "@/utils/request";

export const getDeviceApi = () => {
  return request({
    url: "/getDevices",
    method: "get",
    callback: true
  });
};
