import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const CONTACT = "https://carltonresearch.com/contact/";

const practiceNav = [
  { href: "https://carltonresearch.com/", label: "Home" },
  { to: "/", label: "Coercive Control Observatory", current: true },
  { href: "https://carltonresearch.com/services/", label: "Services" },
  { href: "https://carltonresearch.com/insights/", label: "Insights" },
  { href: "https://carltonresearch.com/about/", label: "About" },
  { href: CONTACT, label: "Contact" },
] as const;

const nav = [
  { to: "/observatory", label: "Coercive Control Statute Map" },
  { href: "https://tracker.carltonresearch.com/", label: "Coercive Control Law Atlas" },
  { href: "https://tracker.carltonresearch.com/appeals", label: "Coercive Control Appeals Landscape" },
  { to: "/literature", label: "Coercive Control Literature Map" },
  { to: "/codebook", label: "Coercive Control Field Check" },
  { to: "/trainer", label: "Coercive Control Drill" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="border-b border-border bg-bg">
      <nav aria-label="Carlton Research" className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-stretch gap-5 overflow-x-auto px-5 sm:px-8">
          {practiceNav.map((item) =>
            "to" in item ? (
              <Link
                key={item.label}
                to={item.to}
                aria-current={item.current ? "page" : undefined}
                className={cn(
                  "shrink-0 py-3 text-sm",
                  item.current
                    ? "border-b-2 border-rule text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 py-3 text-sm text-muted hover:text-fg"
              >
                {item.label}
              </a>
            ),
          )}
        </div>
      </nav>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="Coercive Control Observatory"
            className="flex min-w-0 items-center gap-[0.65rem] no-underline"
          >
            <img
              src="/favicon.png?v=20260901d"
              width={40}
              height={40}
              alt=""
              decoding="async"
              className="h-10 w-10 max-h-10 max-w-10 shrink-0 object-contain"
            />
            <span className="flex min-w-0 flex-col justify-center leading-[1.15]">
              <span className="font-display text-[clamp(1rem,2vw,1.15rem)] font-semibold tracking-[0.01em] text-[#1e2d40]">
                Carlton Research, LLC
              </span>
              <span className="mt-[0.12rem] text-[0.68rem] font-bold uppercase tracking-[0.08em] text-primary">
                Observatory
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-1">
            <Link
              to="/case-fit"
              className="text-sm text-muted underline underline-offset-4 hover:text-fg"
            >
              Case-fit primer
            </Link>
            <a
              href={CONTACT}
              className="text-sm text-primary underline underline-offset-4 hover:text-fg"
            >
              Request a case review
            </a>
          </div>
        </div>
        <nav aria-label="Coercive Control Observatory" className="-mx-1 flex gap-1 overflow-x-auto pb-1">
          {nav.map((item) => {
            if ("href" in item) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-muted hover:text-fg"
                >
                  {item.label}
                </a>
              );
            }
            const active =
              pathname === item.to ||
              pathname.startsWith(`${item.to}/`) ||
              (item.to === "/observatory" &&
                (pathname === "/statute-map" || pathname.startsWith("/statute-map/")));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm",
                  active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
