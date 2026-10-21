import { createFileRoute } from "@tanstack/react-router";

import TrackList from "@/components/viewer/score/track-list";

export const Route = createFileRoute(
  "/_app/viewer/score/$mode/{-$rating}/{-$difficulty}/{-$lamp}/{-$letter}/{-$title}",
)({
  component: ScoreViewerPage,
});

function ScoreViewerPage() {
  return <TrackList />;
}
