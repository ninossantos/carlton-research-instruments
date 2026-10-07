import { useState, type FormEvent } from "react";
import {
  SIGNUP_ENABLED,
  buildHubspotPayload,
  hubspotSubmitUrl,
  readHutk,
} from "@/lib/signup-config";
import { EVIDENCE_VAULT_URL, VAULT_LIVE } from "@/lib/vault-config";

const NAVY = "#1e2d40";
const WINE = "#6f2430";
const GOLD = "#d7a975";
const TAN = "#dbb28b";
const WARM = "#f3f0eb";


const CARD_BASE = "flex h-full flex-col rounded-[var(--radius-lg)] p-7 sm:p-9";
const CARD_LINK =
  " vault-card-link group shadow-none transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(9,10,12,0.55)] focus-visible:outline-solid focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#d7a975]";
const CTA_BASE =
  "inline-flex h-12 items-center rounded-[var(--radius-md)] px-6 text-[0.95rem] font-semibold";
const CTA_LINK =
  " transition-[filter] duration-150 group-hover:brightness-110 group-focus-visible:brightness-110";

function EvidenceVaultCard() {
  const style = { background: NAVY, color: WARM, border: `1px solid ${TAN}` };
  const content = <VaultCardContent />;
  if (VAULT_LIVE) {
    return (
      <a
        href={EVIDENCE_VAULT_URL}
        aria-label="New Product. Live Now. Enter the Evidence Vault"
        aria-describedby="vault-body"
        className={CARD_BASE + CARD_LINK}
        style={style}
      >
        {content}
      </a>
    );
  }
  // Not live yet: plain card, no link, no hover, nothing focusable.
  return (
    <div className={CARD_BASE} style={style}>
      {content}
    </div>
  );
}

function VaultCardContent() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
        Evidence Vault
      </p>
      <h2
        id="vault-heading"
        className="mt-3 font-display text-3xl leading-[1.15] tracking-tight sm:text-[2.1rem]"
        style={{ color: "#fbf8f1" }}
      >
        New Product
        <br />
        <span className="inline-block pt-1 text-[0.5em] leading-[1.25]">
          Live Now
        </span>
      </h2>
      <p id="vault-body" className="mt-4 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: WARM }}>
        Upload your evidence and receive a preliminary report on whether it’s coercive control.
        Children’s names are deidentified. In addition to your report, you can create an Exhibit
        Book with a single click. Included with your account fee.
      </p>
      <ul className="mt-5 grid gap-2 text-[0.95rem]" style={{ color: WARM }}>
        {[
          "Each piece of your evidence is scanned for coercive control. Instant report.",
          "Come back later and add more documents to your file. The Evidence Vault keeps it organized.",
          "Not a substitute for an expert analyst or attorney, but Evidence Vault provides deep insights for a fraction of the cost.",
        ].map((t) => (
          <li key={t} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.55em] inline-block h-[7px] w-[7px] flex-none rounded-full"
              style={{ background: GOLD }}
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <dl
        className="mt-6 grid gap-3 border-t pt-5 sm:grid-cols-2"
        style={{ borderColor: "rgba(215,169,117,0.35)" }}
      >
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: TAN }}>
            Individual
          </dt>
          <dd className="mt-1 text-[0.95rem]">
            <span className="font-display text-2xl" style={{ color: "#fbf8f1" }}>
              $295
            </span>{" "}
            for one case
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: TAN }}>
            Professional
          </dt>
          <dd className="mt-1 text-[0.95rem]">
            <span className="font-display text-2xl" style={{ color: "#fbf8f1" }}>
              $2,359
            </span>{" "}
            manage up to ten cases
          </dd>
        </div>
      </dl>
      <div className="mt-auto pt-7">
        {/* Visual button only (a span, never a link or button). When live, the whole card is the link. */}
        <span
          id="vault-cta"
          className={CTA_BASE + (VAULT_LIVE ? CTA_LINK : "")}
          style={{ background: WINE, color: "#fbf8f1", border: `1px solid ${GOLD}`, textDecoration: "none" }}
        >
          {VAULT_LIVE ? (
            <>
              Enter the Evidence Vault
              <span aria-hidden="true" className="ml-2 transition-transform duration-150 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </>
          ) : (
            "Coming This Week"
          )}
        </span>
      </div>
    </>
  );
}

type Status = "idle" | "sending" | "done" | "error";

const inputClass =
  "h-11 w-full rounded-[var(--radius-sm)] border border-rule bg-white px-3 text-[0.95rem] text-fg placeholder:text-faint disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-faint";
const labelClass = "mb-1 block text-[0.85rem] font-semibold text-fg";

function SignupCard() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = hubspotSubmitUrl();
    if (!SIGNUP_ENABLED || !url) return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const email = get("email");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    const body = buildHubspotPayload({
      email,
      firstName: get("firstName"),
      lastName: get("lastName"),
      hutk: readHutk(),
    });
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Sorry, your signup did not go through. Please check your email address and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Email updates</p>
        <p className="mt-2 font-display text-[1.6rem] leading-[1.2] text-fg" role="status">
          Thank you. You're on the list.
        </p>
      </div>
    );
  }

  const off = !SIGNUP_ENABLED || status === "sending";

  return (
    <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Email updates</p>
      <h3 className="mt-2 font-display text-[1.6rem] leading-[1.2] text-fg">
        Want to stay updated on coercive control?
      </h3>
      <p className="mt-2 text-[0.95rem] text-muted">Carlton Research does not sell or share our contact lists with anyone for any reason.</p>

      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        {/* Audience question removed until HubSpot has an Audience property on the form (see signup-config.ts). */}
        <fieldset disabled={off} className="grid gap-4">
          <div>
            <label htmlFor="su-email" className={labelClass}>
              Email <span style={{ color: WINE }}>(required)</span>
            </label>
            <input id="su-email" name="email" type="email" required autoComplete="email" className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="su-first" className={labelClass}>
                First Name
              </label>
              <input id="su-first" name="firstName" type="text" autoComplete="given-name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="su-last" className={labelClass}>
                Last Name
              </label>
              <input id="su-last" name="lastName" type="text" autoComplete="family-name" className={inputClass} />
            </div>
          </div>
        </fieldset>
        <div>
          <button
            type="submit"
            disabled={off}
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] px-6 text-[0.95rem] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: WINE, color: "#fbf8f1" }}
          >
            {status === "sending" ? "Subscribing" : "Subscribe"}
          </button>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
            We will only send you important updates, no boring newsletters or sales pitches.
          </p>
        </div>
        {error ? (
          <p className="text-[0.9rem]" style={{ color: WINE }} role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export function VaultSignupSection() {
  return (
    <section className="border-b border-border bg-bg">
      <div className="mx-auto grid max-w-6xl items-stretch gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.35fr_1fr]">
        <EvidenceVaultCard />
        <SignupCard />
      </div>
    </section>
  );
}
