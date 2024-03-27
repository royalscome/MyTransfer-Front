/*
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-03-27 19:11:38
 * @FilePath: /MyTransfer-front/src/main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
// import "@/assets/style/reset.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/style/common.scss";

const app = createApp(App);

app.use(ElementPlus).mount("#app");
