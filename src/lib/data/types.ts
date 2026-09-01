export type Recognition =
  | "named-civil"
  | "named-criminal"
  | "named-custody"
  | "named-po"
  | "related"
  | "silent"
  | "pending";

export type Confidence = "primary" | "secondary" | "orientation";

export type JurisdictionKind = "us-state" | "us-dc" | "international";

export type Statute = {
  cite: string;
  year?: number;
  note: string;
};

export type Jurisdiction = {
  id: string;
  name: string;
  abbr: string;
  kind: JurisdictionKind;
  region: string;
  recognition: Recognition[];
  statusLabel: string;
  patternLanguage: string;
  statutes: Statute[];
  expertStandard: string;
  methodFit: string;
  carltonBrief?: { title: string; href: string };
  lastReviewed: string;
  confidence: Confidence;
  notes: string;
};
