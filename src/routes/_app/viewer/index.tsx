import { createFileRoute } from "@tanstack/react-router";
import { useRefluxContext } from "@/contexts/reflux-context";

export const Route = createFileRoute("/_app/viewer/")({
  component: ViewerIndex,
});

function ViewerIndex() {
  const { isDemo } = useRefluxContext();
  return (
    <div className="p-4">
      {isDemo && (
        <div>
          <h3 className="text-3xl">INFORMATION</h3>
          <p className="font-yu p-4">
            デモ用のTSVファイル（製作者、INFINITAS SP十段）を読み込みました。
            <br />
            <br />
            データ更新日: 2026/10/07
          </p>
        </div>
      )}
    </div>
  );
}
