import { globalDisclaimer } from "@/lib/cite";

const practiceNav = [
  { href: "https://carltonresearch.com/", label: "Home" },
  { href: "/", label: "Instruments" },
  { href: "https://tracker.carltonresearch.com/", label: "Coercive Control Trackers" },
  { href: "https://carltonresearch.com/services/", label: "Services" },
  { href: "https://carltonresearch.com/insights/", label: "Insights" },
  { href: "https://carltonresearch.com/about/", label: "About" },
  { href: "https://carltonresearch.com/contact/", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:px-8">
        <p className="font-display text-lg text-fg">Carlton Research, LLC</p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{globalDisclaimer}</p>
        <nav aria-label="Carlton Research" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {practiceNav.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-muted hover:text-fg hover:underline"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <p className="text-sm text-muted">
          Forensic practice:{" "}
          <a
            className="text-primary underline underline-offset-4 hover:text-fg"
            href="https://carltonresearch.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            carltonresearch.com
          </a>
          {" · "}
          Principal: Carisa Carlton, M.A.
        </p>
      </div>
    </footer>
  );
}
