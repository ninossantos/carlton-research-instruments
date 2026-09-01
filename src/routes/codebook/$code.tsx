import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";
import { Disclaimer } from "@/components/disclaimer";
import { CodeChip } from "@/components/document-nav";
import { CODEBOOK_TITLE, getCategory, getSubcode, type Subcode } from "@/lib/data/codes";
import { forumsForFamily, literatureForFamily } from "@/lib/data/document";

export const Route = createFileRoute("/codebook/$code")({
  loader: ({ params }) => {
    const slug = params.code.toLowerCase();
    const subcode = getSubcode(slug);
    if (subcode) return { kind: "subcode" as const, subcode };
    const category = getCategory(slug);
    if (category) return { kind: "category" as const, category };
    throw notFound();
  },
  component: CodePage,
});

function CodePage() {
  const data = Route.useLoaderData();
  if (data.kind === "category") return <CategoryPage />;
  return <SubcodePage subcode={data.subcode} />;
}

function CategoryPage() {
  const data = Route.useLoaderData();
  if (data.kind !== "category") return null;
  const cat = data.category;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-sm">
        <Link to="/codebook" className="text-primary hover:underline">
          {CODEBOOK_TITLE}
        </Link>
        <span className="text-faint"> / {cat.id}</span>
      </p>
      <p className="mt-4 font-mono text-xs text-faint">
        Category {String(cat.number).padStart(2, "0")}
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{cat.name}</h1>
      <p className="mt-4 text-lg text-muted">{cat.blurb}</p>
      <p className="mt-3 text-sm text-muted">{cat.literature}</p>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {cat.subcodes.map((s) => (
          <li key={s.id}>
            <Link to="/codebook/$code" params={{ code: s.slug }} className="block py-5">
              <p className="font-mono text-xs text-primary">{s.id}</p>
              <h2 className="mt-1 font-display text-2xl">{s.name}</h2>
              <p className="mt-2 text-sm text-muted">{s.definition}</p>
            </Link>
          </li>
        ))}
      </ul>
      <RelatedLiterature familyId={cat.id} />
      <div className="mt-12">
        <Disclaimer behavior />
        <CiteBlock
          className="mt-8"
          title={`${CODEBOOK_TITLE}: ${cat.id} ${cat.name}`}
          path={`/codebook/${cat.slug}`}
          lastReviewed="August 31, 2026"
        />
      </div>
    </main>
  );
}

function SubcodePage({ subcode }: { subcode: Subcode }) {
  const cat = getCategory(subcode.categoryId);

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-sm">
        <Link to="/codebook" className="text-primary hover:underline">
          {CODEBOOK_TITLE}
        </Link>
        {cat ? (
          <>
            <span className="text-faint"> / </span>
            <Link to="/codebook/$code" params={{ code: cat.slug }} className="text-primary hover:underline">
              {cat.id}
            </Link>
          </>
        ) : null}
        <span className="text-faint"> / {subcode.id}</span>
      </p>
      <p className="mt-4 font-mono text-sm text-primary">{subcode.id}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{subcode.name}</h1>

      <section className="mt-10">
        <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Definition</h2>
        <p className="mt-3 text-lg leading-relaxed">{subcode.definition}</p>
      </section>
      {subcode.how ? (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">How it operates</h2>
          <p className="mt-3 leading-relaxed">{subcode.how}</p>
        </section>
      ) : null}
      {subcode.function ? (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Function</h2>
          <p className="mt-3 leading-relaxed">{subcode.function}</p>
        </section>
      ) : null}
      {subcode.harm ? (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Harm</h2>
          <p className="mt-3 leading-relaxed">{subcode.harm}</p>
        </section>
      ) : null}
      {subcode.why ? (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Why this is coercive control</h2>
          <p className="mt-3 leading-relaxed">{subcode.why}</p>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Constructed example</h2>
        <blockquote className="mt-3 rounded-[var(--radius-lg)] bg-surface p-5 font-display text-xl leading-snug shadow-[var(--shadow-border)]">
          “{subcode.example}”
        </blockquote>
        <p className="mt-2 text-xs text-faint">Fictitious. Written to illustrate the behavior. Not a case.</p>
      </section>
      <p className="mt-8 text-sm text-muted">{subcode.citation}</p>
      {cat ? (
        <div className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Also in {cat.id}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cat.subcodes
              .filter((s) => s.id !== subcode.id)
              .map((s) => (
                <li key={s.id}>
                  <CodeChip id={s.id} />
                </li>
              ))}
          </ul>
        </div>
      ) : null}
      <RelatedLiterature familyId={subcode.categoryId} />

      <div className="mt-12">
        <Disclaimer
          behavior
          extra="© 2026 Carisa Carlton."
        />
        <CiteBlock
          className="mt-8"
          title={`${CODEBOOK_TITLE}: ${subcode.id}`}
          path={`/codebook/${subcode.slug}`}
          lastReviewed="August 31, 2026"
        />
      </div>
    </main>
  );
}

function RelatedLiterature({ familyId }: { familyId: string }) {
  const sources = literatureForFamily(familyId).filter((s) => s.id !== "carlton-codebook");
  const forums = forumsForFamily(familyId);
  if (!sources.length && !forums.length) return null;

  return (
    <section className="mt-12 border-t border-border pt-8">
      {sources.length > 0 ? (
        <div>
          <h2 className="font-display text-2xl">Literature this family is drawn from</h2>
          <ul className="mt-4 space-y-2">
            {sources.map((s) => (
              <li key={s.id} className="text-sm leading-snug text-muted">
                {s.cite}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link to="/literature" className="text-primary hover:underline">
              Literature map
            </Link>
          </p>
        </div>
      ) : null}
      {forums.length > 0 ? (
        <div className={sources.length ? "mt-8" : ""}>
          <h2 className="text-xs uppercase tracking-[0.16em] text-faint">Forums that enumerate this family</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {forums.map((j) => (
              <li key={j.id}>
                <Link
                  to="/observatory/$id"
                  params={{ id: j.id }}
                  className="inline-flex h-9 items-center rounded-full bg-surface-2 px-3 text-xs text-fg hover:text-primary"
                >
                  {j.abbr}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-faint">A statute that names a tactic is not a finding that the tactic is present.</p>
        </div>
      ) : null}
    </section>
  );
}
