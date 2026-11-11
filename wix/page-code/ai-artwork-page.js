// Page code for the page with the AI artwork section (usually your home page).
// Needs one element: #aiArtwork - an Embed HTML element containing ai-artwork.html
import { getStoreConfig } from 'backend/nbd-cart.web';

$w.onReady(async function () {
  const frame = $w('#aiArtwork');
  let config = null;
  const sendInit = () => { if (config) frame.postMessage({ type: 'init', config }); };
  frame.onMessage((event) => { if ((event.data || {}).type === 'ready') sendInit(); });
  config = await getStoreConfig();
  sendInit();
});
