export const METHOD_LAST_REVIEWED = "August 31, 2026";

/** Canonical definition for this instrument. Used everywhere the phrase is defined. */
export const definition = {
  name: "Coercive control",
  sentence:
    "For this instrument, coercive control is a pattern of domination. A pattern exists only when four elements are present together: repetition, relatedness, continuity, and asymmetry.",
  not: "A tactic is not a pattern. A hostile sentence is not control. A civil sentence is not its absence. A two-week cluster is not a regime. A 3×3 count is not the method.",
  test: "Course of conduct is the object. The four elements are the test. None of the four is optional. None is a tactic count.",
  harm: "The harm is cumulative deprivation of autonomy, personhood, and everyday freedom, often through conduct that is non-violent and unremarkable in isolation.",
};

export const patternElements = [
  {
    id: "repetition",
    name: "Repetition",
    short: "Quantity. One-off acts and isolated clusters fall short.",
    body: "Repetition is quantity of acts. One-off incidents or isolated clusters do not, by themselves, constitute a pattern. A recurrence floor is then applied so that quantity is meaningful relative to the length of the file, not as a universal count. The floor does not test relatedness.",
  },
  {
    id: "relatedness",
    name: "Relatedness",
    short: "The acts share purpose, result, participants, targets, or method.",
    body: "Relatedness is not measured by the recurrence floor. The acts share similar purposes, results, participants, targets, and/or methods of commission. Unrelated slights, even if numerous, are not a pattern of domination.",
  },
  {
    id: "continuity",
    name: "Continuity",
    short: "Ongoing activity, or the threat of ongoing activity, not a sporadic cluster.",
    body: "Continuity: the activity amounts to, or threatens to amount to, ongoing activity rather than isolated or sporadic acts. A two-week burst around a hearing is not the same object as a two-year regime. The recurrence floor, when used, tests continuity together with repetition. The floor does not test relatedness or asymmetry.",
  },
  {
    id: "asymmetry",
    name: "Asymmetry",
    short: "A measurable imbalance in volume, direction, or initiative.",
    body: "Asymmetry is a measurable imbalance in the volume, direction, or initiative of acts between the two parties. Analysis establishes asymmetry. Analysis does not assume asymmetry. The file is coded in both directions. Hostile symmetry (two people fighting) is an alternative explanation that can defeat a regime finding even when messages are ugly. Asymmetry is not a count of three.",
  },
] as const;

export const floorRules = {
  headline: "The recurrence floor is calibrated to the corpus, not a universal 3×3.",
  whatItTests: ["repetition", "continuity"] as const,
  whatItDoesNotTest: ["relatedness", "asymmetry"] as const,
  threeByThree:
    "Three messages in three time periods is one calibration for a corpus whose span can actually support three periods. That calibration is not the method, and does not apply to every file.",
  twoWeek:
    "A two-week timeline cannot be asked to produce three time periods of the grain used on a two-year file. Forcing 3×3 onto a short record either invents periods or misses a concentrated campaign. The floor must shrink or change grain with the material.",
  twoYear:
    "On a long file, a floor that is too low elevates anomalies and clustered bursts into a regime finding. Repetition plus temporal distribution is what keeps a weekend of fighting from being treated as sustained control.",
  doubt: "Doubt defaults to uncoded.",
  alternatives: [
    "Ordinary conflict over a discrete dispute",
    "Symmetrical high conflict",
    "A time-limited cluster around a court date, move, or disclosure",
    "Protective documentation by the target of control",
  ],
  beforeTheFile:
    "Behavioral categories are drawn from published literature and finalized before the file is opened, to avoid circularity.",
  product:
    "The product is a jurisdiction-specific, evidentiary-standard evaluation a factfinder can test. Carlton Research does not perform clinical evaluations and does not recommend parenting time.",
};

export function floorGuidance(spanDays: number): {
  label: string;
  grain: string;
  threeByThreeAppropriate: boolean;
  note: string;
} {
  if (spanDays <= 21) {
    return {
      label: "Short corpus",
      grain: "Days, not months. Periods of a week would collapse the file into one or two bins.",
      threeByThreeAppropriate: false,
      note: "A 3×3 test does not work here. Calibrate the recurrence floor to this span, or treat the file as too short for a continuity finding and say so.",
    };
  }
  if (spanDays <= 90) {
    return {
      label: "Medium corpus",
      grain: "Weeks. Three periods are possible only if the conduct is actually distributed, not bunched.",
      threeByThreeAppropriate: false,
      note: "Three periods may be mathematically available. They are not automatic. Check whether the acts are distributed or clustered around a single event.",
    };
  }
  return {
    label: "Long corpus",
    grain: "Months. A 3-message × 3-period calibration can be meaningful if the periods are real slices of the span.",
    threeByThreeAppropriate: true,
    note: "This is the kind of file for which a 3×3 calibration is sometimes used. The calibration still tests only repetition and continuity. Relatedness and asymmetry are separate. A floor set too low will promote bursts to a regime.",
  };
}
