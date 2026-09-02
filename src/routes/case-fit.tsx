import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CiteBlock } from "@/components/cite-block";
import { Disclaimer } from "@/components/disclaimer";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/data/codes";
import { jurisdictions } from "@/lib/data/jurisdictions";
import { floorGuidance } from "@/lib/data/method";

export const Route = createFileRoute("/case-fit")({
  component: CaseFit,
  head: () => ({
    meta: [{ name: "robots", content: "noindex,nofollow" }],
  }),
});

const postures = [
  { id: "custody", label: "Custody / parenting-time dispute" },
  { id: "dvro", label: "Protective / restraining order" },
  { id: "criminal", label: "Criminal" },
  { id: "consult", label: "Counsel or party consult, no filing yet" },
  { id: "other", label: "Other civil" },
];

const recordOptions = [
  { id: "texts", label: "SMS / iMessage / WhatsApp", family: "iso" },
  { id: "email", label: "Email", family: "gas" },
  { id: "parenting-app", label: "OurFamilyWizard / TalkingParents / similar", family: "har" },
  { id: "location", label: "Location logs / device tracking", family: "sur" },
  { id: "accounts", label: "Shared accounts, passwords, spyware", family: "sur" },
  { id: "financial", label: "Bank, credit, support, coerced debt", family: "eco" },
  { id: "docket", label: "Docket / serial filings", family: "inst" },
  { id: "child", label: "Child used as messenger or monitor (in the record)", family: "chi" },
  { id: "po", label: "Protective or restraining order in force or alleged breached", family: "vpo" },
  { id: "path", label: "Mental-health labels used against a party (in the record)", family: "path" },
  { id: "crim", label: "Alleged coerced crime or forced silence about a child", family: "crim" },
];

