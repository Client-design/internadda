import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { orderId, amount, customer } = req.body;
  
  // Use non-VITE prefixed keys for server-side security
  const CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
  const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;
  const MODE = process.env.CASHFREE_MODE || 'SANDBOX';
  
  const endpoint = MODE === 'PRODUCTION' 
    ? 'https://api.cashfree.com/pg/orders' 
    : 'https://sandbox.cashfree.com/pg/orders';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CLIENT_ID || '',
        'x-client-secret': CLIENT_SECRET || '',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: customer,
        order_meta: {
          // Change this to your actual production domain when live
          return_url: `${req.headers.origin}/ApplyPage?order_id={order_id}`
        }
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
