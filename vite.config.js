/*
 * @Date: 2024-03-26 21:38:43
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-03-26 22:18:13
 * @FilePath: /MyTransfer-front/vite.config.js
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import viteEslint from "vite-plugin-eslint";
import { uglify } from "rollup-plugin-uglify";

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };
  return defineConfig({
    plugins: [
      vue(),
      viteEslint({
        failOnError: false
      }),
      electron({
        // 主进程入口文件
        entry: "background.js"
      })
    ],
    build: {
      rollupOptions: {
        plugins: [
          {
            ...uglify({
              compress: {
                drop_console: false,
                drop_debugger: false
              }
            })
          }
        ]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/style/common.scss";`
        }
      }
    },
    clearScreen: false,
    server: {
      host: process.env.VITE_APP_HOST,
      port: process.env.VITE_APP_PORT,
      open: false,
      proxy: {
        "/api": {
          target: process.env.VITE_APP_API,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  });
};
