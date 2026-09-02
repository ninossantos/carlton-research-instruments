export const INSTRUMENT_YEAR = 2026;
export const PRINCIPAL = "Carlton, C.";
export const FIRM = "Carlton Research, LLC";
export const INSTRUMENTS_ORIGIN = "https://instruments.carltonresearch.com";

/** APA-style cite without URL (Carisa, 2026-09-01). path kept for call-site compatibility. */
export function citeInstrument(title: string, path: string, lastReviewed: string) {
  void path;
  const titleMark = /[.!?]$/.test(title) ? "" : ".";
  return `${PRINCIPAL} (${INSTRUMENT_YEAR}). ${title}${titleMark} Coercive Control Observatory. Last reviewed ${lastReviewed}.`;
}

export const globalDisclaimer =
  "Not legal advice.";

export const proprietaryFooter =
  "The Coercive Control Observatory is a proprietary product of Carlton Research, LLC. All rights reserved.";

export const behaviorDisclaimer = "";

export const noUploadDisclaimer =
  "Do not upload anything. This site has no upload. Do not send a file, screenshot, export, or document. Do not send anything that contains a child's name. A de-identifier is not a solution: the name would have to be uploaded first.";
