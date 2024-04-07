const { app, BrowserWindow, protocol, ipcMain, dialog } = require("electron");
// eslint-disable-next-line no-unused-vars
const { join, resolve, dirname } = require("path");
// eslint-disable-next-line no-unused-vars
const { exec, spawn } = require("child_process");
// eslint-disable-next-line no-unused-vars
const fs = require("fs");
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);
// 屏蔽安全警告 // ectron Security Warning (Insecure Content-Security-Policy)
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (process.env.NODE_ENV === undefined) {
  if (process.defaultApp) {
    process.env.NODE_ENV = "development";
  } else {
    process.env.NODE_ENV = "production";
  }
}
const isDevelopment = process.env.NODE_ENV !== "production";

let exePath;
// eslint-disable-next-line no-unused-vars
let cwd;
// eslint-disable-next-line prefer-const, no-unused-vars
let exeProcess = null;
// eslint-disable-next-line prefer-const
let data = "";
if (isDevelopment) {
  // 在开发环境中，使用相对路径
  // cwd = join(__dirname, "resource", "server_local");
  // exePath = join(__dirname, "resource", "server_local", "server_local.exe");
  // data = fs.readFileSync(join(__dirname, "resource", "config.txt"), "utf8");
} else {
  // 在打包后的应用中，使用 process.resourcesPath 获取资源文件的路径
  // eslint-disable-next-line no-unused-vars
  // cwd = join(dirname(app.getPath("exe")), "resources", "resource", "server_local");
  // exePath = join(dirname(app.getPath("exe")), "resources", "resource", "server_local", "server_local.exe");
  // data = fs.readFileSync(join(dirname(app.getPath("exe")), "resources", "resource", "config.txt"), "utf8");
}
// exeProcess = spawn(`"${exePath}"`, { encoding: "utf-8", cwd }, (err, stdout, stderr) => {
//   if (err) {
//     console.log("执行的错误: " + err);
//     return;
//   }
//   console.log("stdout: " + stdout);
//   console.error("stderr: " + stderr);
// });
// exeProcess = spawn(exePath, [], { cwd });

// exeProcess.stdout.on("data", data => {
//   console.log(`stdout: ${data}`);
// });

// exeProcess.stderr.on("data", data => {
//   console.error(`stderr: ${data}`);
// });

// exeProcess.on("error", error => {
//   console.log(`执行的错误: ${error.message}`);
// });

// exeProcess.on("exit", (code, signal) => {
//   console.log(`子进程退出，退出码 ${code}，信号 ${signal}`);
// });
// 存储到全局变量中
global.sharedObject = {
  url: data,
  name: "局域网文件互传系统",
  version: "1.0.0",
  exePath,
  environment: isDevelopment ? "development" : "production",
  homePath: app.getPath("home")
};
// if (exeProcess) {
//   exeProcess.on("exit", (code, signal) => {
//     console.log(`子进程已退出，退出码 ${code}，信号 ${signal}`);
//   });
// } else {
//   console.log("子进程未成功启动");
// }
ipcMain.on("get-shared-object", event => {
  event.returnValue = global.sharedObject;
});

const createWindow = async () => {
  const win = new BrowserWindow({
    // 窗口图标
    icon: join(__dirname, "resource/favicon.ico"),
    title: "局域网文件互传",
    width: 1024,
    height: 768,
    show: false,
    resizable: false,
    maximizable: false,
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });
  win.on("ready-to-show", () => {
    win.show();
    // win.maximize();
  });
  let isQuitting = false;

  win.on("close", event => {
    if (!isQuitting) {
      event.preventDefault();
      win.webContents.send("confirm-close");
    }
  });

  ipcMain.on("can-close", () => {
    if (!isQuitting) {
      isQuitting = true;
      // if (exeProcess) {
      //   exeProcess.kill();
      // }
      win.close();
    }
  });
  win.on("closed", () => {
    app.quit();
  });
  // 监听网络状态变化
  ipcMain.on("check-online-status", event => {
    event.returnValue = navigator.onLine;
  });

  // 监听网络连接状态变化
  app.on("online", () => {
    console.log("Online");
    // 在这里执行在线时的操作
    win.webContents.send("online-status-changed", true);
  });

  app.on("offline", () => {
    console.log("Offline");
    // 在这里执行离线时的操作
    win.webContents.send("online-status-changed", false);
  });

  // 加载vue url视本地环境而定，如http://localhost:5173     //
  // win.loadURL('http://localhost:3000')
  // development模式
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL).catch(error => {
      console.error("Failed to load URL:", error);
    });
    // 开启调试台
    // console.log(process.env.VITE_DEV_SERVER_URL);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    win.loadFile(join(__dirname, "dist/index.html"));
    // win.loadFile(`file://${join(__dirname, "index.html")}`);
    // console.log(join(__dirname, "../index.html"), join(__dirname, "dist/index.html"));
    // win.loadFile(join(__dirname, "../index.html"));
  }
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// eslint-disable-next-line no-unused-vars
ipcMain.handle("open-directory-dialog", async event => {
  return await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
});
