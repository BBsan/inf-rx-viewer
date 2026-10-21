import { createFileRoute, Outlet } from "@tanstack/react-router";

import TrackListFilter from "@/components/viewer/score/track-filter";

export const Route = createFileRoute("/_app/viewer/score")({
  component: ScoreViewerLayout,
});

function ScoreViewerLayout() {
  return (
    <div className="flex flex-col">
      <TrackListFilter />
      <Outlet />
    </div>
  );
}
