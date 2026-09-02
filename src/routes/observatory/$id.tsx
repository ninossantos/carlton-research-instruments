import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";
import { StatusChip } from "@/components/status-chip";
import { familiesForForum } from "@/lib/data/document";
import { confidenceLabels, getJurisdiction } from "@/lib/data/jurisdictions";

export const Route = createFileRoute("/observatory/$id")({
  loader: ({ params }) => {
    const j = getJurisdiction(params.id);
    if (!j) throw notFound();
    return { jurisdiction: j };
  },
  component: Dossier,
});

function Dossier() {
  const { jurisdiction: j } = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-sm">
        <Link to="/observatory" className="text-primary hover:underline">
          Coercive Control Statute Map
        </Link>
        {j.abbr !== j.name ? (<span className="text-faint"> / {j.abbr}</span>) : null}
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight">{j.name}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {j.recognition.map((r) => (
          <StatusChip key={r} status={r} />
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        {j.statusLabel} · {confidenceLabels[j.confidence]} · Last reviewed {j.lastReviewed}
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl">What “pattern” means here</h2>
        <p className="mt-3 leading-relaxed text-fg">{j.patternLanguage}</p>
      </section>

      {j.statutes.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Statutes</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {j.statutes.map((s) => (
              <li key={s.cite} className="py-4">
                <p className="font-medium text-fg">{s.cite}</p>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
          {familiesForForum(j.id).length > 0 ? (
            <div className="mt-6">
              <p className="text-sm leading-relaxed text-muted">
                {j.statutes[0].cite} names these behaviors. The labels are codes, not statutes.
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {familiesForForum(j.id).map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/codebook/$code"
                      params={{ code: c.slug }}
                      className="inline-flex h-9 items-center gap-2 rounded-full bg-surface-2 px-3 text-xs text-fg hover:text-primary"
                    >
                      <span className="font-mono">{c.id}</span>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Statutes</h2>
          <p className="mt-3 text-muted">No independently named statute located for this orientation.</p>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl">Expert standard</h2>
        <p className="mt-3 leading-relaxed text-fg">{j.expertStandard}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">What Carlton Research can speak to</h2>
        <p className="mt-3 leading-relaxed text-fg">{j.methodFit}</p>
        {j.notes ? <Note text={j.notes} /> : null}
      </section>

      {j.carltonBrief ? (
        <p className="mt-8">
          <a href={j.carltonBrief.href} className="text-primary hover:underline">
            Carlton brief: {j.carltonBrief.title}
          </a>
        </p>
      ) : null}

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://carltonresearch.com/contact/"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-primary px-5 text-sm font-medium text-primary-fg"
        >
          Request a case review
        </a>
        <Link
          to="/case-fit"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-surface px-5 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
        >
          Run the case-fit primer
        </Link>
      </div>

      <div className="mt-12">
        <CiteBlock
          title={`Coercive Control Statute Map: ${j.name}`}
          path={`/observatory/${j.id}`}
          lastReviewed={j.lastReviewed}
        />
      </div>
    </main>
  );
}

function Note({ text }: { text: string }) {
  const deep = text.match(/^Deep dossier\.\s*([\s\S]+)$/);
  if (deep) {
    return (
      <p className="mt-3 leading-relaxed text-muted">
        <span className="font-semibold text-fg">Deep dossier:</span> {deep[1]}
      </p>
    );
  }
  return <p className="mt-3 leading-relaxed text-muted">{text}</p>;
}

