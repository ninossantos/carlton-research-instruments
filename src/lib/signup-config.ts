/**
 * Observatory email signup configuration (HubSpot Forms v3 submission API).
 *
 * The form is enabled only when BOTH the portal ID and form GUID are set.
 * HubSpot form: "Stay Updated on Coercive Control" (region na2).
 *
 * Audience (Legal / Treatment Providers & Evaluators / Individuals) was removed
 * because the HubSpot form has no Audience property yet, and unknown fields can
 * cause HubSpot to reject the submission. Re-add the radio group and an
 * { objectTypeId: "0-1", name: "<audience property>" } field once HubSpot has an
 * Audience property on this form.
 */
export const HUBSPOT_PORTAL_ID = "247432344";
export const HUBSPOT_FORM_GUID = "1705a593-5afd-4d51-8e26-820340fd2433";

/** Fixed page context sent with every submission. */
export const SIGNUP_PAGE_URI = "https://observatory.carltonresearch.com";
export const SIGNUP_PAGE_NAME = "Observatory";

export const SIGNUP_ENABLED = HUBSPOT_PORTAL_ID.trim() !== "" && HUBSPOT_FORM_GUID.trim() !== "";

export function hubspotSubmitUrl(): string | null {
  if (!SIGNUP_ENABLED) return null;
  return `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(
    HUBSPOT_PORTAL_ID.trim(),
  )}/${encodeURIComponent(HUBSPOT_FORM_GUID.trim())}`;
}

/** HubSpot tracking cookie, if the visitor has one. */
export function readHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : undefined;
}

type HsField = { objectTypeId: "0-1"; name: string; value: string };

export function buildHubspotPayload(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  hutk?: string;
}) {
  const fields: HsField[] = [
    { objectTypeId: "0-1", name: "email", value: input.email.trim() },
    { objectTypeId: "0-1", name: "firstname", value: (input.firstName ?? "").trim() },
    { objectTypeId: "0-1", name: "lastname", value: (input.lastName ?? "").trim() },
  ].filter((f): f is HsField => f.value !== "") as HsField[];
  const context: Record<string, string> = { pageUri: SIGNUP_PAGE_URI, pageName: SIGNUP_PAGE_NAME };
  if (input.hutk) context.hutk = input.hutk;
  return { fields, context };
}
