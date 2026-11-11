// Web methods called by the Order Signs page.
import { Permissions, webMethod } from 'wix-web-module';
import { currentCart } from 'wix-ecom-backend';
import { CATALOG_APP_ID } from 'backend/nbd-config';
import { PRODUCTS, TIERS, SPEED, ART, DESIGN_FEE, MIN_MM, FREIGHT, MARKUP, ORDER_MIN, cleanConfig, toRefOptions } from 'backend/nbd-pricing';
import { CATALOGUE, SIGN_TYPES, SIGN_CATS } from 'backend/nbd-catalogue';

// Sends the product list and price rules to the configurator
export const getStoreConfig = webMethod(Permissions.Anyone, async () => {
  return { products: PRODUCTS, tiers: TIERS, speed: SPEED, art: ART, designFee: DESIGN_FEE, minMm: MIN_MM, freight: FREIGHT, markup: MARKUP, orderMin: ORDER_MIN,
    shopUrl: '/',
    orderUrl: '/order-signs', // your Order Signs page (used by the AI artwork helper) // where the "All products" button goes: the page with your product tiles, e.g. '/' or '/shop'
    catalogue: CATALOGUE, signTypes: SIGN_TYPES, signCats: SIGN_CATS };
});

// Adds one configured sign (plus the design service, if chosen) to the visitor's cart.
// The price is NOT sent from the browser: Wix asks the catalog plugin for it.
export const addSignToCart = webMethod(Permissions.Anyone, async (item) => {
  const cfg = cleanConfig(item);
  if (!cfg) throw new Error('That size or option isn\'t available. Check the size limits and try again.');
  if (!cfg.approved) throw new Error('Please tick the proof approval box first.');
  const qty = Math.min(1000, Math.max(1, parseInt(item.qty, 10) || 1));

  const lineItems = [{
    catalogReference: { appId: CATALOG_APP_ID, catalogItemId: cfg.product, options: toRefOptions(cfg, item.file) },
    quantity: qty
  }];
  if (cfg.art === 'design') {
    lineItems.push({
      catalogReference: { appId: CATALOG_APP_ID, catalogItemId: 'design-fee', options: { for: cfg.product, size: `${cfg.w}x${cfg.h}` } },
      quantity: 1
    });
  }
  const cart = await currentCart.addToCurrentCart({ lineItems });
  return { ok: true, items: (cart.lineItems || []).length };
});
