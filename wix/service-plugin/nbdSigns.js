// Catalog service plugin: Wix calls getCatalogItems() whenever it needs the
// name and price of a sign in the cart (adding to cart, changing quantity, checkout).
// Replace the contents of the generated <your-plugin-name>.js file with this.
import { CATALOG_APP_ID } from 'backend/nbd-config';
import { PRODUCTS, DESIGN_FEE, fromRefOptions, unitPrice, describe } from 'backend/nbd-pricing';
import { getSign } from 'backend/nbd-trade-data';

const line = (name, value) => ({ name: { original: name }, plainText: { original: value } });

export const getCatalogItems = async (options) => {
  const catalogItems = [];

  for (const { catalogReference, quantity } of options.catalogReferences || []) {
    const id = catalogReference.catalogItemId;
    const o = catalogReference.options || {};

    if (id === 'trade-sign') {
      // A sign on file from a trade customer's private catalogue (CMS: TradeSigns)
      const sign = await getSign(o.sign);
      if (!sign || !sign.active) continue;
      const data = {
        productName: { original: sign.title || 'Sign on file' },
        itemType: { preset: 'PHYSICAL' },
        price: (Math.round((Number(sign.price) || 0) * 100) / 100).toFixed(2),
        descriptionLines: [
          line('Code', sign.code || '-'),
          line('Size', `${sign.width || '?'} × ${sign.height || '?'} mm`),
          line('Material', sign.material || '-'),
          line('Account', sign.company || '-'),
          line('Artwork', 'On file')
        ],
        physicalProperties: { shippable: true, sku: sign.code || `trade-${sign._id}` }
      };
      if (sign.image) data.media = sign.image;
      catalogItems.push({ catalogReference: { ...catalogReference, appId: CATALOG_APP_ID }, data });
      continue;
    }

    if (id === 'design-fee') {
      const p = PRODUCTS.find((x) => x.id === o.for);
      catalogItems.push({
        catalogReference: { ...catalogReference, appId: CATALOG_APP_ID },
        data: {
          productName: { original: 'Artwork design service' },
          itemType: { preset: 'SERVICE' },
          price: DESIGN_FEE.toFixed(2),
          descriptionLines: [line('For', `${p ? p.name : 'Sign'} ${o.size || ''}`.trim())],
          physicalProperties: { shippable: false, sku: 'DESIGN' }
        }
      });
      continue;
    }

    const cfg = fromRefOptions(id, o);
    if (!cfg) continue; // invalid config: Wix shows the item as unavailable
    const p = PRODUCTS.find((x) => x.id === cfg.product);

    catalogItems.push({
      catalogReference: { ...catalogReference, appId: CATALOG_APP_ID },
      data: {
        productName: { original: p.name },
        itemType: { preset: 'PHYSICAL' },
        price: unitPrice(cfg, quantity).toFixed(2),
        descriptionLines: describe(cfg, o.file).map((d) => line(d.name, d.value)),
        physicalProperties: { shippable: true, sku: `${p.id}-${cfg.w}x${cfg.h}` }
      }
    });
  }

  return { catalogItems };
};
