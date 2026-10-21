import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import TSVFileInput from "@/components/tsv-file-input";
import LoadingPanel from "@/components/loading-panel";
import { useRefluxContext } from "@/contexts/reflux-context";

export const Route = createFileRoute("/_app/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { isLoading, isTSVLoaded } = useRefluxContext();
  useEffect(() => {
    if (!isLoading && isTSVLoaded()) {
      navigate({ to: "/viewer", replace: true });
    }
  }, [isLoading]);
  let contents = <TSVFileInput />;
  if (isLoading) {
    contents = <LoadingPanel />;
  }
  return (
    <main className="flex justify-center items-center p-2">{contents}</main>
  );
}
