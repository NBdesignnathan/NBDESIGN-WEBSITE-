// Page code for the "Sign Catalogue" page (URL slug: sign-catalogue).
// Needs one element: an Embed HTML element with ID #signCatalogue containing sign-catalogue.html
// Opened from a product as /sign-catalogue?product=a-frame; without ?product it uses Corflute Signs.

import wixLocationFrontend from 'wix-location-frontend';
import { getStoreConfig } from 'backend/nbd-cart.web';

$w.onReady(async function () {
  const frame = $w('#signCatalogue');
  const config = await getStoreConfig();
  const ok = config.products.filter((p) => p.catalogue);
  const target = ok.find((p) => p.id === wixLocationFrontend.query.product) || ok.find((p) => p.id === 'corflute') || ok[0];
  const data = { catalogue: config.catalogue, signTypes: config.signTypes, signCats: config.signCats, target: { id: target.id, name: target.name } };

  frame.onMessage((event) => {
    const msg = event.data || {};
    if (msg.type === 'ready') frame.postMessage({ type: 'init', data });
    if (msg.type === 'choose' && msg.design) {
      wixLocationFrontend.to(`/order-signs?product=${encodeURIComponent(msg.product || target.id)}&design=${encodeURIComponent(msg.design)}`);
    }
  });
  frame.postMessage({ type: 'init', data });
});
