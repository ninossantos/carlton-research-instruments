export const INSTRUMENT_YEAR = 2026;
export const PRINCIPAL = "Carlton, C.";
export const FIRM = "Carlton Research, LLC";
export const INSTRUMENTS_ORIGIN = "https://instruments.carltonresearch.com";

export function citeInstrument(title: string, path: string, lastReviewed: string) {
  const titleMark = /[.!?]$/.test(title) ? "" : ".";
  let url: string;
  if (/^https?:\/\//i.test(path)) {
    url = path;
  } else if (!path || path === "/") {
    url = `${INSTRUMENTS_ORIGIN}/`;
  } else {
    url = `${INSTRUMENTS_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
  }
  return `${PRINCIPAL} (${INSTRUMENT_YEAR}). ${title}${titleMark} Carlton Research Instruments. ${url}. Last reviewed ${lastReviewed}.`;
}

export const globalDisclaimer =
  "Not diagnostic of a pattern of coercive control. Not legal advice.";

export const behaviorDisclaimer =
  "Identifying a behavior described here does not establish a pattern of behavior and does not establish coercive control. A tactic is not a regime. The instrument consolidates peer-reviewed literature so a reader can check when in doubt. The instrument is not a coding manual. Carlton Research does not provide the instrument as a weapon.";

export const noUploadDisclaimer =
  "Do not upload anything. This site has no upload. Do not send a file, screenshot, export, or document. Do not send anything that contains a child's name. A de-identifier is not a solution: the name would have to be uploaded first.";
