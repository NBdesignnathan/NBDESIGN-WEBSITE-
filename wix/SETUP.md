# NBDesign online sign shop for Wix: setup guide

This adds instant-price sign ordering to nbdesign.net.au. Customers pick a product and one of its set sizes,
choose options and add to cart. Payment, GST, shipping, order emails and the order list are all handled
by your normal **Wix Stores** checkout and dashboard.

## What's in this folder

| File | Where it goes in Wix |
|---|---|
| `backend/nbd-pricing.js` | Backend, new file. **All prices live here.** |
| `backend/nbd-config.js` | Backend, new file. Holds your catalog appId (step 4). |
| `backend/nbd-cart.web.js` | Backend, new web module. Adds signs to the cart. |
| `service-plugin/nbdSigns.js` | Catalog service plugin main file (step 3). |
| `service-plugin/nbdSigns-config.js` | Catalog service plugin config file (step 3). |
| `service-plugin/nbdMinOrder.js` | Additional Fees service plugin: the $120 minimum order (step 13). |
| `service-plugin/nbdMinOrder-config.js` | Additional Fees service plugin config file (step 13). |
| `nbdesign-logo.png` | Your logo, trimmed with a transparent background. Use it in the Wix header (Add > Image). |
| `configurator.html` | Pasted into an Embed HTML element on the Order Signs page. |
| `page-code/order-signs-page.js` | Page code for the Order Signs page. |
| `backend/nbd-trade-data.js` | Backend, new file. Reads trade customers' signs on file. |
| `backend/nbd-trade.web.js` | Backend, new web module. Trade catalogue + reorder. |
| `trade-catalogue.html` | Pasted into an Embed HTML element on the Trade Catalogue page. |
| `page-code/trade-catalogue-page.js` | Page code for the Trade Catalogue page. |
| `backend/nbd-catalogue.js` | Backend, new file. The sign catalogue designs. |
| `sign-catalogue.html` | Pasted into an Embed HTML element on the Sign Catalogue page. |
| `page-code/sign-catalogue-page.js` | Page code for the Sign Catalogue page. |

## Before you start

- Wix Stores must be added to the site, and the site needs a premium plan that accepts online payments.
- Turn on **Dev Mode** (Wix Editor: Dev Mode in the top bar > Turn on Dev Mode).
  In Wix Studio, click the Code icon > Start Coding.
- These steps are written for the Wix Editor. In Wix Studio the same files go in the Wix IDE.

## 1. Store settings (dashboard)

1. **Settings > Taxes**: set up Australian GST at 10% and choose that prices **include tax**.
   All prices in `nbd-pricing.js` are GST-inclusive.
2. **Settings > Shipping & Fulfillment**: set up two delivery options for Australia:
   - **Flat rate $35.00 per order** (Shipping > Flat rate, "per order", not per item). This matches the
     freight shown in the configurator (`FREIGHT` in `nbd-pricing.js`; change both if the price changes).
   - **Pickup**, named **Free Pick Up, Hume ACT 2620**: 39/25 Val Reid Cres, Hume ACT 2620, free
3. **Payments**: connect your payment provider. Add an offline/manual payment method too; it makes test orders easy.

## 2. Add the backend files

In the Code sidebar, open **Public & Backend**. Under **Backend**, click **+**:

1. **New .js file** named `nbd-pricing.js`. Paste in `backend/nbd-pricing.js`.
2. **New .js file** named `nbd-config.js`. Paste in `backend/nbd-config.js`.
3. **New web module** named `nbd-cart.web.js`. Paste in `backend/nbd-cart.web.js` (replace the sample code).

## 3. Add the catalog service plugin

1. At the bottom of the Code sidebar, hover **Service Plugins**, click **+**, choose **Catalog**.
2. Accept the terms, name it `nbdSigns` and click **Add & Edit Code**.
3. Wix creates two files. Replace the contents of `nbdSigns.js` with `service-plugin/nbdSigns.js`,
   and `nbdSigns-config.js` with `service-plugin/nbdSigns-config.js`.
   (If you used another name, the files take that name. The contents are the same.)

## 4. Get your appId

1. **Publish** the site.
2. Open **Wix Logs** (from the developer tools in the Code sidebar) and keep it open. Look for a line like
   *"Your site was published with an update to the ecom catalog plugin 'nbdSigns' (appId: …)"*.
3. Copy the appId into `nbd-config.js`, replacing `PASTE-YOUR-CATALOG-APP-ID-HERE`.
4. **Publish** again.

