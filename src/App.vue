<!--
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-03-26 22:34:16
 * @FilePath: /MyTransfer-front/src/App.vue
-->
<template>
  <div>111</div>
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
const { ipcRenderer } = require("electron");
const visible = ref(false);

// 监听electron主进程发送来的close事件
ipcRenderer.on("confirm-close", () => {
  visible.value = true;
});

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send("can-close");
};
</script>

<style scoped lang="scss"></style>
