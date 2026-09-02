import type { Confidence, Jurisdiction, Recognition } from "./types";

const REVIEW = "August 31, 2026";
const FORUM =
  "Carlton Research can speak to pattern analysis (coercive control breadth, depth, escalation, entrapment, and more). Research is built to the evidentiary rules of the jurisdiction that will hear it. Carlton Research does not recommend parenting time or custody. Research establishes whether a pattern of coercive control is present. Inquire about specific testimony requests or speaking engagements.";
const EXPERT =
  "Confirm the forum's reliability standard (Daubert, Frye, Sargon, or the local equivalent).";

function us(partial: Omit<Jurisdiction, "kind" | "lastReviewed" | "methodFit" | "expertStandard"> & Partial<Pick<Jurisdiction, "methodFit" | "expertStandard">>): Jurisdiction {
  return {
    kind: "us-state",
    lastReviewed: REVIEW,
    methodFit: FORUM,
    expertStandard: EXPERT,
    ...partial,
  };
}

function silentState(id: string, name: string, abbr: string, region: string, extra = ""): Jurisdiction {
  return us({
    id,
    name,
    abbr,
    region,
    recognition: ["silent"],
    statusLabel: "Not independently named",
    patternLanguage:
      "No statute independently naming coercive control was located for this orientation. Domestic-violence, harassment, or stalking provisions may still reach some of the same conduct. That is not the same as a pattern test.",
    statutes: [],
    confidence: "orientation",
    notes:
      extra ||
      "Silence is not absence of abuse. Silence is absence of a named pattern standard. Pattern analysis can still be offered if the forum's expert rules allow it; the report must not pretend the statute already uses the term.",
  });
}

