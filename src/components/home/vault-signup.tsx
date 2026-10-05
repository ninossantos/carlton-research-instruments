import { useState, type FormEvent } from "react";
import {
  AUDIENCE_OPTIONS,
  HUBSPOT_SUBSCRIPTION_TYPE_IDS,
  SIGNUP_ENABLED,
  SIGNUP_FIELD_NAMES,
  SIGNUP_SOURCE,
  hubspotSubmitUrl,
  type AudienceValue,
} from "@/lib/signup-config";

const NAVY = "#1e2d40";
const WINE = "#6f2430";
const GOLD = "#d7a975";
const TAN = "#dbb28b";
const WARM = "#f3f0eb";

const EVIDENCE_URL = "https://evidence.carltonresearch.com";

/** HubSpot date properties expect midnight UTC, in milliseconds. */
function todayUtcMidnight(): string {
  const d = new Date();
  return String(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function EvidenceVaultCard() {
  return (
    <a
      href={EVIDENCE_URL}
      aria-labelledby="vault-heading vault-cta"
      aria-describedby="vault-body"
      className="group flex h-full flex-col rounded-[var(--radius-lg)] p-7 no-underline shadow-none transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(9,10,12,0.55)] focus-visible:outline-solid focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#d7a975] sm:p-9"
      style={{ background: NAVY, color: WARM }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
        Evidence Vault
      </p>
      <h2
        id="vault-heading"
        className="mt-3 font-display text-3xl leading-[1.15] tracking-tight sm:text-[2.1rem]"
        style={{ color: "#fbf8f1" }}
      >
        In Beta Now! Finished Product Coming this Week!
      </h2>
      <p id="vault-body" className="mt-4 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: WARM }}>
        Store de-identified documents for each case. A child's first name is replaced on your
        computer before anything is analyzed. Each document is dated, attributed, excerpted, and
        coded with the Carlton Research Codebook, then gathered into an evidence report.
      </p>
      <ul className="mt-5 grid gap-2 text-[0.95rem]" style={{ color: WARM }}>
        {[
          "Each code comes with the excerpt it relies on.",
          "Come back and add more documents to the case.",
          "The report is a coding aid, not a finding.",
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
            for ten cases
          </dd>
        </div>
      </dl>
      <div className="mt-auto pt-7">
        {/* Visual button only: the whole card is the link (no nested anchors). */}
        <span
          id="vault-cta"
          className="inline-flex h-12 items-center rounded-[var(--radius-md)] px-6 text-[0.95rem] font-semibold transition-[filter] duration-150 group-hover:brightness-110 group-hover:underline group-hover:underline-offset-4 group-focus-visible:brightness-110"
          style={{ background: WINE, color: "#fbf8f1", border: `1px solid ${GOLD}` }}
        >
          Enter the Evidence Vault
          <span aria-hidden="true" className="ml-2 transition-transform duration-150 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </a>
  );
}

type Status = "idle" | "sending" | "done" | "error";

const inputClass =
  "h-11 w-full rounded-[var(--radius-sm)] border border-rule bg-white px-3 text-[0.95rem] text-fg placeholder:text-faint disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-faint";
const labelClass = "mb-1 block text-[0.85rem] font-semibold text-fg";

function SignupCard() {
  const enabled = SIGNUP_ENABLED;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = hubspotSubmitUrl();
    // Unconfigured: never send data and never report success.
    if (!enabled || !url) return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const email = get("email");
    const audience = get("audience") as AudienceValue;
    if (!email || !audience || fd.get("consent") !== "yes") {
      setError("Please add your email, choose one option, and check the consent box.");
      return;
    }
    const F = SIGNUP_FIELD_NAMES;
    const fields = [
      { name: F.email, value: email },
      { name: F.firstName, value: get("firstName") },
      { name: F.lastName, value: get("lastName") },
      { name: F.firm, value: get("firm") },
      { name: F.audience, value: audience },
      { name: F.signupSource, value: get("signupSource") },
      { name: F.signupDate, value: get("signupDate") },
    ].filter((f) => f.value !== "");
    const subId = HUBSPOT_SUBSCRIPTION_TYPE_IDS[audience];
    const body: Record<string, unknown> = {
      fields,
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : undefined,
        pageName: "Coercive Control Observatory",
      },
    };
    if (subId) {
      body.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: "I agree to receive email updates from Carlton Research.",
          communications: [
            { value: true, subscriptionTypeId: subId, text: "Email updates from Carlton Research." },
          ],
        },
      };
    }
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
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Email updates</p>
        <h3 className="mt-2 font-display text-[1.6rem] leading-[1.2] text-fg">Thank you.</h3>
        <p className="mt-2 text-[0.95rem] text-muted">You are on the list.</p>
      </div>
    );
  }

  const off = !enabled || status === "sending";

  return (
    <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Email updates</p>
      <h3 className="mt-2 font-display text-[1.6rem] leading-[1.2] text-fg">
        Want to stay updated on coercive control?
      </h3>
      <p className="mt-2 text-[0.95rem] text-muted">Carlton Research does not share this list.</p>

      <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate={false} aria-disabled={!enabled}>
        <fieldset disabled={off} className="grid gap-4">
          <input type="hidden" name="signupSource" value={SIGNUP_SOURCE} />
          <input type="hidden" name="signupDate" value={todayUtcMidnight()} />
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
          <div>
            <label htmlFor="su-firm" className={labelClass}>
              Firm/Organization
            </label>
            <input id="su-firm" name="firm" type="text" autoComplete="organization" className={inputClass} />
          </div>
          <div role="radiogroup" aria-labelledby="su-aud-label">
            <span id="su-aud-label" className={labelClass}>
              Which best describes you? <span style={{ color: WINE }}>(required, choose one)</span>
            </span>
            <div className="grid gap-2">
              {AUDIENCE_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-border bg-white px-3 py-2.5 text-[0.95rem] text-fg"
                >
                  <input type="radio" name="audience" value={o.value} required className="h-4 w-4 flex-none" style={{ accentColor: WINE }} />
                  <span>
                    {o.label}
                    {"detail" in o && o.detail ? (
                      <span className="block text-[0.85rem] text-muted">{o.detail}</span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <label className="flex items-start gap-3 text-[0.9rem] text-muted">
            <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 flex-none" style={{ accentColor: WINE }} />
            <span>I agree to receive email updates from Carlton Research. I can unsubscribe at any time.</span>
          </label>
        </fieldset>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={off}
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] px-6 text-[0.95rem] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: WINE, color: "#fbf8f1" }}
          >
            {status === "sending" ? "Sending" : "Subscribe"}
          </button>
          {!enabled ? (
            <span className="text-[0.9rem] text-muted" role="status">
              Signups open soon.
            </span>
          ) : null}
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
