/* eslint-disable indent */
/*
 * @Description:
 * @Author: weiyang
 * @Date: 2022-02-08 16:07:47
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-05 20:22:18
 */
import axios from "axios";
import { ElMessage } from "element-plus";
// const { ipcRenderer } = require("electron");

// const sharedObject = ipcRenderer.sendSync("get-shared-object");

// 创建axios实例
// const env = process.env.NODE_ENV;
// const baseURL = sessionStorage.getItem("baseUrl");
const service = axios.create({
  baseURL: "", // api的base_url
  timeout: 20000, // 请求超时时间
  withCredentials: true
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [
  //   function (data) {
  //     /* eslint-disable no-undef */
  //     return jsonlint.parse(data);
  //   }
  // ]
});

// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers["token"] = getToken();
    config.headers["Accept"] = "*/*";
    if (config.mock) {
      config.baseURL = "/mock";
    }
    if (config.formData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    // if (process.env.NODE_ENV === "production") {
    // const baseURL = sessionStorage.getItem("baseUrl");
    // 访问electron中的全局变量
    // console.log(sharedObject);
    // const baseURL = sharedObject.url;
    config.baseURL = "http://localhost:1997"; // 此处写入你要访问的地址，打包后使用
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

const handlerErrorMsg = (message, type = "success", center = true) => {
  ElMessage({
    message,
    type,
    center
  });
};

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log("response:", response);
    if (response.status === 200) {
      if (response.data.code === 200) {
        // act 1:成功且提示；2:成功不提示；其他：错误提示
        if (!response.config.callback) {
          handlerErrorMsg(response.data.result_message);
        }
        return response.data;
        // } else if (response.data.act === 2) {
        //   return response.data;
        // } else {
        //   handlerErrorMsg(response.data.actMsg, "error");
        //   return Promise.reject(response);
        // }
      } else {
        if (!response.config.callback) {
          handlerErrorMsg(response.data.result_message, "error");
        }
        return Promise.reject(response.data);
      }
    }
  },
  error => {
    if (error.name !== "CanceledError") {
      handlerErrorMsg("系统正忙，请稍后再试。。。", "error");
    }
    return Promise.reject(error);
  }
);

export default service;
