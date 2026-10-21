import OBSWebSocket, {
  EventSubscription,
  type OBSRequestTypes,
  type OBSResponseTypes,
  type RequestBatchOptions,
  type RequestBatchRequest,
  type ResponseMessage,
} from "obs-websocket-js";

export const ConnectionStatus = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ERROR: "error",
} as const;

export type ConnectionStatus =
  (typeof ConnectionStatus)[keyof typeof ConnectionStatus];

export type ConnectionInfo = {
  status: ConnectionStatus;
  error?: any;
};

export default class OBSConnection {
  private obs: OBSWebSocket;
  private connectionInfo: ConnectionInfo;
  private eventCallbacks: Map<string, Set<Function>>;
  constructor() {
    this.obs = new OBSWebSocket();
    this.connectionInfo = {
      status: ConnectionStatus.DISCONNECTED,
    };
    this.eventCallbacks = new Map();
    this.initListeners();
  }
  private initListeners() {
    // 接続開始
    this.obs.on("ConnectionOpened", () => {
      this.updateConnectionInfo({ status: ConnectionStatus.CONNECTING });
    });
    // 切断
    this.obs.on("ConnectionClosed", (error) => {
      this.updateConnectionInfo({
        status: ConnectionStatus.DISCONNECTED,
        error: error?.message,
      });
    });
    // 接続確立
    this.obs.on("Identified", (data) => {
      this.updateConnectionInfo({
        status: ConnectionStatus.CONNECTED,
        ...data,
      });
    });
    // エラー
    this.obs.on("ConnectionError", (error) => {
      this.updateConnectionInfo({
        status: ConnectionStatus.ERROR,
        error: error?.message || "something went wrong.",
      });
    });
  }
  // コネクション情報の更新
  updateConnectionInfo(info: Partial<ConnectionInfo>) {
    this.connectionInfo = {
      ...this.connectionInfo,
      ...info,
    };
    // 更新をリスナーに通知
    this.notifyEvent("ConnectionStatusChanged", this.connectionInfo);
  }
  // イベントリスナー登録
  on(eventName: string, callback: Function) {
    if (eventName === "ConnectionStatusChanged") {
      if (!this.eventCallbacks.has(eventName)) {
        this.eventCallbacks.set(eventName, new Set());
      }
      this.eventCallbacks.get(eventName)?.add(callback);
      return;
    }
    this.obs.on(eventName as any, (data) => callback(data));
  }
  // イベントリスナー解除
  off(eventName: string, callback: Function) {
    if (eventName === "ConnectionStatusChanged") {
      const callbacks = this.eventCallbacks.get(eventName);
      if (callbacks) {
        callbacks.delete(callback);
      }
      return;
    }
    this.obs.off(eventName as any, callback as any);
  }
  // イベントリスナー発火
  private notifyEvent(eventName: string, data: any) {
    const callbacks = this.eventCallbacks.get(eventName);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (error) {
          console.log(`error in callback <${eventName}>:`, error);
        }
      });
    }
  }
  // 接続情報の提供
  getConnectionInfo(): ConnectionInfo {
    return { ...this.connectionInfo };
  }
  // OBSに接続
  async connect(url: string, password: string) {
    try {
      this.updateConnectionInfo({
        status: ConnectionStatus.CONNECTING,
      });
      const res = await this.obs.connect(url, password, {
        eventSubscriptions: EventSubscription.All,
        rpcVersion: 1,
      });
      this.updateConnectionInfo({
        status: ConnectionStatus.CONNECTED,
        ...res,
      });
      return { ...this.connectionInfo };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.updateConnectionInfo({
        status: ConnectionStatus.ERROR,
        error: message || "something went wrong.",
      });
      throw error;
    }
  }
  // OBSから切断
  async disconnect(): Promise<void> {
    this.updateConnectionInfo({
      status: ConnectionStatus.CONNECTING,
    });
    await this.obs.disconnect();
    this.updateConnectionInfo({
      status: ConnectionStatus.DISCONNECTED,
    });
  }
  // OBSへリクエスト送信
  async call<T extends keyof OBSRequestTypes>(
    reqType: T,
    reqData?: OBSRequestTypes[T],
  ): Promise<OBSResponseTypes[T]> {
    if (this.connectionInfo.status !== ConnectionStatus.CONNECTED) {
      throw new Error("Connection not found.");
    }
    return this.obs.call(reqType, reqData);
  }
  async callBatch(
    requests: RequestBatchRequest[],
    options?: RequestBatchOptions,
  ): Promise<ResponseMessage[]> {
    if (this.connectionInfo.status !== ConnectionStatus.CONNECTED) {
      throw new Error("Connection not found.");
    }
    return this.obs.callBatch(requests, options);
  }
}
