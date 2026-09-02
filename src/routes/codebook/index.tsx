import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CiteBlock } from "@/components/cite-block";
import { Disclaimer } from "@/components/disclaimer";
import { CODEBOOK_TITLE, allSubcodes, categories, searchCodes } from "@/lib/data/codes";

export const Route = createFileRoute("/codebook/")({ component: Codebook });

function Codebook() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchCodes(q), [q]);
  const searching = q.trim().length > 0;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{CODEBOOK_TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        59 behaviors in 15 families, drawn from{" "}
        <em>The Codebook for Identifying Coercive Control in Longitudinal Artifacts</em>. A
        behavioral match does not constitute a pattern as defined by law.
      </p>

      <label className="mt-8 block">
        <span className="text-xs uppercase tracking-[0.16em] text-faint">Enter a behavior here to search</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="He took my phone, using the children, love bombing"
          className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 text-base text-fg placeholder:text-faint"
          autoComplete="off"
        />
      </label>

      {searching ? (
        <section className="mt-8">
          <p className="text-sm text-muted">
            {hits.length} {hits.length === 1 ? "behavior" : "behaviors"}
          </p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {hits.map((c) => (
              <li key={c.id}>
                <Link to="/codebook/$code" params={{ code: c.slug }} className="block py-4">
                  <p className="font-mono text-xs text-primary">{c.id}</p>
                  <h2 className="mt-1 font-display text-xl">{c.name}</h2>
                  <p className="mt-1 text-sm text-muted">{c.definition}</p>
                </Link>
              </li>
            ))}
          </ul>
          {hits.length === 0 ? (
            <p className="py-8 text-muted">
              Nothing here matches that wording. Try a shorter cue, such as phone, money, children,
              or threats. A missed phrase is not a finding that the conduct is not control, and not
              a finding that the conduct is control.
            </p>
          ) : null}
        </section>
      ) : (
        <section className="mt-12">
          <ul className="space-y-8">
            {categories.map((cat) => (
              <li key={cat.id} className="border-t border-border pt-5">
                <Link to="/codebook/$code" params={{ code: cat.slug }}>
                  <p className="font-mono text-xs text-faint">
                    {String(cat.number).padStart(2, "0")} · {cat.id}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-fg hover:text-primary">{cat.name}</h2>
                </Link>
                <p className="mt-2 text-sm text-muted">{cat.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cat.subcodes.map((s) => (
                    <li key={s.id}>
                      <Link
                        to="/codebook/$code"
                        params={{ code: s.slug }}
                        className="inline-flex h-9 items-center rounded-full bg-surface-2 px-3 font-mono text-xs text-fg"
                      >
                        {s.id}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12">
        <Disclaimer behavior extra="Looking something up is literacy. Applying an instrument to a real file is a forensic engagement, and that is not this page." />
        <CiteBlock className="mt-8" title={CODEBOOK_TITLE} path="/codebook" lastReviewed="August 31, 2026" />
      </div>
    </main>
  );
}
