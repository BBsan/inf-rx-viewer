import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/UI/header";

export const Route = createRootRoute({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
