import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

import { useRefluxContext } from "@/contexts/reflux-context";
import SideMenu from "@/components/viewer/side-menu";

export const Route = createFileRoute("/_app/viewer")({
  component: ViewerLayout,
});

function ViewerLayout() {
  const navigate = useNavigate();
  const { isTSVLoaded } = useRefluxContext();
  useEffect(() => {
    if (!isTSVLoaded()) {
      navigate({ to: "/", replace: true });
    }
  }, []);
  return (
    <main className="flex flex-row h-[calc(100vh-48px)]">
      <div className="flex flex-col overflow-hidden w-60 h-[calc(100vh-48px)]">
        <SideMenu />
      </div>
      <div className="flex flex-col overflow-hidden w-[calc(100vw-240px)] h-[calc(100vh-48px)]">
        <Outlet />
      </div>
    </main>
  );
}
