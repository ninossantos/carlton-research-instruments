import { Link } from "@tanstack/react-router";

export function CodeChip({ id }: { id: string }) {
  const slug = id.replace(/\/M$/i, "").toLowerCase();
  return (
    <Link
      to="/codebook/$code"
      params={{ code: slug }}
      className="inline-flex h-9 items-center rounded-full bg-surface-2 px-3 font-mono text-xs text-fg hover:bg-primary-soft hover:text-primary"
    >
      {id}
    </Link>
  );
}
