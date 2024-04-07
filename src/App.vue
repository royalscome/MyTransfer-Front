<!--
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-04-07 20:15:34
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
      <div
        class="device-cell"
        v-for="(item, index) in deviceList"
        :key="index"
        @dragover.prevent
        @drop="handleDrop($event, item)"
      >
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
  <el-dialog
    v-model="confirmVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="消息"
    width="500"
  >
    <span>是否接受 {{ fileName }} 文件？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refuseFile">拒绝</el-button>
        <el-button type="primary" @click="acceptFile"> 接受 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WS from "@/utils/websocket";
import searchVideo from "@/assets/video/search_loading.mp4";
import { getDeviceApi, sendMessageApi } from "@/api";
const { ipcRenderer } = require("electron");
const visible = ref(false);
const videoRef = ref(null);
const deviceList = ref([]);
const fileName = ref("");
const confirmVisible = ref(false);
let nowDropItem = null;
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
  ws.onMessage(e => {
    // console.log(e);
    const data = JSON.parse(e.data);
    if (data.type === "confirm") {
      // console.log(data);
      fileName.value = data.name;
      confirmVisible.value = true;
    }
  });
};
// createWebSocket();
const handleVideoEnded = () => {
  videoRef.value.play();
};

const getDevice = () => {
  getDeviceApi().then(res => {
    // console.log(res);
    deviceList.value = res.data.device_list;
  });
};

const handleDrop = (e, item) => {
  nowDropItem = item;
  e.preventDefault();
  const { files } = e.dataTransfer;
  if (files.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    const { path, name } = files[0];
    console.log(path, name, item);
    const message = JSON.stringify({
      type: 0,
      message: JSON.stringify({
        type: "confirm",
        name,
        path
      })
    });
    // 在这里你可以发送文件
    const data = {
      address: item.ip + ":" + item.port,
      message
    };
    // eslint-disable-next-line no-unused-vars
    sendMessageApi(data).then(res => {
      // console.log(res);
    });
    ws.send({
      type: "start",
      path
    });
  }
};

const refuseFile = () => {
  const message = JSON.stringify({
    type: 2,
    message: ""
  });
  const data = {
    address: nowDropItem.ip + ":" + nowDropItem.port,
    message
  };
  sendMessageApi(data);
  confirmVisible.value = false;
};
// 同意接收文件，并且同时选择文件路径
const acceptFile = async () => {
  const result = await ipcRenderer.invoke("open-directory-dialog");
  if (result.canceled) {
    console.log("User canceled the dialog");
  } else {
    console.log("Selected directory:", result.filePaths[0]);
    // 在这里你可以使用选择的路径
  }
  const message = JSON.stringify({
    type: 1,
    message: ""
  });
  const data = {
    address: nowDropItem.ip + ":" + nowDropItem.port,
    message
  };
  sendMessageApi(data);
  ws.send({
    type: "keep",
    path: result.filePaths[0] + "/" + fileName.value
  });
  // confirmVisible.value = false;
};

onMounted(() => {
  getDevice();
  videoRef.value.play();
  setTimeout(() => {
    createWebSocket();
  }, 2000);
  setInterval(() => {
    // getDevice();
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
