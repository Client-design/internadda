import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { orderId, amount, customer } = req.body;
  
  // These must be set in your Vercel Project Settings -> Environment Variables
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
        'x-api-version': '2023-08-01', // Updated to latest stable version
        'x-client-id': CLIENT_ID || '',
        'x-client-secret': CLIENT_SECRET || '',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: customer.id || `cust_${Date.now()}`,
          customer_phone: customer.phone,
          customer_email: customer.email,
          customer_name: customer.name
        },
        order_meta: {
          // Dynamic return URL based on where the request came from
          return_url: `${req.headers.origin}/ApplyPage?order_id={order_id}`
        }
      })
    });

    const data = await response.json();

    // If Cashfree returns an error, send that specific error back to the frontend
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Cashfree Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