export const jurisdictions: Jurisdiction[] = [
  us({
    id: "us-az",
    name: "Arizona",
    abbr: "AZ",
    region: "West",
    recognition: ["named-custody", "named-civil"],
    statusLabel: "Named in custody / DV definition (2026)",
    patternLanguage:
      "HB 2995 (Alec and Lydia Act, signed June 2026) treats coercive control as a pattern of violent, threatening, coercive, or emotionally abusive conduct, with enumerated tactics including isolation, financial monitoring, surveillance, coerced criminality, and weaponized litigation. Pattern language is statutory. A two-week cluster is not, by itself, the statutory pattern.",
    statutes: [
      { cite: "Ariz. Rev. Stat. § 25-403.03 (as amended by HB 2995, 2026)", year: 2026, note: "Custody / legal decision-making; coercive control folded into the domestic-violence definition." },
    ],
    confidence: "primary",
    carltonBrief: { title: "How Arizona HB 2995 integrates coercive control into family law", href: "https://carltonresearch.com/arizona-hb2995-coercive-control/" },
    notes: "Deep dossier. Ariz. Rev. Stat. § 25-403.03 (HB 2995) names specific behaviors. Naming them in the statute is not a finding that they are present in a case.",
  }),
  us({
    id: "us-ca",
    name: "California",
    abbr: "CA",
    region: "West",
    recognition: ["named-po", "named-civil"],
    statusLabel: "Named in DVRO / Family Code",
    patternLanguage:
      "Fam. Code § 6320(c) defines coercive control as a pattern of behavior that, in purpose or effect, unreasonably interferes with a person's free will and personal liberty. Examples include isolation, deprivation of necessities, controlling movement, and digital monitoring. Pattern is the statutory unit. Expert reliability in California is Sargon, not generic Daubert.",
    statutes: [
      { cite: "Cal. Fam. Code § 6320(c) (SB 1141, 2020)", year: 2020, note: "Disturbing the peace includes coercive control. Civil DVRO, not a standalone criminal offense." },
    ],
    expertStandard:
      "Sargon (Sargon Enterprises v. University of Southern California).",
    confidence: "primary",
    notes: "Civil, not criminal. A DVRO finding is not a custody recommendation, and Carlton Research does not make one.",
  }),
  us({
    id: "us-co",
    name: "Colorado",
    abbr: "CO",
    region: "West",
    recognition: ["named-civil", "named-po", "named-custody"],
    statusLabel: "Named; 2026 expert-witness bill",
    patternLanguage:
      "Colorado treats coercion / coercive control in family and protection-order settings. HB26-1309 addresses expert-witness standards for coercive-control evidence: the forum is asking for a regime, not an incident. The recurrence floor used in analysis is calibrated to the temporal scope of the records, not a fixed 3×3.",
    statutes: [
      { cite: "C.R.S. § 13-14-101", note: "Coercion in the definition of domestic abuse (protection orders)." },
      { cite: "Colorado HB26-1309 (2026)", year: 2026, note: "Expert-witness standards for coercive control in family court." },
    ],
    confidence: "primary",
    carltonBrief: { title: "Colorado HB26-1309 expert witness standards", href: "https://carltonresearch.com/colorado-hb26-1309-expert-witness-coercive-control/" },
    notes: "This is the brief that already states the floor is not a universal number. Use it.",
  }),
  us({
    id: "us-ct",
    name: "Connecticut",
    abbr: "CT",
    region: "Northeast",
    recognition: ["named-civil", "named-po"],
    statusLabel: "Named: Jennifer's Law",
    patternLanguage:
      "Conn. Gen. Stat. § 46b-1(b) (Jennifer's Law) defines coercive control as a pattern of behavior that unreasonably interferes with a person's free will and personal liberty, with a non-exhaustive list including isolation, digital monitoring, economic control, and immigration threats. Not a standalone criminal offense. Pattern is required; a single incident is not the statute.",
    statutes: [
      { cite: "Conn. Gen. Stat. § 46b-1(b)", year: 2021, note: "Jennifer's Law. Family relations." },
      { cite: "Connecticut coerced-debt provisions (effective 2025)", year: 2025, note: "Complementary economic-abuse protection." },
    ],
    confidence: "primary",
    carltonBrief: { title: "Connecticut coercive control law (Jennifer's Law)", href: "https://carltonresearch.com/connecticut-coercive-control-law/" },
    notes: "Strength: tactic list includes digital and economic control. Limit: judicial discretion; no standalone crime.",
  }),
  us({
    id: "us-hi",
    name: "Hawaii",
    abbr: "HI",
    region: "West",
    recognition: ["named-po", "named-criminal"],
    statusLabel: "Named civil; criminalizing path",
    patternLanguage:
      "Hawaii names coercive control in protective-order law (HRS § 586-1) and has taken the unusual U.S. step of a criminal path. Criminalization shifts what must be proved: a course of conduct, not a discrete assault. That shift is the burden-of-proof problem, not a shortcut to a finding.",
    statutes: [
      { cite: "Haw. Rev. Stat. § 586-1", note: "Coercive control in protection-order definitions." },
    ],
    confidence: "primary",
    carltonBrief: { title: "Hawaii's approach to criminalizing coercive control", href: "https://carltonresearch.com/hawaiis-criminalizing-coercive-control/" },
    notes: "Criminal and civil are different products. Do not import a criminal burden into a family-law evaluation, or the reverse.",
  }),
  us({
    id: "us-wa",
    name: "Washington",
    abbr: "WA",
    region: "West",
    recognition: ["named-po"],
    statusLabel: "Named in protection orders",
    patternLanguage:
      "RCW 7.105 names coercive control in the protection-order scheme: a pattern of behavior used to cause fear, decrease, or destroy a person's sense of safety, or to compel or induce a person to engage in conduct from which they have a right to abstain. Pattern is statutory.",
    statutes: [
      { cite: "Wash. Rev. Code § 7.105.010", note: "Coercive control defined for civil protection orders." },
    ],
    confidence: "primary",
    notes: "Protection-order definition. Confirm whether the family-law custody statute uses the same words; do not assume they travel automatically.",
  }),
  us({
    id: "us-nh",
    name: "New Hampshire",
    abbr: "NH",
    region: "Northeast",
    recognition: ["named-civil"],
    statusLabel: "2026 expert-witness alignment",
    patternLanguage:
      "RSA 173-B:1 has long reached a pattern of conduct. HB 1522 (2026) aligns expert-witness practice with forensic pattern analysis: examples in the statute are not quantitative thresholds. A calibrated recurrence floor belongs in the method, not in the statute.",
    statutes: [
      { cite: "N.H. Rev. Stat. Ann. § 173-B:1", note: "Pattern of conduct in the domestic-violence definition." },
      { cite: "New Hampshire HB 1522 (2026)", year: 2026, note: "Expert-witness alignment with forensic coercive-control pattern analysis." },
    ],
    confidence: "primary",
    carltonBrief: { title: "NH HB 1522 expert witness alignment", href: "https://carltonresearch.com/new-hampshire-hb-1522-expert-witness-coercive-control/" },
    notes: "The statute lists examples. It does not codify 3×3. Do not read a floor into the session law.",
  }),
  us({
    id: "us-ma",
    name: "Massachusetts",
    abbr: "MA",
    region: "Northeast",
    recognition: ["named-po", "named-civil"],
    statusLabel: "Named in abuse-prevention (2024)",
    patternLanguage:
      "H.4744 (signed 2024) defines coercive control as a pattern of behavior intended to threaten, intimidate, harass, isolate, control, coerce, or compel compliance of a family or household member, causing fear of physical harm or a reduced sense of safety or autonomy. Pattern is the unit. 209A is civil.",
    statutes: [
      { cite: "Mass. Gen. Laws ch. 209A, as amended 2024 (H.4744)", year: 2024, note: "Coercive control added to the abuse-prevention definition." },
    ],
    confidence: "secondary",
    notes: "Seventh U.S. state to classify CC as a form of domestic violence in this wave. Confirm current numbering in the General Laws before citing in a report.",
  }),
  us({
    id: "us-nj",
    name: "New Jersey",
    abbr: "NJ",
    region: "Northeast",
    recognition: ["named-po", "named-civil"],
    statusLabel: "Named in DV protection orders",
    patternLanguage:
      "New Jersey names coercive control in the domestic-violence protection-order definition (pattern of behavior intended to intimidate, harass, or control). Animal cruelty was added to the tactic list in 2024. Pattern, not incident.",
    statutes: [
      { cite: "N.J. domestic-violence / protection-order definitions, as amended", note: "Coercive control in the civil DV scheme." },
    ],
    confidence: "secondary",
    notes: "Cite the current N.J.S.A. section in the report. Do not treat a PO definition as a criminal offense.",
  }),
  us({
    id: "us-vt",
    name: "Vermont",
    abbr: "VT",
    region: "Northeast",
    recognition: ["named-civil"],
    statusLabel: "Named in abuse definition (2024)",
    patternLanguage:
      "Effective July 1, 2024, coercive control is included in Vermont's definition of abuse: a pattern of threatening, humiliating, or intimidating actions used to harm, punish, or frighten. Pattern is statutory.",
    statutes: [
      { cite: "Vermont abuse / relief-from-abuse statutes, as amended 2024", year: 2024, note: "Coercive control added to the definition of abuse." },
    ],
    confidence: "secondary",
    notes: "Confirm the Title 15 cite in the report. Civil definition.",
  }),
  us({
    id: "us-ok",
    name: "Oklahoma",
    abbr: "OK",
    region: "South",
    recognition: ["named-custody"],
    statusLabel: "Named in custody DV definition",
    patternLanguage:
      "Okla. Stat. tit. 43, § 109 uses 'coercive control' inside the domestic-violence definition that bears on custody. The word is there. The floor is not.",
    statutes: [{ cite: "Okla. Stat. tit. 43, § 109(I)(2)(a)", note: "Coercive control in the custody DV definition." }],
    confidence: "secondary",
    notes: "Family/custody, not a standalone crime. Pattern still has to be shown in the record.",
  }),
  us({
    id: "us-ms",
    name: "Mississippi",
    abbr: "MS",
    region: "South",
    recognition: ["named-po"],
    statusLabel: "Named in protective-order definition",
    patternLanguage:
      "Miss. Code § 93-21-125 includes a pattern of behavior or coercive control in the domestic-violence definition used for protective orders.",
    statutes: [{ cite: "Miss. Code Ann. § 93-21-125", note: "Pattern of behavior or coercive control." }],
    confidence: "secondary",
    notes: "Protective-order setting. Confirm whether custody statutes cross-adopt the definition.",
  }),
  us({
    id: "us-ar",
    name: "Arkansas",
    abbr: "AR",
    region: "South",
    recognition: ["related"],
    statusLabel: "Related: 'course of control'",
    patternLanguage:
      "Ark. Code § 9-15-219 uses 'course of control,' not the words coercive control. Related, not identical. Do not equate the phrases in a report without saying so.",
    statutes: [{ cite: "Ark. Code Ann. § 9-15-219", note: "Course of control, protective-order context." }],
    confidence: "secondary",
    notes: "Related language. The statute does not already name the behavior.",
  }),
  us({
    id: "us-il",
    name: "Illinois",
    abbr: "IL",
    region: "Midwest",
    recognition: ["related"],
    statusLabel: "Related: interference with personal liberty",
    patternLanguage:
      "750 ILCS 60/103 reaches interference with personal liberty. That is a cousin of the California 'free will and personal liberty' formulation, not a named CC statute.",
    statutes: [{ cite: "750 Ill. Comp. Stat. 60/103", note: "Interference with personal liberty in the IDVA." }],
    confidence: "secondary",
    notes: "Related. Pending CC bills have been filed; they are not law until they are law.",
  }),
  us({
    id: "us-ky",
    name: "Kentucky",
    abbr: "KY",
    region: "South",
    recognition: ["related"],
    statusLabel: "Related / family-civil (verify cite)",
    patternLanguage:
      "Secondary 2026 reporting lists Kentucky among states that have incorporated coercive-control ideas into family or civil definitions. Verify the current KRS cite before a report. Do not cite this card as the statute.",
    statutes: [],
    confidence: "orientation",
    notes: "Needs a primary-statute pass. Orientation only.",
  }),
  us({
    id: "us-la",
    name: "Louisiana",
    abbr: "LA",
    region: "South",
    recognition: ["related"],
    statusLabel: "Related: isolation / exploitation language",
    patternLanguage:
      "La. R.S. 46:2132 and related provisions reach isolation and exploitation in the DV definition. Related conduct, not necessarily the words 'coercive control.'",
    statutes: [{ cite: "La. Stat. Ann. § 46:2132", note: "DV definition; isolation / exploitation." }],
    confidence: "secondary",
    notes: "Related. Confirm whether later amendments inserted the term itself.",
  }),
  us({
    id: "us-me",
    name: "Maine",
    abbr: "ME",
    region: "Northeast",
    recognition: ["related"],
    statusLabel: "Related: compelling by force, threat, or intimidation",
    patternLanguage:
      "19-A M.R.S. § 4002 reaches compelling by force, threat, or intimidation. Related, not a full Stark-style course-of-conduct offense.",
    statutes: [{ cite: "Me. Rev. Stat. tit. 19-A, § 4002", note: "Compelling by force, threat, or intimidation." }],
    confidence: "secondary",
    notes: "Related language in family/PO setting.",
  }),
  us({
    id: "us-de",
    name: "Delaware",
    abbr: "DE",
    region: "Northeast",
    recognition: ["related"],
    statusLabel: "Related: course of alarming conduct",
    patternLanguage: "10 Del. C. § 1041 reaches a course of alarming or distressing conduct. Course, not incident, but not the words coercive control.",
    statutes: [{ cite: "Del. Code Ann. tit. 10, § 1041", note: "Course of alarming or distressing conduct." }],
    confidence: "secondary",
    notes: "Related. Course-of-conduct is the opening; domination is not presumed.",
  }),
  us({
    id: "us-mi",
    name: "Michigan",
    abbr: "MI",
    region: "Midwest",
    recognition: ["related"],
    statusLabel: "Related: coercive language in PO / mediation",
    patternLanguage: "MCL 600.2950 and 600.1035 use coercive language in protection-order and mediation-inquiry settings.",
    statutes: [
      { cite: "Mich. Comp. Laws § 600.2950", note: "Protection orders." },
      { cite: "Mich. Comp. Laws § 600.1035", note: "Inquiry in mediation." },
    ],
    confidence: "secondary",
    notes: "Related. Not a full named-CC custody statute.",
  }),
  us({
    id: "us-mo",
    name: "Missouri",
    abbr: "MO",
    region: "Midwest",
    recognition: ["related"],
    statusLabel: "Related: coercion in DV definition",
    patternLanguage: "Mo. Rev. Stat. § 455.010 includes coercion in the domestic-violence definition.",
    statutes: [{ cite: "Mo. Rev. Stat. § 455.010", note: "Coercion in the DV definition." }],
    confidence: "secondary",
    notes: "Related word, not a pattern-test statute.",
  }),
  us({
    id: "us-ne",
    name: "Nebraska",
    abbr: "NE",
    region: "Midwest",
    recognition: ["related"],
    statusLabel: "Related: coercion / intimidation in intimate-partner abuse",
    patternLanguage: "Neb. Rev. Stat. § 43-2922 uses coercion or intimidation in the definition of domestic intimate-partner abuse (parenting-act context).",
    statutes: [{ cite: "Neb. Rev. Stat. § 43-2922", note: "Coercion or intimidation." }],
    confidence: "secondary",
    notes: "Related, family context.",
  }),
  us({
    id: "us-nv",
    name: "Nevada",
    abbr: "NV",
    region: "West",
    recognition: ["related"],
    statusLabel: "Related: coercion",
    patternLanguage: "NRS 33.018 and 207.190 reach coercive conduct in PO / coercion statutes.",
    statutes: [{ cite: "Nev. Rev. Stat. §§ 33.018, 207.190", note: "Coercion; protection orders." }],
    confidence: "secondary",
    notes: "Related.",
  }),
  us({
    id: "us-or",
    name: "Oregon",
    abbr: "OR",
    region: "West",
    recognition: ["related"],
    statusLabel: "Related: abuse definitions including molestation / course",
    patternLanguage: "ORS 107.705 is the family-abuse definition. Related conduct may be reached without the words coercive control.",
    statutes: [{ cite: "Or. Rev. Stat. § 107.705", note: "Abuse defined for FAPA orders." }],
    confidence: "secondary",
    notes: "Related. Do not overclaim naming.",
  }),
  us({
    id: "us-ny",
    name: "New York",
    abbr: "NY",
    region: "Northeast",
    recognition: ["pending"],
    statusLabel: "Pending / not independently named",
    patternLanguage:
      "No enacted statewide naming located as of this review. Family Court Act and related bills (including 2025-26 proposals) have sought to add coercive control. Pending is not law. Expert standard remains Frye in New York courts unless and until the forum says otherwise.",
    statutes: [],
    expertStandard: "Frye (New York). Reliability is general acceptance in the relevant field.",
    confidence: "orientation",
    notes: "Watch the session. Do not cite a bill as a statute.",
  }),
  us({
    id: "us-md",
    name: "Maryland",
    abbr: "MD",
    region: "South",
    recognition: ["pending"],
    statusLabel: "Pending / not independently named",
    patternLanguage: "Secondary 2026 reporting lists Maryland among jurisdictions considering naming. Not law as of this review.",
    statutes: [],
    confidence: "orientation",
    notes: "Pending is not a forum standard.",
  }),
  silentState("us-al", "Alabama", "AL", "South"),
  silentState("us-ak", "Alaska", "AK", "West"),
  silentState("us-fl", "Florida", "FL", "South"),
  silentState("us-ga", "Georgia", "GA", "South"),
  silentState("us-id", "Idaho", "ID", "West"),
  silentState("us-in", "Indiana", "IN", "Midwest"),
  silentState("us-ia", "Iowa", "IA", "Midwest"),
  silentState("us-ks", "Kansas", "KS", "Midwest"),
  silentState("us-mn", "Minnesota", "MN", "Midwest"),
  silentState("us-mt", "Montana", "MT", "West", "Montana has an intimidation statute (MCA 45-5-203). That is not a coercive-control naming."),
  silentState("us-nc", "North Carolina", "NC", "South"),
  silentState("us-nd", "North Dakota", "ND", "Midwest"),
  silentState("us-oh", "Ohio", "OH", "Midwest"),
  silentState("us-pa", "Pennsylvania", "PA", "Northeast"),
  silentState("us-ri", "Rhode Island", "RI", "Northeast"),
  silentState("us-sc", "South Carolina", "SC", "South"),
  silentState("us-sd", "South Dakota", "SD", "Midwest"),
  silentState("us-tn", "Tennessee", "TN", "South"),
  silentState("us-tx", "Texas", "TX", "South"),
  silentState("us-ut", "Utah", "UT", "West"),
  silentState("us-va", "Virginia", "VA", "South"),
  silentState("us-wv", "West Virginia", "WV", "South", "W. Va. Code § 48-27-202 includes psychological abuse in the DV definition. Related conduct may be reached; the term coercive control is not treated as named here."),
  silentState("us-wi", "Wisconsin", "WI", "Midwest"),
  silentState("us-wy", "Wyoming", "WY", "West"),
  silentState("us-nm", "New Mexico", "NM", "West"),
  {
    id: "us-dc",
    name: "District of Columbia",
    abbr: "DC",
    kind: "us-dc",
    region: "South",
    recognition: ["related"],
    statusLabel: "Related: coercive language in limited settings",
    patternLanguage: "D.C. provisions use 'coercive' in some family and collaborative-law settings. Not treated here as a full named-CC statute.",
    statutes: [],
    expertStandard: EXPERT,
    methodFit: FORUM,
    lastReviewed: REVIEW,
    confidence: "orientation",
    notes: "Verify the current D.C. Code cite before a report.",
  },
  {
    id: "ew",
    name: "England and Wales",
    abbr: "E&W",
    kind: "international",
    region: "International",
    recognition: ["named-criminal"],
    statusLabel: "Criminal course-of-conduct offense (2015)",
    patternLanguage:
      "Serious Crime Act 2015 s. 76: controlling or coercive behaviour in an intimate or family relationship. The unit is a course of conduct that has a serious effect. A single incident is not the offense. Later Domestic Abuse Act 2021 reforms sit alongside, not in place of, s. 76.",
    statutes: [{ cite: "Serious Crime Act 2015, s. 76", year: 2015, note: "Controlling or coercive behaviour." }],
    expertStandard: "English criminal courts: relevance and reliability under the common law and CrimPR. Not Daubert.",
    methodFit: FORUM,
    lastReviewed: REVIEW,
    confidence: "primary",
    notes: "The first major criminalization. Burden of proof is criminal. Do not import it into a U.S. family-law report as if it were the same product.",
  },
  {
    id: "sct",
    name: "Scotland",
    abbr: "SCT",
    kind: "international",
    region: "International",
    recognition: ["named-criminal"],
    statusLabel: "Criminal course-of-conduct offense (2018)",
    patternLanguage:
      "Domestic Abuse (Scotland) Act 2018: a course of behavior that is abusive, including behavior directed at a child. Psychological domination is inside the offense, not an add-on.",
    statutes: [{ cite: "Domestic Abuse (Scotland) Act 2018", year: 2018, note: "Course of abusive behaviour." }],
    expertStandard: "Scottish criminal courts. Not Daubert.",
    methodFit: FORUM,
    lastReviewed: REVIEW,
    confidence: "primary",
    notes: "Often cited as the cleaner course-of-conduct draft. Still a criminal product.",
  },
  {
    id: "nsw",
    name: "New South Wales",
    abbr: "NSW",
    kind: "international",
    region: "International",
    recognition: ["named-criminal"],
    statusLabel: "Criminal offense from July 1, 2024",
    patternLanguage:
      "NSW criminalized coercive control as abusive behaviors toward a current or former intimate partner, in a course of conduct, from July 1, 2024. Pattern is the offense.",
    statutes: [{ cite: "Crimes Legislation Amendment (Coercive Control) Act 2022 (NSW)", year: 2024, note: "Offense commenced July 1, 2024." }],
    expertStandard: "Australian criminal courts. Not Daubert.",
    methodFit: FORUM,
    lastReviewed: REVIEW,
    confidence: "primary",
    carltonBrief: { title: "NSW and Queensland offenses", href: "https://carltonresearch.com/nsw-queensland-coercive-control/" },
    notes: "Criminalization shifts the burden. See the Carlton brief on what that does to proof.",
  },
  {
    id: "qld",
    name: "Queensland",
    abbr: "QLD",
    kind: "international",
    region: "International",
    recognition: ["named-criminal"],
    statusLabel: "Criminal offense (staged)",
    patternLanguage:
      "Queensland's criminalization of coercive control sits with NSW as the Australian pair. Course of abusive behaviors, not a single punch.",
    statutes: [{ cite: "Queensland coercive-control criminalization (staged commencement)", note: "See the Carlton NSW/QLD brief for the comparison." }],
    expertStandard: "Australian criminal courts. Not Daubert.",
    methodFit: FORUM,
    lastReviewed: REVIEW,
    confidence: "primary",
    carltonBrief: { title: "NSW and Queensland offenses", href: "https://carltonresearch.com/nsw-queensland-coercive-control/" },
    notes: "Read against NSW. Do not collapse the two drafts.",
  },
  {
    id: "ca",
    name: "Canada",
    abbr: "CA",
    kind: "international",
    region: "International",
    recognition: ["pending"],
    statusLabel: "Federal criminal offence enacted; not yet in force",
    patternLanguage:
      "Federal only. Bill C-16 (Protecting Victims Act) creates a Criminal Code offence prohibiting a pattern of coercive or controlling conduct toward an intimate partner. Royal Assent 18 June 2026. Justice Canada: the coercive-control provisions come into force no later than two years after Royal Assent to allow training. Enacted is not the same as in force. Separately, the Divorce Act already defines family violence to include coercive and controlling behaviour. That definition is family-law framing, not the criminal offence.",
    statutes: [
      {
        cite: "Protecting Victims Act (Bill C-16), Royal Assent 18 June 2026",
        year: 2026,
        note: "Federal criminal pattern offence of coercive or controlling conduct toward an intimate partner. Commencement of the coercive-control offence delayed up to two years after Royal Assent. Source: Justice Canada C-16 page; Parliament of Canada LEGISinfo C-16.",
      },
      {
        cite: "Divorce Act, s. 2(1) (family violence definition)",
        note: "Includes coercive and controlling behaviour in the family-violence definition. Definitional / family law. Not a standalone criminal offence.",
      },
    ],
    expertStandard: "Canadian criminal and family courts. Not Daubert.",
    methodFit: FORUM,
    lastReviewed: "September 2, 2026",
    confidence: "primary",
    notes:
      "Federal frame only. No provincial rows are added without official named-term sources. Do not treat Divorce Act definitional language as the C-16 criminal offence, and do not treat Royal Assent as commencement.",
  },
];

