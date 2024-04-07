/*
 * @Date: 2024-04-05 11:42:48
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-07 09:37:34
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

export const sendMessageApi = data => {
  return request({
    url: "/sendMessage",
    data,
    method: "post",
    callback: true
  });
};
