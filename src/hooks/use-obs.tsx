import { useCallback, useEffect, useState } from "react";

import OBSConnection, { ConnectionStatus } from "@/lib/obs";

export default function useOBS() {
  const [obs] = useState<OBSConnection>(new OBSConnection());
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  useEffect(() => {
    async function disconnect() {
      await obs.disconnect();
    }
    return () => {
      if (
        obs &&
        obs.getConnectionInfo().status === ConnectionStatus.CONNECTED
      ) {
        disconnect();
      }
    };
  }, []);
  // OBS接続
  const handleConnect = useCallback(
    async (url: string, password: string) => {
      await obs.connect(url, password);
    },
    [obs],
  );
  // OBS切断
  const handleDisconnect = useCallback(async () => {
    await obs.disconnect();
  }, [obs]);
  // 録画トグル
  const toggleRecord = useCallback(async () => {
    const res = await obs.call("ToggleRecord");
    setIsRecording(res.outputActive);
  }, [obs]);
  // ストリーミングトグル
  const toggleStream = useCallback(async () => {
    const res = await obs.call("ToggleStream");
    setIsStreaming(res.outputActive);
  }, [obs]);
  return {
    obs,
    handleConnect,
    handleDisconnect,
    toggleRecord,
    isRecording,
    toggleStream,
    isStreaming,
  };
}
