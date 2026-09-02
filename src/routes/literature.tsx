import { createFileRoute, Link } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";
import { CodeChip } from "@/components/document-nav";
import { literature, literatureKinds } from "@/lib/data/literature";

export const Route = createFileRoute("/literature")({ component: Literature });

function Literature() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Tied to behaviors</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Coercive Control Literature Map</h1>
      <p className="mt-4 text-lg text-muted">
        Inclusion here is not inclusive of all global peer-reviewed coercive control literature.
      </p>

      {literatureKinds.map((kind) => {
        const items = literature.filter((s) => s.kind === kind.id && (s.families?.length || s.id === "carlton-codebook"));
        if (items.length === 0) return null;
        return (
          <section key={kind.id} className="mt-12">
            <h2 className="font-display text-2xl">{kind.name}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {items.map((s) => (
                <li key={s.id} className="py-5">
                  <p className="leading-snug text-fg">{s.cite}</p>
                  <p className="mt-2 text-sm text-muted">{s.why}</p>
                  {s.families && s.families.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.families.map((f) => (
                        <li key={f}>
                          <CodeChip id={f} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-8 text-sm">
        <Link to="/codebook" className="text-primary hover:underline">
          Coercive Control Field Check
        </Link>
      </p>
      <CiteBlock
        className="mt-6"
        title="Coercive Control Literature Map"
        path="/literature"
        lastReviewed="August 31, 2026"
      />
    </main>
  );
}
