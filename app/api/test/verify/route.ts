export async function POST(req: Request) {
  const { testId, userId } = await req.json();
  
  const { data: order, error } = await supabase
    .from('orders')
    .select('status')
    .eq('user_id', userId)
    .eq('test_id', testId)
    .eq('status', 'PAID')
    .single();

  if (error || !order) {
    return NextResponse.json({ authorized: false }, { status: 403 });
  }

  return NextResponse.json({ authorized: true });
}
