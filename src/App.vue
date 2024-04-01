<!--
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-01 22:13:35
 * @FilePath: /MyTransfer-front/src/App.vue
-->
<template>
  <div class="container">
    <header class="container-header">设备搜索状态栏</header>
    <main class="container-main">设备区域</main>
    <footer class="container-footer">
      <div class="circle"></div>
      <span>online</span>
    </footer>
  </div>
  <el-dialog v-model="visible" title="是否退出系统" width="500">
    <span>是否确认退出系统</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="closeWindow"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import WS from "@/utils/websocket";
const { ipcRenderer } = require("electron");
const visible = ref(false);
// eslint-disable-next-line no-unused-vars
let ws = null;

// 监听electron主进程发送来的close事件
ipcRenderer.on("confirm-close", () => {
  visible.value = true;
});

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send("can-close");
};

const createWebSocket = () => {
  ws = new WS({
    ip: "127.0.0.1:2000/ws",
    id: "123"
  });
};
createWebSocket();
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  position: relative;
  .container-header {
    width: 100%;
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    z-index: 10;
  }
  .container-footer {
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 -4px 5px -2px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    z-index: 10;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #67c23a;
      margin-right: 12px;
    }
  }
  .container-main {
    width: 100%;
    height: 0;
    flex: 1;
    background-color: #fff;
    line-height: 50px;
  }
}
</style>
