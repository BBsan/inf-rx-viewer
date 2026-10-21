import { createFileRoute } from "@tanstack/react-router";

import { useRefluxContext } from "@/contexts/reflux-context";
import { TotalTable } from "@/components/viewer/stats/tables";

export const Route = createFileRoute("/_app/viewer/stats/total/$mode")({
  component: TotalStatsPage,
});

function TotalStatsPage() {
  const { mode } = Route.useParams();
  const { stats } = useRefluxContext();
  return (
    <div className="flex flex-col gap-4 content-start items-start p-4 select-none overflow-y-auto">
      <h3 className="text-4xl">Total Stats</h3>
      <TotalTable mode={mode} data={stats} />
    </div>
  );
}