## 5. Build the Order Signs page

1. Add a new page called **Order Signs**. In its SEO settings set the URL slug to `order-signs`.
2. **Add > Embed Code > Embed HTML.** Choose **Code**, paste in all of `configurator.html`, click Update.
   - Stretch it to full width. Make it about **1500px** tall on desktop.
   - In the mobile editor, make it about **2600px** tall. The configurator scrolls inside the frame if it needs more.
   - In Properties & Events, set its ID to **`signConfigurator`**.
3. **Add > Input > Upload Button.** Put it directly under the configurator.
   - ID: **`artworkUpload`**. Button text: *Upload artwork*.
   - In its settings choose the file type. Wix allows one type per button: pick **Document** if most customers send PDFs.
     Customers can always choose "I'll email my artwork" for other formats (AI, EPS).
   - Untick "required".
4. Open the page's code panel and paste in `page-code/order-signs-page.js` (replace what's there).
5. Publish.

**All products button.** The order panel has an "← All products" button at the top. It goes to your home page (`/`).
If your product tiles live on another page, change `shopUrl` in `backend/nbd-cart.web.js` (e.g. `'/shop'`).

## 6. Link your existing service tiles

Your homepage already lists these services. Point each tile's link to the Order Signs page with the product ID:

| Tile | Link |
|---|---|
| Corflute Plastic Signs | `/order-signs?product=corflute` |
| Banners & Flags | `/order-signs?product=pvc-banner` |
| Mesh Construction Banners | `/order-signs?product=mesh-banner` |
| Pull Up Banners | `/order-signs?product=pull-up` |
| A-Frame Signs | `/order-signs?product=a-frame` |
| Stickers & Decals | `/order-signs?product=stickers` |
| Acrylic Signage | `/order-signs?product=acrylic` |
| Business Cards | `/order-signs?product=business-cards` |
| (new) Bow Banners | `/order-signs?product=bow-banners` |
| (new) Posters | `/order-signs?product=posters` |
| (new) Media Wall + Backdrop | `/order-signs?product=media-walls` |
| (new) Vehicle Magnets | `/order-signs?product=vehicle-magnets` |

Keep the quote-only services (Vehicle Signage, Fleet Signage, Trailer Signage, Vehicle, Bike & Boat Wraps, Office & Shop Signage)
on your contact form, or add a Wix Form for quote requests.

## 7. Test it

On the **published** site (the plugin only runs after publishing):

1. Configure a sign, add it, and open the cart. Check the name, size, options and price match what the page showed.
2. Change the quantity in the cart to 5 or more. The unit price should drop by the bulk discount.
3. Choose "We design it for you". A separate $65 "Artwork design service" line should appear.
4. Upload a PDF and add to cart. The cart line should say "Artwork: Uploaded: yourfile.pdf".
5. Check out with the offline payment method and confirm the order appears in **Dashboard > Orders**
   with all the details.

## 8. Trade customers: private catalogues (e.g. BLOC)

Each trade company logs in and sees only its own signs on file, at its own prices, and reorders
them through the normal cart and checkout. Do steps 1–7 first.

**a. Members area and login**
1. Add the **Members Area** (Add > Members > Members Area) if the site doesn't have one. Add the **Login Bar** to your header.
2. Dashboard > Settings > **Site Members** (or Sign-up & Login settings): set who can sign up to **People I approve**.
   This stops strangers from creating accounts.

**b. One role per company**
1. Dashboard > **Contacts > Site Members > Roles & Permissions** (or **Member Roles**), create a role named exactly
   after the company, e.g. `BLOC`.
2. When someone from BLOC signs up and you approve them, assign them the `BLOC` role.
   One person can have more than one role if they order for several companies.

**c. The TradeSigns collection (your signs on file)**
1. In the CMS, create a collection named **TradeSigns**.
2. Set its permissions to **Admin** for read, create, update and delete (choose "Private" / custom: Admin only).
   Customers never read it directly; the backend code reads it for them after checking their role.
3. Add these fields. The **field key** (not just the label) must match:

| Field key | Type | Example |
|---|---|---|
| `title` | Text (the built-in Title field) | Site entry – visitors report to office |
| `code` | Text | BLOC-001 |
| `company` | Text | BLOC (must match the role name) |
| `image` | Image | photo or proof of the sign |
| `width` | Number | 900 |
| `height` | Number | 600 |
| `material` | Text | 5mm corflute, double sided, 4 holes |
| `price` | Number | 38.50 (trade price each, incl. GST) |
| `active` | Boolean | ticked |

