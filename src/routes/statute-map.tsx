import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/statute-map")({
  component: () => <Outlet />,
});
