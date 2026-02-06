// api/create-order.js
export default async function handler(req, res) {
  const { orderId, amount, customer } = req.body;

  const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2022-09-01',
      'x-client-id': process.env.CASHFREE_CLIENT_ID,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: customer,
      order_meta: {
        return_url: `https://your-domain.com/payment-success?order_id=${orderId}`
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