function CaseFit() {
  const [forumId, setForumId] = useState("");
  const [posture, setPosture] = useState("");
  const [span, setSpan] = useState<"2w" | "3m" | "18m" | "unknown" | "">("");
  const [records, setRecords] = useState<string[]>([]);
  const [bothSides, setBothSides] = useState<"yes" | "no" | "unknown" | "">("");
  const [submitted, setSubmitted] = useState(false);

  const spanDays = span === "2w" ? 14 : span === "3m" ? 90 : span === "18m" ? 540 : 0;
  const floor = spanDays ? floorGuidance(spanDays) : null;
  const forum = jurisdictions.find((j) => j.id === forumId);

  const familiesInPlay = useMemo(() => {
    const ids = new Set(recordOptions.filter((r) => records.includes(r.id)).map((r) => r.family));
    return [...ids]
      .map((id) => getCategory(id))
      .filter((c): c is NonNullable<typeof c> => c != null);
  }, [records]);

  const verdict = useMemo(() => {
    if (!forumId || !posture || !span || records.length === 0 || !bothSides) return null;
    if (span === "unknown") {
      return { id: "not-yet" as const, title: "Not yet: the span is unknown" };
    }
    if (span === "2w" && bothSides === "no") {
      return { id: "possible" as const, title: "Possible consult: not a regime on this span" };
    }
    if (span === "2w") {
      return { id: "possible" as const, title: "Possible consult: short span" };
    }
    if (bothSides === "no") {
      return { id: "possible" as const, title: "Possible: only one direction is in hand" };
    }
    return { id: "candidate" as const, title: "Candidate for a case-material review" };
  }, [forumId, posture, span, records.length, bothSides]);

  function toggleRecord(id: string) {
    setRecords((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
    setSubmitted(false);
  }

  const ready = Boolean(forumId && posture && span && records.length && bothSides);

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">For counsel</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Case-fit primer</h1>
      <p className="mt-4 text-lg text-muted">
        For attorneys, parties, and evaluators. This does not score a person and does not recommend
        parenting time. It answers whether a forensic evaluation is even a candidate.
      </p>

      <form
        className="mt-10 space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <fieldset>
          <legend className="font-display text-2xl">Forum</legend>
          <p className="mt-2 text-sm text-muted">The court that will hear it, not the state you wish had the better statute.</p>
          <select
            className="mt-4 h-12 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-base"
            value={forumId}
            onChange={(e) => {
              setForumId(e.target.value);
              setSubmitted(false);
            }}
          >
            <option value="">Select a jurisdiction</option>
            {jurisdictions
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}: {j.statusLabel}
                </option>
              ))}
          </select>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl">Posture</legend>
          <div className="mt-4 grid gap-2">
            {postures.map((p) => (
              <label key={p.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
                <input
                  type="radio"
                  name="posture"
                  checked={posture === p.id}
                  onChange={() => {
                    setPosture(p.id);
                    setSubmitted(false);
                  }}
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl">Temporal span of the records</legend>
          <p className="mt-2 text-sm text-muted">
            The floor is calibrated to this number. A two-week file and a two-year file are not the
            same object.
          </p>
          <div className="mt-4 grid gap-2">
            {(
              [
                ["2w", "About two weeks"],
                ["3m", "About one to three months"],
                ["18m", "About a year or more"],
                ["unknown", "Unknown / mixed dumps, dates unclear"],
              ] as const
            ).map(([id, label]) => (
              <label key={id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
                <input
                  type="radio"
                  name="span"
                  checked={span === id}
                  onChange={() => {
                    setSpan(id);
                    setSubmitted(false);
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl">What already exists</legend>
          <p className="mt-2 text-sm text-muted">Check what is in hand. Do not collect new surveillance to complete this form.</p>
          <div className="mt-4 grid gap-2">
            {recordOptions.map((r) => (
              <label key={r.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
                <input type="checkbox" checked={records.includes(r.id)} onChange={() => toggleRecord(r.id)} />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl">Both parties' communications?</legend>
          <p className="mt-2 text-sm text-muted">Asymmetry is bidirectional. One export is not the whole file.</p>
          <div className="mt-4 grid gap-2">
            {(
              [
                ["yes", "Yes: both directions are in the export"],
                ["no", "No: one party's messages only"],
                ["unknown", "Unknown"],
              ] as const
            ).map(([id, label]) => (
              <label key={id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
                <input
                  type="radio"
                  name="both"
                  checked={bothSides === id}
                  onChange={() => {
                    setBothSides(id);
                    setSubmitted(false);
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" disabled={!ready} size="lg">
          See whether this is a candidate
        </Button>
      </form>

      {submitted && verdict ? (
        <section className="mt-12 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">Output: not a finding</p>
          <h2 className="mt-2 font-display text-3xl">{verdict.title}</h2>

          {forum ? (
            <p className="mt-6 text-sm text-muted">
              Forum:{" "}
              <Link to="/observatory/$id" params={{ id: forum.id }} className="text-primary hover:underline">
                {forum.name}
              </Link>
              . {forum.statusLabel}.
            </p>
          ) : null}

          <div className="mt-8 rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-xl">Span</h3>
            {span === "2w" ? (
              <p className="mt-3 leading-relaxed">
                About two weeks is a cluster, not a long record. A conversation may still be worth
                having if a longer file exists. Two weeks, by itself, is not a regime.
              </p>
            ) : span === "unknown" ? (
              <p className="mt-3 leading-relaxed">
                A mixed dump without dates cannot be treated as a long record. Do not invent a
                timeline.
              </p>
            ) : (
              <p className="mt-3 leading-relaxed">
                {floor ? `${floor.label}. ` : ""}
                Span is one fact a review would need. Span is not a finding.
              </p>
            )}
          </div>

          {familiesInPlay.length > 0 ? (
            <div className="mt-8">
              <h3 className="font-display text-xl">Families that could even be in play</h3>
              <p className="mt-2 text-sm text-muted">
                From the record types you checked, not a reading of any file.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {familiesInPlay.map((f) => (
                  <li key={f.id}>
                    <Link to="/codebook/$code" params={{ code: f.slug }} className="text-primary hover:underline">
                      {f.id} {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8">
            <h3 className="font-display text-xl">Do not send</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>Anything obtained by accessing the other party's accounts.</li>
              <li>A request for a parenting-time recommendation. That is not the product.</li>
            </ul>
          </div>

          <a
            href="https://carltonresearch.com/contact/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-primary px-5 text-sm font-medium text-primary-fg"
          >
            Request a case review
          </a>
        </section>
      ) : null}

      <div className="mt-12">
        <Disclaimer extra="Attorneys, parties, and advocates may write. Tell us the jurisdiction, the posture, and what records already exist, not the records themselves." />
        <CiteBlock className="mt-8" title="Case-fit primer" path="/case-fit" lastReviewed="August 31, 2026" />
      </div>
    </main>
  );
}
