import { createFileRoute, Link } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";

export const Route = createFileRoute("/")({ component: Home });

const instruments = [
  {
    to: "/observatory",
    name: "What the Law Names",
    kicker: "Statutes",
    body: "Open the statute that names coercive control in a jurisdiction you care about. See which behaviors the text actually reaches, and where the name stops short of a finding.",
  },
  {
    href: "https://tracker.carltonresearch.com/",
    name: "Law Atlas",
    kicker: "Statutes",
    body: "Map named-term coercive control statutes and bills across U.S. jurisdictions from the official text, not from a summary someone else wrote.",
  },
  {
    href: "https://tracker.carltonresearch.com/appeals",
    name: "Appeals Landscape",
    kicker: "Appeals",
    body: "Read how published appellate courts have used the phrase coercive control. Track the argument, not a headline about the outcome.",
  },
  {
    to: "/literature",
    name: "Tied to Behaviors",
    kicker: "Sources",
    body: "Pull the peer-reviewed and statutory sources that sit under one behavior family, so the citation trail is in front of you before you argue the pattern.",
  },
  {
    to: "/codebook",
    name: "Field Check",
    kicker: "Look up a behavior",
    body: "Look up a described act against 15 families and 59 behaviors drawn from peer-reviewed literature. A hit names a behavior. It does not prove a pattern.",
  },
  {
    to: "/trainer",
    name: "Pattern Drill",
    kicker: "Test your knowledge.",
    body: "Work a published example the way you work a record: choose the reading that names the conduct, then reject the near-miss that would not survive cross-examination.",
  },
  {
    href: "https://carltonresearch.com/insights/",
    name: "Insights",
    kicker: "Essays",
    body: "Essays from Carlton Research on coercive control pattern analysis, written for use in practice: argument, method, and the record.",
    span: true,
  },
];

function Home() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Carlton Research
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.15] tracking-tight text-fg sm:text-5xl">
            Coercive Control Observatory
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Open a map of the field. Statutes and appeals that name coercive control,
            literature that frames the conduct, and practice tools for careful reading.
          </p>
          <p className="mt-4 max-w-2xl text-base text-fg">
            Carisa Carlton, CEO Carlton Research, LLC, Coercive Control Forensic Services.
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://carltonresearch.com/contact/"
              className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-primary px-5 text-sm font-medium text-primary-fg"
            >
              Request a case review
            </a>
            <Link
              to="/case-fit"
              className="inline-flex h-12 items-center rounded-[var(--radius-md)] border border-border bg-surface px-5 text-sm font-medium text-fg hover:bg-surface-2"
            >
              Case-fit primer
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Explore the Observatory</p>
        </div>
        <div className="mx-auto mt-6 grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {instruments.map((item) => {
            const spanClass = "span" in item && item.span ? " lg:col-span-2" : "";
            const cardClass =
              "group bg-surface p-6 transition-colors duration-150 hover:bg-surface-2 sm:p-8" +
              spanClass;
            const inner = (
              <>
                <p className="font-mono text-xs text-faint">{item.kicker}</p>
                <h2 className="mt-3 font-display text-2xl text-fg group-hover:text-primary">{item.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </>
            );
            if ("href" in item && item.href) {
              return (
                <a key={item.href} href={item.href} className={cardClass}>
                  {inner}
                </a>
              );
            }
            return (
              <Link key={item.to} to={item.to!} className={cardClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <CiteBlock
          className="mt-8"
          title="Coercive Control Observatory"
          path="/"
          lastReviewed="September 2, 2026"
        />
      </section>
    </main>
  );
}
