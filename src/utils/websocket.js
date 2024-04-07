class WS {
  timeObj = null;
  lockReconnect = false;
  tt = null;
  scoket = null;
  timeoutObj = null;
  serverTimeoutObj = null;
  num = 3;
  timeout = 3000;
  constructor(configuration) {
    this.configuration = configuration;
    // eslint-disable-next-line no-unused-vars
    const { ip, id } = this.configuration;
    this.url = `ws://${ip}`;
    this.onOpenCallbacks = [];
    this.onErrorCallbacks = [];
    this.onMessageCallbacks = [];
    this.onCloseCallbacks = [];
    this.createWebscoket();
  }
  createWebscoket() {
    try {
      this.scoket = new WebSocket(this.url);
      this.init();
    } catch (error) {
      console.log("catch:", error);
      this.reconnect();
    }
  }
  start() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      this.scoket.send(
        JSON.stringify({
          send_name: this.configuration.id,
          type: "heartCheck"
        })
      );
      if (this.num === 0) {
        this.scoket.close();
      }
    }, this.timeout);
  }
  reconnect() {
    if (this.lockReconnect) {
      return;
    }
    this.lockReconnect = true;
    // 没链接上回一直重连，设置延迟避免请求过多
    this.tt && clearTimeout(this.tt);
    this.tt = setTimeout(() => {
      this.createWebscoket();
      this.lockReconnect = false;
    }, 4000);
  }
  onClose(callback) {
    this.onCloseCallbacks.push(callback);
  }
  onError(callback) {
    this.onErrorCallbacks.push(callback);
  }
  onOpen(callback) {
    this.onOpenCallbacks.push(callback);
  }
  onMessage(callback) {
    this.onMessageCallbacks.push(callback);
  }
  send(message) {
    if (this.scoket.readyState === WebSocket.OPEN) {
      this.scoket.send(JSON.stringify(message));
    }
  }
  init() {
    const that = this;
    this.scoket.onclose = function (event) {
      console.log("close", event);
      that.onCloseCallbacks?.forEach(callback => {
        callback(event);
      });
      that.reconnect();
    };
    this.scoket.onerror = function (event) {
      console.log("error", event);
      that.onErrorCallbacks?.forEach(callback => {
        callback(event);
      });
      that.reconnect();
    };
    this.scoket.onopen = function (event) {
      console.log("open", event);
      // 开始心跳检测
      that.start();
      that.onOpenCallbacks?.forEach(callback => {
        callback(event);
      });
    };
    this.scoket.onmessage = function (event) {
      that.onMessageCallbacks?.forEach(callback => {
        callback(event);
      });
      that.start();
    };
  }
}

export default WS;
