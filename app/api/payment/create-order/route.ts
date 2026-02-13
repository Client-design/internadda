import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always use the SERVICE_ROLE_KEY for backend operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, testId, userId, customerEmail, customerName } = body;

    // 1. Backend Validation
    if (!userId || !testId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    // 2. Create Order in Cashfree
    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount),
        order_currency: "INR",
        customer_details: {
          customer_id: userId, // Ensure this is the Supabase UUID
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          // Direct redirect to the test page after payment
          return_url: `${req.headers.get('origin')}/test/${testId}`
        }
      })
    });

    const data = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error('Cashfree API Error:', data);
      return NextResponse.json({ error: data.message || 'Cashfree Order Failed' }, { status: 400 });
    }

    // 3. Persist Order to Supabase Database
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: userId,          // Must be the UUID from auth.users
      test_id: String(testId),
      amount: parseFloat(amount),
      payment_session_id: data.payment_session_id,
      status: 'PENDING'
    });

    if (dbError) {
      // Log full error for server-side debugging
      console.error('Supabase DB Insert Error:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code
      });
      return NextResponse.json({ 
        error: 'Failed to initialize order in database',
        details: dbError.message 
      }, { status: 500 });
    }

    // 4. Return the session ID to the frontend to trigger the checkout
    return NextResponse.json({ payment_session_id: data.payment_session_id });

  } catch (error: any) {
    console.error('Unexpected Crash in create-order route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
