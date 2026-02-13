export async function POST(req: Request) {
  const { userId, testId, score, total } = await req.json();
  const passingScore = 15;
  const isPassed = score >= passingScore;

  const { data: attempt, error } = await supabase
    .from('user_test_attempts')
    .insert({
      user_id: userId,
      test_id: testId,
      score,
      total_marks: total,
      passed: isPassed
    })
    .select()
    .single();

  if (isPassed && !error) {
    await supabase.from('certificates').insert({
      attempt_id: attempt.id,
      certificate_url: `https://internadda.com/cert/${attempt.id}`
    });
  }

  return NextResponse.json({ success: true, passed: isPassed });
}