export const recognitionLabels: Record<Recognition, string> = {
  "named-civil": "Named: civil / family",
  "named-criminal": "Named: criminal",
  "named-custody": "Named: custody",
  "named-po": "Named: protection order",
  related: "Related language",
  silent: "Not independently named",
  pending: "Pending",
};

export function primaryStatus(j: Jurisdiction): Recognition {
  if (j.recognition.includes("named-criminal")) return "named-criminal";
  if (j.recognition.includes("named-custody")) return "named-custody";
  if (j.recognition.includes("named-po")) return "named-po";
  if (j.recognition.includes("named-civil")) return "named-civil";
  if (j.recognition.includes("pending")) return "pending";
  if (j.recognition.includes("related")) return "related";
  return "silent";
}

export function isNamed(j: Jurisdiction) {
  return j.recognition.some((r) => r.startsWith("named"));
}

export function getJurisdiction(id: string) {
  return jurisdictions.find((j) => j.id === id);
}

export function usJurisdictions() {
  return jurisdictions.filter((j) => j.kind !== "international");
}

export function intlJurisdictions() {
  return jurisdictions.filter((j) => j.kind === "international");
}

export const confidenceLabels: Record<Confidence, string> = {
  primary: "Primary / Carlton brief or statute text",
  secondary: "Secondary: verify cite in the report",
  orientation: "Orientation only: not for citation as law",
};
