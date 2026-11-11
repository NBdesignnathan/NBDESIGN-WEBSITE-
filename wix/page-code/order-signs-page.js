// Page code for the "Order Signs" page.
// Needs two elements on the page (set their IDs in the Properties panel):
//   #signConfigurator  - an Embed HTML element (Embed Code > Embed HTML) containing configurator.html
//   #artworkUpload     - an Upload Button, placed directly under the configurator
// Link to a product from anywhere on your site with e.g. /order-signs?product=corflute
// The sign catalogue links here with a design too, e.g. /order-signs?product=corflute&design=C01

import wixLocationFrontend from 'wix-location-frontend';
import wixEcomFrontend from 'wix-ecom-frontend';
import { getStoreConfig, addSignToCart } from 'backend/nbd-cart.web';

$w.onReady(async function () {
  const frame = $w('#signConfigurator');
  const upload = $w('#artworkUpload');
  const startProduct = wixLocationFrontend.query.product || '';
  const startDesign = wixLocationFrontend.query.design || '';
  // From the AI artwork helper: ?size=&w=&h=&orient= preselects the size
  const q = wixLocationFrontend.query;
  const startSize = q.w && q.h ? { size: q.size, w: q.w, h: q.h, orient: q.orient } : null;
  let config = null;
  let busy = false;

  const sendInit = () => {
    if (config) frame.postMessage({ type: 'init', config, product: startProduct, design: startDesign, size: startSize });
  };

  frame.onMessage(async (event) => {
    const msg = event.data || {};

    if (msg.type === 'ready') sendInit();

    if (msg.type === 'art') {
      // Show the upload button only when the customer chose "Upload print-ready file"
      if (msg.art === 'upload') upload.expand(); else upload.collapse();
    }

    if (msg.type === 'cart') wixEcomFrontend.navigateToCartPage();

    // Bin button in the configurator: clear the chosen file
    if (msg.type === 'clearFile') { try { upload.reset(); } catch (e) { /* nothing selected */ } }

    if (msg.type === 'add' && !busy) {
      busy = true;
      try {
        let file = '';
        if (msg.item.art === 'upload' && upload.value.length > 0) {
          frame.postMessage({ type: 'status', text: 'Uploading artwork…' });
          const uploaded = await upload.uploadFiles();
          file = (uploaded[0] && (uploaded[0].originalFileName || uploaded[0].fileName)) || '';
        }
        frame.postMessage({ type: 'status', text: 'Adding to cart…' });
        await addSignToCart({ ...msg.item, file });
        await wixEcomFrontend.refreshCart();
        try { upload.reset(); } catch (e) { /* nothing selected */ }
        frame.postMessage({ type: 'added' });
      } catch (err) {
        frame.postMessage({ type: 'error', text: (err && err.message) || 'Something went wrong adding that to your cart. Please try again.' });
      }
      busy = false;
    }
  });

  upload.onChange(() => {
    const f = upload.value[0];
    frame.postMessage({ type: 'file', name: f ? f.name : '' });
  });

  config = await getStoreConfig();
  sendInit();
});
