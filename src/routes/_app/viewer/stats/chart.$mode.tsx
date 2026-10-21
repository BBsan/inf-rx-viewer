import { createFileRoute } from "@tanstack/react-router";

import { useRefluxContext } from "@/contexts/reflux-context";
import { ByChartTable } from "@/components/viewer/stats/tables";

export const Route = createFileRoute("/_app/viewer/stats/chart/$mode")({
  component: ByChartStatsPage,
});

function ByChartStatsPage() {
  const { mode } = Route.useParams();
  const { stats } = useRefluxContext();
  return (
    <div className="flex flex-col gap-4 content-start items-start p-4 select-none overflow-y-auto">
      <h3 className="text-4xl">By Chart Difficulty</h3>
      <ByChartTable mode={mode} data={stats} />
    </div>
  );
}
