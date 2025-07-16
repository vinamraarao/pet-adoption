// Builds a compliant UPI deep‑link
const qs = require('querystring');

function generateUpiLink({ pa, pn, tr, am, tn, cu = 'INR' }) {
  const params = { pa, pn, tr, am, tn, cu };
  return `upi://pay?${qs.stringify(params)}`;
}

module.exports = generateUpiLink;
