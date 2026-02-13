import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail } = body;

    const response = await fetch('https://sandbox.cashfree.com/pg/orders', { // Change to https://api.cashfree.com/pg/orders for Production
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
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: "9999999999" // Use a real number if collected
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/apply/success?order_id={order_id}`
        }
      })
    });

    const data = await response.json();
    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
