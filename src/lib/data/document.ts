import { getCategory, type Category } from "./codes";
import { jurisdictions } from "./jurisdictions";
import { literature, type Source } from "./literature";

/** Statutes that name behaviors, mapped onto public families. Empty means the forum names a pattern without picking families. */
export const forumFamilies: Record<string, string[]> = {
  "us-az": ["ISO", "ECO", "SUR", "CRIM", "INST"],
  "us-ca": ["ISO", "REG", "SUR"],
  "us-ct": ["ISO", "SUR", "ECO", "INST"],
  "us-ma": ["THR", "HAR", "ISO"],
  "us-nj": ["THR", "HAR"],
  "us-vt": ["THR", "DEG"],
  "us-wa": ["THR", "REG"],
  "us-la": ["ISO", "ECO"],
  ew: ["ISO", "REG"],
  sct: ["ISO"],
  nsw: ["ISO"],
  qld: ["ISO"],
};

export function familiesForForum(id: string): Category[] {
  return (forumFamilies[id] ?? [])
    .map((fid) => getCategory(fid))
    .filter((c): c is Category => c != null);
}

export function forumsForFamily(familyId: string) {
  const id = familyId.toUpperCase();
  return jurisdictions.filter((j) => (forumFamilies[j.id] ?? []).includes(id));
}

export function literatureForFamily(familyId: string): Source[] {
  const id = familyId.toUpperCase();
  return literature.filter((s) => s.families?.includes(id));
}
