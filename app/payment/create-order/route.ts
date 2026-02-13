import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail } = body;

    // Use Production URL if env is set to PRODUCTION, otherwise use Sandbox
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

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
          customer_id: customerId || `cust_${Date.now()}`, // Fallback if ID is missing
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          // Dynamically setting the return URL based on the request origin
          return_url: `${req.headers.get('origin')}/apply/success?order_id={order_id}`
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree Error:", data);
      return NextResponse.json({ error: data.message || 'Cashfree Order Creation Failed' }, { status: response.status });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
