import { createFileRoute } from "@tanstack/react-router";

import useOBS from "@/hooks/use-obs";
import { ConnectionStatus } from "@/lib/obs";
import useJsonStorage from "@/hooks/use-json-storage";
import { useState } from "react";

export const Route = createFileRoute("/obs/")({
  component: SimpleOBS,
});

function SimpleOBS() {
  const { jsonValue, setJsonValue } = useJsonStorage("obs", {
    url: "",
    obsKey: "",
  });
  const { obs, isRecording, toggleRecord } =
    useOBS();
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined,
  );
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    try {
      if (connectionInfo.status !== ConnectionStatus.CONNECTED) {
        await obs.connect(url, password);
      } else {
        await obs.disconnect();
      }
    } finally {
      setJsonValue({ url: url, obsKey: password });
    }
  }
  async function getOBSView() {
    const res = await obs?.call("GetSourceScreenshot", {
      sourceName: "INFINITAS配信",
      imageFormat: "png",
      imageWidth: 768,
      imageHeight: 432,
    });
    setPreviewImage(res?.imageData);
  }
  const connectionInfo = obs.getConnectionInfo();
  const formIsDisabled = connectionInfo.status === ConnectionStatus.CONNECTING;
  const isOBSConnected = connectionInfo.status === ConnectionStatus.CONNECTED;
  return (
    <main className="w-full h-screen flex justify-center items-center p-2">
      <div>
        {!isOBSConnected && (
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-4"
          >
            <div className="flex flex-row gap-4 justify-between w-100">
              <label htmlFor="obs-url">WebSocket URL</label>
              <input
                type="text"
                id="obs-url"
                name="url"
                className="bg-white text-black"
                autoComplete="off"
                disabled={formIsDisabled}
                defaultValue={jsonValue.url}
              />
            </div>
            <div className="flex flex-row gap-4 justify-between w-100">
              <label htmlFor="obs-password">Password</label>
              <input
                type="password"
                id="obs-password"
                name="password"
                className="bg-white text-black"
                disabled={formIsDisabled}
                defaultValue={jsonValue.obsKey}
              />
            </div>
            <div>
              <button
                className="bg-green-600 px-8 py-2 rounded-md"
                disabled={formIsDisabled}
              >
                CONNECT
              </button>
            </div>
          </form>
        )}
        {isOBSConnected && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-8">
              <div>
                <button
                  onClick={toggleRecord}
                  className={`${!isRecording ? "bg-green-600" : "bg-red-800"} px-8 py-2 rounded-md text-4xl`}
                >
                  {!isRecording ? "Start Recording" : "Stop Recording"}
                </button>
              </div>
              <div>
                {/* <button
                onClick={toggleStream}
                className={`${!isStreaming ? "bg-green-600" : "bg-red-800"} px-8 py-2 rounded-md text-4xl`}
              >
                {!isStreaming ? "Start Streaming" : "Stop Streaming"}
              </button> */}
                封印中
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <button onClick={getOBSView} className="bg-green-600 px-8 py-2 rounded-md text-4xl">
                  GET SCREEN
                </button>
              </div>
              <div className="flex justify-around items-center gap-2">
                <img
                  src={previewImage}
                  alt="OBS Preview"
                  width="768"
                  height="432"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
