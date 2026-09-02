import { createFileRoute, Link } from "@tanstack/react-router";
import { CiteBlock } from "@/components/cite-block";

export const Route = createFileRoute("/")({ component: Home });

const instruments = [
  {
    to: "/observatory",
    name: "Statute Map",
    kicker: "Statutes",
    body: "A living, at-a-glance orientation to national and international coercive control laws by jurisdiction and which U.S. states are still silent on the matter.",
  },
  {
    href: "https://tracker.carltonresearch.com/",
    name: "Law Atlas",
    kicker: "US and International Law Tracker",
    body: "Active coercive control laws, what is in the pipeline, compare laws across states and countries, see what each law accomplishes all on one clean page.",
  },
  {
    href: "https://tracker.carltonresearch.com/appeals",
    name: "Appeals Landscape",
    kicker: "US Appeals Tracker",
    body: "Affirmed, reversed, remanded. Read published appellate opinions on coercive control.",
  },
  {
    to: "/literature",
    name: "Literature Map",
    kicker: "Scholarly Sources",
    body: "Peer-reviewed sources and their behavioral families. Pull the citation trail before you write.",
  },
  {
    to: "/codebook",
    name: "Field Check",
    kicker: "Reference Check",
    body: "Is it coercive control? Search a behavior, find its category. Follow its link to understand it. Drawn from peer-reviewed literature. Isolated or clustered behaviors do not establish a pattern of coercive control.",
  },
  {
    to: "/trainer",
    name: "Pattern Drill",
    kicker: "Test Your Knowledge.",
    body: "Take a 67-question quiz to strengthen your knowledge about what behaviors constitute coercive control. Not hard. You can do it.",
  },
  {
    href: "https://carltonresearch.com/insights/",
    name: "Insights",
    kicker: "Blog",
    body: "Researched and cited essays on coercive control as it applies to law.",
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
            Open a map of the field. Statutes and appeals that use the phrase coercive control,
            literature that frames the conduct, and practice tools for careful reading.
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
            const spanClass = "span" in item && item.span ? " sm:col-span-2 lg:col-span-3" : "";
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
