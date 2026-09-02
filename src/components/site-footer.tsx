import { globalDisclaimer } from "@/lib/cite";

const practiceNav = [
  { href: "https://carltonresearch.com/", label: "Home" },
  { href: "/", label: "Carlton Research Observatory" },
  { href: "https://carltonresearch.com/services/", label: "Services" },
  { href: "https://carltonresearch.com/insights/", label: "Insights" },
  { href: "https://carltonresearch.com/about/", label: "About" },
  { href: "https://carltonresearch.com/contact/", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:px-8">
        <p className="flex items-center gap-[0.65rem] font-display text-lg text-fg">
          <img
            src="/favicon.png?v=20260901d"
            width={40}
            height={40}
            alt=""
            decoding="async"
            className="h-10 w-10 max-h-10 max-w-10 shrink-0 object-contain"
          />
          <span>Carlton Research, LLC</span>
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{globalDisclaimer}</p>
        <nav aria-label="Carlton Research" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {practiceNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted hover:text-fg hover:underline"
              >
                {item.label}
              </a>
          ))}
        </nav>
        <p className="text-sm text-muted">
          Forensic practice:{" "}
          <a
            className="text-primary underline underline-offset-4 hover:text-fg"
            href="https://carltonresearch.com/"
          >
            carltonresearch.com
          </a>
          {" · "}
          Carisa Carlton, CEO Carlton Research, LLC, Coercive Control Forensic Services
        </p>
      </div>
    </footer>
  );
}