4. Add one row per sign and upload your sign photos into the `image` field.
   **BLOC is ready to go:** the `bloc-signs` folder has `TradeSigns-BLOC.csv` (import it from the collection's
   More actions > Import menu) and an image for each sign (BL01–BL05.jpg). After importing, open each row and
   upload its matching image. Prices in the CSV are placeholders, so update them before going live.
   Untick `active` to hide a sign without deleting it.

**c2. Company logos (optional)**
1. Create a CMS collection named **TradeAccounts**, permissions **Admin** only.
2. Fields: `company` (Text, the role name, e.g. BLOC) and `logo` (Image).
3. Add a row per company and upload its logo. `bloc-signs/BLOC-logo.png` is ready for BLOC.
   The logo then shows at the top of that company's catalogue. Without a row, the company name shows instead.

**d. Backend files**
Under **Backend**, add `nbd-trade-data.js` (new .js file) and `nbd-trade.web.js` (new web module) from this folder,
and re-paste `service-plugin/nbdSigns.js` (it now also prices trade signs). No new appId is needed.

**e. The Trade Catalogue page**
1. Add a page called **Trade Catalogue**. In its permissions, set it to **Members only**.
   Wix asks visitors to log in before showing it.
2. Add > Embed Code > **Embed HTML**, Code mode, paste all of `trade-catalogue.html`.
   Full width, about 1400px tall (mobile: about 3000px). ID: **`tradeCatalogue`**.
3. Paste `page-code/trade-catalogue-page.js` into the page's code. Publish.
4. Add a "Trade login" link to your menu that points to the Trade Catalogue page.

**f. Test**
1. Make a test member, give them the `BLOC` role, add a couple of TradeSigns rows for BLOC.
2. Log in as them on the published site. You should see only BLOC's signs. Reorder one and check the cart line
   shows the code, size, material and "Account: BLOC".
3. Log in as yourself (site owner): you see every company's signs, labelled by company, which is handy for checking.
4. A member with no company role sees "Account being set up".

## 9. Trade partner applications

Lets new businesses apply for a trade account. Uses **Wix Forms**, so every application is emailed to you
and saved in your dashboard. No code needed.

