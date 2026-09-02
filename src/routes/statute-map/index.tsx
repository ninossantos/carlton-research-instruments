import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/statute-map/")({
  beforeLoad: () => {
    throw redirect({ to: "/observatory" });
  },
  component: () => null,
});
