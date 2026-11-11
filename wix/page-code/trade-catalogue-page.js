// Page code for the members-only "Trade Catalogue" page.
// Needs one element: an Embed HTML element with ID #tradeCatalogue containing trade-catalogue.html

import wixEcomFrontend from 'wix-ecom-frontend';
import { authentication } from 'wix-members-frontend';
import { getMyTradeCatalog, addTradeSignToCart } from 'backend/nbd-trade.web';

$w.onReady(async function () {
  const frame = $w('#tradeCatalogue');
  let data = null;

  const load = async () => {
    try { data = await getMyTradeCatalog(); } catch (e) { data = { status: 'login' }; }
    frame.postMessage({ type: 'init', data });
  };

  frame.onMessage(async (event) => {
    const msg = event.data || {};
    if (msg.type === 'ready' && data) frame.postMessage({ type: 'init', data });
    if (msg.type === 'cart') wixEcomFrontend.navigateToCartPage();
    if (msg.type === 'add') {
      try {
        await addTradeSignToCart(msg.id, msg.qty);
        await wixEcomFrontend.refreshCart();
        frame.postMessage({ type: 'added', id: msg.id });
      } catch (err) {
        frame.postMessage({ type: 'error', id: msg.id, text: (err && err.message) || 'Couldn\'t add that sign. Please try again.' });
      }
    }
  });

  // Reload the catalogue if someone logs in while on the page
  authentication.onLogin(() => load());

  await load();
});
