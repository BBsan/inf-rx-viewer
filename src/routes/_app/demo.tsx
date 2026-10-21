import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import LoadingPanel from "@/components/loading-panel";
import { useRefluxContext } from "@/contexts/reflux-context";

export const Route = createFileRoute("/_app/demo")({
  component: DemoPage,
});

function DemoPage() {
  const navigate = useNavigate();
  const { isLoading, isTSVLoaded, loadDemoData } = useRefluxContext();
  useEffect(() => {
    loadDemoData();
  }, [])
  useEffect(() => {
    if (!isLoading && isTSVLoaded()) {
      navigate({ to: "/viewer", replace: true });
    }
  }, [isLoading]);
  
  return (
    <main className="flex justify-center items-center p-2">
      <LoadingPanel />
    </main>
  );
}