**a. The application page**
1. Add a page called **Trade Application**. In its SEO settings set the URL slug to `trade-application`
   (the trade catalogue's "Apply for a trade account" link points here).
2. Add a heading "Become a trade partner" and a short line, e.g.
   *Trade pricing, your own catalogue of signs on file and fast reorders. Apply in two minutes with your ABN.*
3. **Add > Contact & Forms**, pick a blank form, and set these fields:

| Field | Type | Required |
|---|---|---|
| Business name | Short answer | Yes |
| ABN | Short answer (or Number), limit to 11 characters, help text "11 digits" | Yes |
| What does your business do? | Dropdown: Builder / construction, Real estate, Trades, Retail / hospitality, Events / venues, Government / education, Other | Yes |
| Website | Short answer | No |
| About your business and the signs you usually need | Long answer | Yes |
| Contact name | Short answer (or the First/Last name fields) | Yes |
| Position | Short answer | No |
| Email | Email | Yes |
| Phone | Phone | Yes |
| Suburb | Short answer | Yes |
| State | Dropdown: ACT, NSW, VIC, QLD, SA, WA, TAS, NT | Yes |

4. Form **Settings**:
   - Submit button text: *Send application*.
   - After submit, show: *Thanks. We'll review your application within one business day and email your trade login once approved.*
   - Notifications: send to **Sales@nbdesign.net.au**.
5. Style it to match: black submit button, peach (#F0BB9B) accents.

**b. Link to it**
- On the homepage, under your trade section, add a black strip or box:
  **Want to become a trade partner?** + an **Apply now** button linking to the Trade Application page.
- Re-paste `trade-catalogue.html` into the Trade Catalogue page. People who aren't set up yet now see an
  "Apply for a trade account" link.

**c. When an application comes in**
1. Check the ABN at **abr.business.gov.au** (Wix Forms can't check an ABN is genuine; the ABR lookup also confirms the business name).
2. If approved: ask them to sign up on the site (or invite them from Contacts > Site Members), approve the member,
   and give them a company role (step 8b). Add their signs to TradeSigns, and a logo to TradeAccounts if they have one.
3. Email them to say they're set up.



## 10. Custom size requests

Every product page has a "Need a different size? Request a custom size quote" link. It opens a page with a
**Wix Form**, so requests are emailed to you and saved in your dashboard. No code needed.

1. Add a page called **Custom Size Request**, URL slug `custom-size-request` (the link points here).
2. Heading: "Request a custom size". Line: *Tell us the size you need and we'll email a quote, usually within one business day.*
3. **Add > Contact & Forms**, blank form, with these fields:

| Field | Type | Required |
|---|---|---|
| Product | Dropdown: Corflute Signs, PVC Banners, Mesh Construction Banners, Pull-Up Banners, A-Frame Signs, Vehicle Magnets, Stickers & Decals, Acrylic Signs, Business Cards, Bow Banners, Posters, Media Wall + Backdrop, Something else | Yes |
| Width (mm) | Number | Yes |
| Height (mm) | Number | Yes |
| Quantity | Number | Yes |
| Needed by | Date | No |
| Material, finishing or other details | Long answer | No |
| Artwork or a photo of where it's going | File upload | No |
| Name | Short answer | Yes |
| Business | Short answer | No |
| Email | Email | Yes |
| Phone | Phone | No |

4. Form **Settings**: button *Send request*; after submit show *Thanks. We'll email your quote, usually within one business day.*;
   notifications to **Sales@nbdesign.net.au**.
5. Re-paste `configurator.html` into the Order Signs page so the link appears on every product. Publish.

## 11. "We print AI artwork" section

Add this to the homepage (e.g. a black strip with peach accents, under your products):

> **AI artwork welcome**
> ## Made your design with AI? We'll print it.
> Send us artwork you've created with Claude, ChatGPT or any other AI tool. Upload it with your order like any
> other file. We check every file before it goes to print and fix anything that won't print well.
>
> Claude · ChatGPT · Gemini · Copilot · Midjourney · Adobe Firefly · Canva AI · + other AI tools
>
> **[ Get started → ]** button (peach, black text) linking to the Order Signs page
>
> - **File check on every order:** we look at size, sharpness and colour before printing.
> - **Upscaled for big signs:** AI images are often small. We'll tell you if yours needs upscaling or redrawing for a sharp result.
> - **Proof before print:** you approve the final layout before we print.
>
> **Tips & tricks: ask for a print-ready file.** When you're happy with the design, tell your AI tool the exact size
> of your sign and the quality you need. For example:
> *"Save this design as a print-ready PDF at ####mm × ####mm, 300 DPI."*
> Replace #### with your sign's width and height from the product page. Can't get a PDF? A large PNG or JPG works too. We'll check it.

The configurator (`configurator.html`) already shows a short version next to the artwork upload.

## 12. Sign catalogue (free ready-made artwork)

Customers without artwork can pick a common sign (site safety, property, business, events). The design is drawn on
the live proof at their size, and the order shows the catalogue code, e.g. "Artwork: Catalogue C01: Construction site, keep out",
plus any notes ("add our phone number"). Offered on Corflute and A-frames
(`catalogue: true` on a product in `nbd-pricing.js`).

1. Under **Backend**, add `nbd-catalogue.js` (new .js file). Re-paste `nbd-pricing.js` and `nbd-cart.web.js`.
2. Add a page called **Sign Catalogue**, URL slug `sign-catalogue`.
   **Add > Embed Code > Embed HTML**, Code mode, paste all of `sign-catalogue.html`. Full width, about 1700px tall
   (mobile: about 4500px). ID: **`signCatalogue`**. Paste `page-code/sign-catalogue-page.js` into the page's code.
3. Re-paste `configurator.html` and `page-code/order-signs-page.js` on the Order Signs page.
4. On the homepage, add an **Artwork** strip: "No artwork? Pick a ready-made sign." with a **Browse the sign catalogue**
   button linking to the Sign Catalogue page.
5. Publish, pick a design, check it shows on the proof, add to cart and check the cart line.

To add or change designs, edit `backend/nbd-catalogue.js` (copy a line, give it a new code) and publish.

## 13. $120 minimum order (whole store)

Every order has a $120.00 minimum (products and design fees, not freight). If the cart adds up to less,
Wix adds a **Minimum order top-up** line in the cart and checkout for the difference, e.g. a $85.00 cart
gets a $35.00 top-up. The Order Signs panel shows the same top-up when one item is under $120.

1. In the Code sidebar, hover **Service Plugins**, click **+**, choose **Additional Fees**.
2. Accept the terms, name it `nbdMinOrder` and click **Add & Edit Code**.
3. Replace the contents of `nbdMinOrder.js` with `service-plugin/nbdMinOrder.js`,
   and `nbdMinOrder-config.js` with `service-plugin/nbdMinOrder-config.js`.
4. Publish. Add one small item (e.g. a single A4 poster) to the cart: the top-up line should appear.
   Add more until the cart passes $120 and it disappears.
5. Place a test order and check the GST on the top-up looks right for your tax settings
   (the file marks the top-up as taxable; set `taxable: false` if your prices are set up as tax-free).

To change the minimum, edit `ORDER_MIN` in `backend/nbd-pricing.js`. Set it to 0 to turn it off.

## 14. Proof approval

Wix's checkout can't show your sign proofs, so customers approve each proof in the order panel instead:
a tick box above **Add to cart** ("I approve this proof as shown… printed exactly as supplied").
Add to cart stays disabled until it's ticked, and the backend refuses unticked items.
The order shows a **Proof** line, e.g. "Approved by customer as supplied (spelling, colours, layout)",
or "Proof to be emailed for approval" for jobs you design. Nothing to set up: it's in the updated
`configurator.html`, `backend/nbd-pricing.js` and `backend/nbd-cart.web.js`.

Optional extra: in your Wix checkout settings you can also turn on a policy agreement checkbox and link it
to a page with your artwork/proof terms, so customers agree once more at payment.

## Changing prices

Edit `backend/nbd-pricing.js` and publish. The page and the cart both read from that file, and the
cart re-checks every price there, so customers can't edit a price in their browser.

- `rate`: $ per m² (incl. GST). There are no per-item minimums: the $120 minimum is per order (`ORDER_MIN`, step 13).
- Prices were matched to Easy Signs (easysigns.com.au) in Nov 2026. Each product's comment in `nbd-pricing.js` names the Easy Signs example it was matched to. Mesh banners, pull-ups, posters, business cards and the $120 order minimum are your own figures.
- `MARKUP` (in `nbd-pricing.js`) is added on top of every product price: 1.2 = +20%. Change it to raise or lower everything at once. It doesn't touch the minimum order, freight, the design fee or trade catalogue prices.
- `presets`: the sizes customers can order online (the only sizes offered; other sizes go through the Custom Size Request form, step 10).
- `max`: no longer used for ordering; leave it as is.
- Options: `m: 1.2` adds 20%, `a: 8` adds $8 per sign.
- `curve`: volume pricing by total m² ordered, used for corflute, PVC Banners, stickers and media walls (matched to Easy Signs' published prices, Nov 2026). Each point is `[total m² in the order, $ per m²]`; prices between points follow a smooth curve, and `floor` is the lowest $/m².
- `rotate: true` adds a Landscape / Portrait choice (list sizes landscape; portrait swaps them). On for corflute, PVC Banners, magnets, stickers, acrylic and business cards.
- `noBulk: true` turns off bulk discounts for a product (used for business cards, where pack size sets the price).
- `TIERS`: bulk discounts. `SPEED`: turnaround options (express is currently off; see the comment in the file to turn it back on). `DESIGN_FEE`: design service price.
- To add a product, copy an existing block and give it a new `id` (lowercase, hyphens, no spaces).

## Where to find things after an order

- Orders, customer details and the sign specs: **Dashboard > Orders** (and the order notification email).
- Files uploaded with the Upload Button are stored in your site's **Media Manager**.

## If something doesn't work

- **Cart shows the item as unavailable**: the appId in `nbd-config.js` doesn't match the one in Wix Logs,
  or the site wasn't republished after pasting it.
- **Plugin can't import from `backend/...`**: copy `nbd-pricing.js` and `nbd-config.js` into the plugin's folder
  and change the two imports at the top of `nbdSigns.js` to `'./nbd-pricing.js'` and `'./nbd-config.js'`.
- **"Loading prices…" never goes away**: check the Embed HTML element's ID is exactly `signConfigurator`
  and the page code is on the same page.
- **Upload button does nothing**: check its ID is exactly `artworkUpload`.
- **Trade customer sees "Account being set up"**: they have no role, or the role name doesn't match the `company`
  values in TradeSigns (spelling and spaces matter; capitals don't).
- **Trade catalogue is empty**: check the rows have `active` ticked and the field keys match the table in step 8c.
