# NBDesign website

Online sign store for [nbdesign.net.au](https://nbdesign.net.au): instant pricing, live proofs, artwork upload, proof approval, trade catalogues (e.g. BLOC) and a sign catalogue.

## What's here

| Folder | What it is |
|---|---|
| `demo/` | The working demo store. Open `demo/index.html` in a browser (needs the `pdfjs/` folder next to it for PDF previews). Prices and products match the Wix kit. No payments are taken. |
| `wix/` | The Wix (Velo) kit that runs the real store. Start with `wix/SETUP.md`. |

## Wix kit at a glance

- `wix/backend/nbd-pricing.js` – products, sizes, options and all prices (`MARKUP`, `ORDER_MIN`, `FREIGHT`)
- `wix/backend/nbd-cart.web.js` – sends prices to the order panel and adds items to the Wix cart
- `wix/backend/nbd-catalogue.js` – the sign catalogue designs
- `wix/backend/nbd-trade*.js` – trade customer logins and private catalogues
- `wix/service-plugin/` – Wix checkout add-ons: catalog pricing (`nbdSigns`) and the $120 minimum order (`nbdMinOrder`)
- `wix/configurator.html`, `sign-catalogue.html`, `trade-catalogue.html` – Embed HTML panels
- `wix/page-code/` – page code for the Order Signs, Sign Catalogue and Trade Catalogue pages
- `wix/bloc-signs/` – BLOC trade signs and logo for the CMS

PDF previews in the demo use [pdf.js](https://mozilla.github.io/pdf.js/) (Apache 2.0, see `demo/pdfjs/LICENSE.txt`).
