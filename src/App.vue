<!--
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-05 21:12:41
 * @FilePath: /MyTransfer-front/src/App.vue
-->
<template>
  <div class="container">
    <header class="container-header">
      <span>设备搜索中</span>
      <video
        :src="searchVideo"
        ref="videoRef"
        style="height: 100%; margin-left: 4px"
        autoplay
        muted
        loop
        :controls="false"
        @ended="handleVideoEnded"
      ></video>
    </header>
    <main class="container-main">
      <div class="device-cell" v-for="(item, index) in deviceList" :key="index" @dragover.prevent @drop="handleDrop">
        <span>ip: {{ item.ip }}</span>
        <span>状态：{{ item.status ? "在线" : "离线" }}</span>
      </div>
    </main>
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
import { ref, onMounted } from "vue";
import WS from "@/utils/websocket";
import searchVideo from "@/assets/video/search_loading.mp4";
import { getDeviceApi } from "@/api";
const { ipcRenderer } = require("electron");
const visible = ref(false);
const videoRef = ref(null);
const deviceList = ref([]);
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

// eslint-disable-next-line no-unused-vars
const createWebSocket = () => {
  ws = new WS({
    ip: "127.0.0.1:1999/ws",
    id: "123"
  });
};
// createWebSocket();
const handleVideoEnded = () => {
  videoRef.value.play();
};

const getDevice = () => {
  getDeviceApi().then(res => {
    console.log(res);
    deviceList.value = [...res.data.device_list, ...res.data.device_list];
  });
};

const handleDrop = e => {
  e.preventDefault();
  const { files } = e.dataTransfer;
  if (files.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    const { path } = files[0];
    console.log(path);
    // 在这里你可以发送文件
  }
};

onMounted(() => {
  getDevice();
  videoRef.value.play();
  setInterval(() => {
    getDevice();
  }, 5000);
});
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
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
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
    box-sizing: border-box;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .device-cell {
      flex-basis: calc(25% - 12px);
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      height: 100px;
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      padding: 8px;
      border-radius: 4px;
      justify-content: space-between;
      margin-right: 12px;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
