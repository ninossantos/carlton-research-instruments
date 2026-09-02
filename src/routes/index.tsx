import { createFileRoute, Link } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";
import { Disclaimer } from "@/components/disclaimer";
import { allSubcodes, categories } from "@/lib/data/codes";

export const Route = createFileRoute("/")({ component: Home });

const instruments = [
  {
    to: "/observatory",
    name: "Coercive Control Statute Map",
    kicker: "Forums",
    body: "U.S. jurisdictions and key international forums. What is named, which behaviors a statute names, and what that does (and does not) mean.",
  },
  {
    to: "/codebook",
    name: "Is it coercive control?",
    kicker: "Look up a behavior",
    body: `${categories.length} families, ${allSubcodes.length} behaviors drawn from peer-reviewed literature. A match is not a pattern. The page is not a diagnostic checklist.`,
  },
  {
    to: "/trainer",
    name: "Test Your Knowledge",
    kicker: "Example quotations",
    body: "Read a published example. Choose the reading that names the conduct. A match does not establish a pattern.",
  },
  {
    to: "/literature",
    name: "Literature map",
    kicker: "Sources",
    body: "Peer-reviewed and statutory sources tied to a behavior family. Inclusion is not an endorsement of every claim.",
  },
];

function Home() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Carlton Research, LLC</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.15] tracking-tight text-fg sm:text-5xl">
            Is it coercive control?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Look up a behavior against the literature. Identifying a described behavior does not
            establish a pattern and does not establish coercive control.
          </p>
          <p className="mt-4 max-w-2xl text-base text-fg">
            Carisa Carlton, CEO Carlton Research, LLC, Coercive Control Forensic Services
          </p>
          <p className="mt-8">
            <Link
              to="/codebook"
              className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-primary px-5 text-sm font-medium text-primary-fg"
            >
              Look up a behavior
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {instruments.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-surface p-6 transition-colors duration-150 hover:bg-surface-2 sm:p-8"
            >
              <p className="font-mono text-xs text-faint">{item.kicker}</p>
              <h2 className="mt-3 font-display text-2xl text-fg group-hover:text-primary">{item.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Disclaimer behavior />
        <CiteBlock
          className="mt-8"
          title="Carlton Research Observatory"
          path="/"
          lastReviewed="August 31, 2026"
        />
      </section>
    </main>
  );
}
