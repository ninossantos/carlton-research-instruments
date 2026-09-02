import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/statute-map/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/observatory/$id",
      params: { id: params.id },
    });
  },
  component: () => null,
});
