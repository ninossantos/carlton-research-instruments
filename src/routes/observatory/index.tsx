import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CiteBlock } from "@/components/cite-block";
import { StatusChip } from "@/components/status-chip";
import {
  intlJurisdictions,
  isNamed,
  jurisdictions,
  primaryStatus,
  usJurisdictions,
} from "@/lib/data/jurisdictions";
import type { Jurisdiction, Recognition } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/observatory/")({ component: Observatory });

const filters: { id: "all" | "named" | "related" | "silent" | "intl"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "named", label: "Named" },
  { id: "related", label: "Related" },
  { id: "silent", label: "Silent" },
  { id: "intl", label: "International" },
];

function Observatory() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const rows = useMemo(() => {
    let list = jurisdictions;
    if (filter === "named") list = list.filter(isNamed);
    if (filter === "related") list = list.filter((j) => primaryStatus(j) === "related" || j.recognition.includes("pending"));
    if (filter === "silent") list = list.filter((j) => primaryStatus(j) === "silent");
    if (filter === "intl") list = intlJurisdictions();
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (j) =>
          j.name.toLowerCase().includes(query) ||
          j.abbr.toLowerCase().includes(query) ||
          j.statusLabel.toLowerCase().includes(query),
      );
    }
    return list;
  }, [q, filter]);

  const matchIds = useMemo(() => new Set(rows.map((j) => j.id)), [rows]);
  const usBoard = useMemo(
    () => usJurisdictions().slice().sort((a, b) => a.abbr.localeCompare(b.abbr)),
    [],
  );
  const intlBoard = useMemo(
    () => intlJurisdictions().slice().sort((a, b) => a.abbr.localeCompare(b.abbr)),
    [],
  );
  const usMatchCount = usBoard.filter((j) => matchIds.has(j.id)).length;
  const intlMatchCount = intlBoard.filter((j) => matchIds.has(j.id)).length;
  const namedCount = jurisdictions.filter(isNamed).length;
  const showIntlBoard = filter === "intl" || filter === "all" || intlMatchCount > 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Forums</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Coercive Control Observatory</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        A living orientation to what forums name, imply, or omit. Last reviewed August 31, 2026.
        Cards marked orientation-only are not for citation as law.
      </p>
      <p className="mt-3 text-sm text-fg">
        {namedCount} named forums in this build · {usJurisdictions().length} U.S. entries ·{" "}
        {intlJurisdictions().length} international
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="obs-search">
          Search jurisdictions
        </label>
        <input
          id="obs-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a state, country, or postal code"
          className="h-12 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 text-base text-fg placeholder:text-faint sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`h-10 rounded-full px-3 text-sm ${
                filter === f.id ? "bg-fg text-bg" : "bg-surface-2 text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {rows.length} {rows.length === 1 ? "forum" : "forums"}
        {filter !== "all" ? ` · ${filters.find((f) => f.id === filter)?.label}` : ""}
        {q.trim() ? ` · “${q.trim()}”` : ""}
      </p>

      {filter !== "intl" ? (
        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">
            United States · {usMatchCount} of {usBoard.length}
          </h2>
          <div className="mt-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {usBoard.map((j) => (
              <BoardCell key={j.id} j={j} active={matchIds.has(j.id)} />
            ))}
          </div>
        </section>
      ) : null}

      {showIntlBoard ? (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">
            International · {intlMatchCount} of {intlBoard.length}
          </h2>
          <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
            {intlBoard.map((j) => (
              <BoardCell key={j.id} j={j} active={matchIds.has(j.id)} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Dossiers</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {rows.map((j) => (
            <li key={j.id}>
              <Link
                to="/observatory/$id"
                params={{ id: j.id }}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-display text-xl text-fg">{j.name}</p>
                  <p className="mt-1 text-sm text-muted">{j.statusLabel}</p>
                </div>
                <StatusChip status={primaryStatus(j)} />
              </Link>
            </li>
          ))}
        </ul>
        {rows.length === 0 ? (
          <p className="py-8 text-muted">No jurisdictions match that search.</p>
        ) : null}
      </section>

      <div className="mt-12">
        <CiteBlock
          title="Coercive Control Observatory"
          path="/observatory"
          lastReviewed="August 31, 2026"
        />
      </div>
    </main>
  );
}

function BoardCell({ j, active }: { j: Jurisdiction; active: boolean }) {
  const status = primaryStatus(j);
  return (
    <Link
      to="/observatory/$id"
      params={{ id: j.id }}
      title={j.name}
      aria-disabled={!active}
      className={cn(
        "flex h-11 items-center justify-center rounded-[var(--radius-sm)] text-sm font-medium tabular-nums transition-opacity duration-150",
        chip(status),
        active ? "opacity-100" : "pointer-events-none opacity-20",
      )}
    >
      {j.abbr}
    </Link>
  );
}

function chip(status: Recognition) {
  if (status.startsWith("named")) return "bg-primary text-primary-fg";
  if (status === "related") return "bg-surface-2 text-related";
  if (status === "pending") return "bg-surface-2 text-pending";
  return "bg-surface text-faint shadow-[var(--shadow-border)]";
}
