import { proprietaryFooter } from "@/lib/cite";

const practiceNav = [
  { href: "https://carltonresearch.com/", label: "Home" },
  { href: "/", label: "Coercive Control Observatory" },
  { href: "https://carltonresearch.com/services/", label: "Services" },
  { href: "https://carltonresearch.com/about/", label: "About" },
  { href: "https://carltonresearch.com/contact/", label: "Contact" },
];

const secondaryNav = [
  { href: "https://carltonresearch.com/privacy-policy/", label: "Privacy Policy" },
  { href: "https://carltonresearch.com/terms-of-service/", label: "Terms of Service" },
  { href: "https://carltonresearch.com/copyright-notice/", label: "Copyright Notice" },
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
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{proprietaryFooter}</p>
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
        <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {secondaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted hover:text-fg hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div
          role="separator"
          aria-hidden="true"
          className="mt-1 h-px w-full max-w-2xl"
          style={{ backgroundColor: "#D0A870", opacity: 0.55 }}
        />
        <p className="text-sm text-muted">
          Forensic practice:{" "}
          <a
            className="text-primary underline underline-offset-4 hover:text-fg"
            href="https://carltonresearch.com/"
          >
            carltonresearch.com
          </a>
        </p>
      </div>
    </footer>
  );
}
