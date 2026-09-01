import { behaviorDisclaimer } from "@/lib/cite";

export function Disclaimer({ extra, behavior }: { extra?: string; behavior?: boolean }) {
  if (!behavior && !extra) return null;
  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted">
      {behavior ? <p>{behaviorDisclaimer}</p> : null}
      {extra ? <p>{extra}</p> : null}
    </div>
  );
}
