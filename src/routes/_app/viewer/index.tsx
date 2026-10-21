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
            デモ用データ（INF SP十段）を読み込みました。
            <br />
            <br />
            リアルタイム更新ではないため最新データではない場合があります。
          </p>
        </div>
      )}
    </div>
  );
}
