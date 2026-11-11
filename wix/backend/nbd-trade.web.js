// Web methods for the Trade Catalogue page. Every call checks the member's role
// on the server, so a customer only ever sees and orders their own company's signs.
import { Permissions, webMethod } from 'wix-web-module';
import { currentCart } from 'wix-ecom-backend';
import { CATALOG_APP_ID } from 'backend/nbd-config';
import { whoIsTrade, signsFor, getSign, canSee, publicSign, logoFor } from 'backend/nbd-trade-data';

export const getMyTradeCatalog = webMethod(Permissions.SiteMember, async () => {
  const who = await whoIsTrade();
  if (!who) return { status: 'login' };
  if (!who.admin && who.companies.length === 0) return { status: 'pending' };
  const signs = (await signsFor(who)).map(publicSign);
  const company = who.admin ? 'All trade accounts' : who.companies.join(' / ');
  const logo = await logoFor(who);
  return { status: 'ok', admin: who.admin, company, logo, signs };
});

export const addTradeSignToCart = webMethod(Permissions.SiteMember, async (signId, qty) => {
  const who = await whoIsTrade();
  const sign = await getSign(signId);
  if (!sign || !sign.active || !canSee(who, sign)) throw new Error('That sign isn\'t on your account. Contact us on 0425 420 790.');
  const quantity = Math.min(1000, Math.max(1, parseInt(qty, 10) || 1));
  await currentCart.addToCurrentCart({
    lineItems: [{ catalogReference: { appId: CATALOG_APP_ID, catalogItemId: 'trade-sign', options: { sign: String(sign._id) } }, quantity }]
  });
  return { ok: true };
});
