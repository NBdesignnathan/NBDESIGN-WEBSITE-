// Trade catalogue data helpers (backend only, not callable from the browser).
// Signs on file live in the CMS collection "TradeSigns". Set its permissions to Admin only
// (Read, Create, Update, Delete); this code reads it on behalf of the right trade customer.
//
// TradeSigns fields (field keys must match):
//   title (Text)     Sign name, e.g. "Site entry - visitors report to office"
//   code (Text)      Your reference / SKU, e.g. "BLOC-001"
//   company (Text)   Must match the member role name exactly, e.g. "BLOC"
//   image (Image)    Photo or proof of the sign
//   width (Number)   mm
//   height (Number)  mm
//   material (Text)  e.g. "5mm corflute, double sided, 4 holes"
//   price (Number)   Trade price per sign, AUD incl. GST
//   active (Boolean) Untick to hide a sign without deleting it

import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';

export const TRADE_COLLECTION = 'TradeSigns';
// Optional: one row per trade company with its logo. Fields: company (Text, matches the role), logo (Image).
// Permissions: Admin only. If the collection doesn't exist, catalogues simply show the company name.
export const ACCOUNTS_COLLECTION = 'TradeAccounts';

// Turns a Wix image value into a normal web address the catalogue can show
export function imageUrl(src) {
  if (!src) return '';
  const m = /^wix:image:\/\/v1\/([^/]+)\//.exec(src);
  return m ? `https://static.wixstatic.com/media/${m[1]}` : src;
}

// Returns { admin, companies[] } for the logged-in member, or null if not logged in
export async function whoIsTrade() {
  let roles;
  try { roles = await currentMember.getRoles(); } catch (e) { return null; }
  const titles = (roles || []).map((r) => String(r.title || '').trim()).filter(Boolean);
  const admin = titles.includes('Admin');
  const companies = titles.filter((t) => t !== 'Admin');
  return { admin, companies };
}

export function canSee(who, sign) {
  if (!who || !sign) return false;
  if (who.admin) return true;
  const c = String(sign.company || '').trim().toLowerCase();
  return who.companies.some((x) => x.toLowerCase() === c);
}

export async function getSign(id) {
  if (!id) return null;
  try { return await wixData.get(TRADE_COLLECTION, String(id), { suppressAuth: true }); } catch (e) { return null; }
}

export async function signsFor(who) {
  let q = wixData.query(TRADE_COLLECTION).eq('active', true).ascending('code').limit(1000);
  if (!who.admin) q = q.hasSome('company', who.companies);
  const res = await q.find({ suppressAuth: true });
  // hasSome is case-sensitive, so double-check with canSee
  return res.items.filter((s) => canSee(who, s));
}

// Only the fields the customer needs; nothing else from the collection leaves the backend
export function publicSign(s) {
  return {
    id: s._id, title: s.title || 'Sign', code: s.code || '', company: s.company || '',
    image: imageUrl(s.image), w: Number(s.width) || 0, h: Number(s.height) || 0,
    material: s.material || '', price: Math.round((Number(s.price) || 0) * 100) / 100
  };
}

// Logo for the member's company (not shown for the site owner's all-accounts view)
export async function logoFor(who) {
  if (!who || who.admin || who.companies.length !== 1) return '';
  try {
    const res = await wixData.query(ACCOUNTS_COLLECTION).find({ suppressAuth: true });
    const want = who.companies[0].toLowerCase();
    const row = res.items.find((r) => String(r.company || '').trim().toLowerCase() === want);
    return row ? imageUrl(row.logo) : '';
  } catch (e) {
    return '';
  }
}
