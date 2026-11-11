// Additional Fees service plugin: the $120 minimum order.
// If everything in the cart adds up to less than ORDER_MIN (set in backend/nbd-pricing.js),
// Wix shows a "Minimum order top-up" line in the cart and checkout for the difference.
// Freight is not counted towards the minimum.
// Replace the contents of the generated nbdMinOrder.js file with this.
import { ORDER_MIN } from 'backend/nbd-pricing';

export const calculateAdditionalFees = async (options) => {
  const items = options.lineItems || [];
  const subtotal = items.reduce((sum, li) => sum + (Number(li.price) || 0) * (Number(li.quantity) || 0), 0);
  const additionalFees = [];
  if (items.length && subtotal < ORDER_MIN) {
    additionalFees.push({
      code: 'minimum-order',
      name: `Minimum order top-up ($${ORDER_MIN.toFixed(2)} minimum)`,
      price: (Math.round((ORDER_MIN - subtotal) * 100) / 100).toFixed(2),
      taxDetails: { taxable: true }
    });
  }
  return { additionalFees, currency: 'AUD' };
};
