import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

import { RefluxContextProvider } from "./contexts/reflux-context.tsx";
import NotFound from "./components/not-found.tsx";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
  basepath: "/inf-rx-viewer/"
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RefluxContextProvider>
      <RouterProvider router={router} />
    </RefluxContextProvider>
  </StrictMode>,
);
