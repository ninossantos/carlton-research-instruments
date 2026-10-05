/**
 * Observatory email signup configuration.
 *
 * The signup form stays OFF until BOTH values below are filled in.
 * While either is empty, the form renders in a disabled "Signups open soon"
 * state and sends no data anywhere.
 *
 * To switch it on, paste the HubSpot portal (Hub) ID and the form GUID of the
 * HubSpot form, confirm the internal property names in SIGNUP_FIELD_NAMES,
 * then rebuild and deploy. Submissions go to the HubSpot Forms Submission API:
 *   https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
 */
export const HUBSPOT_PORTAL_ID = "";
export const HUBSPOT_FORM_GUID = "";

/**
 * Optional: HubSpot subscription type IDs, one per audience, so HubSpot
 * records consent and handles unsubscribes. Leave empty to skip
 * legalConsentOptions in the submission.
 */
export const HUBSPOT_SUBSCRIPTION_TYPE_IDS: Record<AudienceValue, number | null> = {
  Legal: null,
  "Treatment Providers & Evaluators": null,
  Individuals: null,
};

/** Internal names of the HubSpot properties on the form. Confirm in HubSpot. */
export const SIGNUP_FIELD_NAMES = {
  email: "email",
  firstName: "firstname",
  lastName: "lastname",
  firm: "company",
  audience: "audience",
  signupSource: "signup_source",
  signupDate: "signup_date",
} as const;

export const SIGNUP_SOURCE = "Observatory homepage";

export const AUDIENCE_OPTIONS = [
  { value: "Legal", label: "Legal", detail: "Attorney, judge, advocate" },
  { value: "Treatment Providers & Evaluators", label: "Treatment Providers & Evaluators" },
  { value: "Individuals", label: "Individuals" },
] as const;

export type AudienceValue = (typeof AUDIENCE_OPTIONS)[number]["value"];

export const SIGNUP_ENABLED = HUBSPOT_PORTAL_ID.trim() !== "" && HUBSPOT_FORM_GUID.trim() !== "";

export function hubspotSubmitUrl(): string | null {
  if (!SIGNUP_ENABLED) return null;
  return `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(
    HUBSPOT_PORTAL_ID.trim(),
  )}/${encodeURIComponent(HUBSPOT_FORM_GUID.trim())}`;
}
