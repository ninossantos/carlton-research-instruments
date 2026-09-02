import { Link } from "@tanstack/react-router";

/** Locked public labels for behavior-family pills on Coercive Control Literature Map. */
export const FAMILY_LABELS: Record<string, string> = {
  ISO: "Isolation",
  SUR: "Surveillance",
  DEG: "Degradation",
  REG: "Rules",
  ECO: "Economic Control",
  THR: "Threats",
  GAS: "Gaslighting",
  SEXC: "Sexual Coercion",
  CHI: "Using Children",
  INST: "Legal Abuse",
  REC: "Conditional Love",
  CRIM: "Forced Crime",
  HAR: "Harassment",
  PATH: "Pathologizing",
  VPO: "Protective Orders",
};

export function familyLabel(id: string): string {
  return FAMILY_LABELS[id] ?? id;
}

/** Field Check subcode chip (shows the subcode id, e.g. ISO-1). */
export function CodeChip({ id }: { id: string }) {
  const slug = id.replace(/\/M$/i, "").toLowerCase();
  return (
    <Link
      to="/codebook/$code"
      params={{ code: slug }}
      className="inline-flex h-9 items-center rounded-full bg-surface-2 px-3 font-mono text-xs text-fg hover:bg-primary-soft hover:text-primary"
    >
      {id}
    </Link>
  );
}

/** Literature Map family pill: English label only; internal key stays in the URL. */
export function FamilyPill({ id }: { id: string }) {
  const slug = id.replace(/\/M$/i, "").toLowerCase();
  const label = familyLabel(id);
  return (
    <Link
      to="/codebook/$code"
      params={{ code: slug }}
      className="inline-flex min-h-9 max-w-full items-center rounded-full bg-surface-2 px-3 py-1.5 text-xs leading-snug text-fg hover:bg-primary-soft hover:text-primary"
    >
      <span className="whitespace-normal break-words text-left">{label}</span>
    </Link>
  );
}
