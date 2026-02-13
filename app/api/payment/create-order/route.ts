import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize with Service Role Key to bypass RLS during order creation
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, testId, userId, customerEmail, customerName } = body;

    // 1. Cashfree Order Creation
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction ? 'https://api.cashfree.com/pg/orders' : 'https://sandbox.cashfree.com/pg/orders';

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount), // Ensure number format for Cashfree
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999"
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`
        }
      })
    });

    const data = await cfResponse.json();
    if (!cfResponse.ok) {
      console.error('Cashfree Error:', data);
      return NextResponse.json({ error: data.message || 'Cashfree Order Failed' }, { status: cfResponse.status });
    }

    // 2. Supabase Persistence
    // Ensure column names here match your SQL schema exactly
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: userId,        // Must be the UUID from auth.users
      test_id: String(testId), // Ensure string format
      amount: parseFloat(amount),
      status: 'PENDING',
      payment_session_id: data.payment_session_id
    });

    if (dbError) {
      console.error('Supabase DB Insert Error:', dbError);
      return NextResponse.json({ error: `DB Error: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error: any) {
    console.error('Crash in create-order route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
