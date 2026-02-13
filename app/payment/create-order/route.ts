import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Added internshipId to body to ensure we redirect to the correct test page
    const { amount, customerId, customerName, customerEmail, internshipId } = body;

    // Use Production URL if env is set to PRODUCTION, otherwise use Sandbox
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    // 1. Generate a security token identical to the one used in your client-side logic
    // This token is valid for 5 minutes as per your middleware.ts logic
    const timestamp = Math.floor(Date.now() / 1000);
    const randomString = Math.random().toString(36).substring(7);
    const secureToken = `${timestamp}_${randomString}`;

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customerId || `cust_${Date.now()}`,
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          // 2. Updated return_url to point directly to the test page with the bypass token
          // This ensures the middleware lets them through without asking for sign-in
          return_url: `${req.headers.get('origin')}/test/${internshipId || '1'}?token=${secureToken}&order_id={order_id}`
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Order Creation Failed' }, { status: response.status });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
