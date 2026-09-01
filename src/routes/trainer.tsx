import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CiteBlock } from "@/components/cite-block";
import { Button } from "@/components/ui/button";
import { questions } from "@/lib/data/trainer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer")({ component: Trainer });

function Trainer() {
  const [active, setActive] = useState(questions[0].id);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const numberRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const resultRef = useRef<HTMLDivElement | null>(null);

  const index = questions.findIndex((q) => q.id === active);
  const question = questions[index] ?? questions[0];
  const pick = picks[question.id];
  const show = Boolean(revealed[question.id]);
  const chosen = question.options.find((o) => o.id === pick);
  const correct = question.options.find((o) => o.correct);
  const checkedCount = questions.filter((q) => revealed[q.id]).length;
  const isLast = index === questions.length - 1;
  const perfect =
    checkedCount === questions.length &&
    questions.every((q) => q.options.find((o) => o.id === picks[q.id])?.correct);

  useEffect(() => {
    numberRefs.current[question.id]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [question.id]);

  useEffect(() => {
    if (show) resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [show, question.id]);

  function select(id: string) {
    if (revealed[question.id]) return;
    setPicks((p) => ({ ...p, [question.id]: id }));
  }

  function check() {
    if (!pick) return;
    setRevealed((r) => ({ ...r, [question.id]: true }));
  }

  function go(delta: number) {
    const next = questions[index + delta];
    if (next) setActive(next.id);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Test your knowledge</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Is this the behavior?</h1>
      <p className="mt-4 text-lg text-muted">
        Choose the best answer for the behavior. A single match does not establish a pattern. Get
        all 67 answers correct and receive a free one-hour remote consultation with Carisa Carlton
        worth $250.
      </p>

      <div
        className="-mx-5 mt-8 flex flex-nowrap gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
        role="tablist"
        aria-label="Questions"
      >
        {questions.map((q, i) => {
          const on = q.id === question.id;
          const done = Boolean(revealed[q.id]);
          return (
            <button
              key={q.id}
              type="button"
              role="tab"
              aria-selected={on}
              ref={(el) => {
                numberRefs.current[q.id] = el;
              }}
              onClick={() => setActive(q.id)}
              className={cn(
                "inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full px-4 text-sm transition-colors duration-150",
                on ? "bg-fg text-bg" : done ? "bg-surface-2 text-fg" : "bg-surface-2 text-muted",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <article className="mt-10">
        <p className="text-xs uppercase tracking-[0.16em] text-faint">
          {index + 1} of {questions.length}
        </p>
        <blockquote className="mt-4 rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">
            {question.quoted ? "Message" : "Example"}
          </p>
          <p className="mt-3 font-display text-xl leading-snug">
            {question.quoted ? `“${question.message}”` : question.message}
          </p>
        </blockquote>

        <fieldset className="mt-8">
          <legend className="font-display text-2xl">Choose the correct answer</legend>
          <div className="mt-4 grid gap-2" role="radiogroup" aria-label="Answers">
            {question.options.map((o) => {
              const selected = pick === o.id;
              const isCorrect = show && o.correct;
              const isWrongPick = show && selected && !o.correct;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => select(o.id)}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-3 text-left shadow-[var(--shadow-border)] transition-colors duration-150",
                    selected && !show ? "bg-surface-2" : null,
                    isCorrect ? "bg-primary-soft" : null,
                    isWrongPick ? "opacity-70" : null,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-sm",
                      selected || isCorrect ? "bg-fg text-bg" : "bg-surface-2 text-muted",
                    )}
                  >
                    {o.id.toUpperCase()}
                  </span>
                  <span className="pt-2.5 text-sm leading-relaxed">{o.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {!show ? (
          <Button className="mt-6" type="button" disabled={!pick} onClick={check}>
            Check
          </Button>
        ) : null}

        {show && chosen && correct ? (
          <div ref={resultRef} className="mt-8 border-t border-border pt-6">
            {chosen.correct ? (
              <p className="font-display text-2xl">Correct.</p>
            ) : (
              <p className="font-display text-xl leading-snug">
                Your answer is incorrect, the correct answer is {correct.label}.
              </p>
            )}
            <p className="mt-4">
              <Link
                to="/codebook/$code"
                params={{ code: question.codeId.toLowerCase() }}
                className="inline-flex min-h-11 max-w-full items-center rounded-full bg-fg px-5 py-2 text-sm text-bg hover:bg-fg/90"
              >
                {question.codeId}. {question.codeName}
              </Link>
            </p>
            <p className="mt-4 text-sm text-muted">A match does not establish a pattern.</p>
            {perfect ? <ConsultOffer className="mt-6" /> : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {index > 0 ? (
                <Button type="button" variant="secondary" onClick={() => go(-1)}>
                  Previous
                </Button>
              ) : null}
              {!isLast ? (
                <Button type="button" onClick={() => go(1)}>
                  Next
                </Button>
              ) : !perfect ? (
                <p className="self-center text-sm text-muted">
                  {checkedCount} of {questions.length} checked.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </article>

      {perfect && !show ? <ConsultOffer className="mt-10" /> : null}

      <p className="mt-10 text-sm">
        <Link to="/codebook" className="text-primary hover:underline">
          Is it coercive control?
        </Link>
      </p>

      <CiteBlock
        className="mt-8"
        title="Is this the behavior?"
        path="/trainer"
        lastReviewed="August 31, 2026"
      />
    </main>
  );
}

function ConsultOffer({ className }: { className?: string }) {
  return (
    <p className={cn("text-lg leading-relaxed", className)}>
      <a
        href="https://tidycal.com/mscarisa/strategic-consult"
        className="text-primary hover:underline"
      >
        Book your free one hour consultation with Carisa Carlton
      </a>
      . Worth $250.
    </p>
  );
}
