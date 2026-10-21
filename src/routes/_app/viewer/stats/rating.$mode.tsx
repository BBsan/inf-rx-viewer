import { createFileRoute } from '@tanstack/react-router'

import { useRefluxContext } from '@/contexts/reflux-context';
import { ByLevelTable } from '@/components/viewer/stats/tables';

export const Route = createFileRoute('/_app/viewer/stats/rating/$mode')({
  component: ByLevelStatsPage,
})

function ByLevelStatsPage() {
  const { mode } = Route.useParams();
  const { stats } = useRefluxContext();
  return (
    <div className="flex flex-col gap-4 content-start items-start p-4 pb-60 select-none overflow-y-auto">
      <h3 className="text-4xl">By Level</h3>
      <ByLevelTable mode={mode} data={stats} />
    </div>
  );
}
