import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const CONTACT = "https://carltonresearch.com/contact/";

const practiceNav = [
  { href: "https://carltonresearch.com/", label: "Home" },
  { to: "/", label: "Instruments", current: true },
  { href: "https://tracker.carltonresearch.com/", label: "Coercive Control Trackers" },
  { href: "https://carltonresearch.com/services/", label: "Services" },
  { href: "https://carltonresearch.com/insights/", label: "Insights" },
  { href: "https://carltonresearch.com/about/", label: "About" },
  { href: CONTACT, label: "Contact" },
] as const;

const nav = [
  { to: "/observatory", label: "Observatory" },
  { to: "/case-fit", label: "Case-fit" },
  { to: "/literature", label: "Literature" },
  { to: "/codebook", label: "Is it coercive control?" },
  { to: "/trainer", label: "Test Your Knowledge" },
];

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
          <Link to="/" className="flex min-w-0 items-center gap-[0.65rem] no-underline">
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
                Instruments
              </span>
            </span>
          </Link>
          <a
            href={CONTACT}
            className="shrink-0 text-sm text-primary underline underline-offset-4 hover:text-fg"
          >
            Request a case review
          </a>
        </div>
        <nav aria-label="Instruments" className="-mx-1 flex gap-1 overflow-x-auto pb-1">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
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
