// BUILT-BY: opus-4.6
import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/ai';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/summarize — Generate a project summary tailored to a role.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, 10, 60000)) {
    return NextResponse.json({ error: 'Rate limited.' }, { status: 429 });
  }

  try {
    const { projectId, role } = await request.json();

    if (!projectId || !['recruiter', 'engineer', 'founder'].includes(role)) {
      return NextResponse.json({ error: 'Invalid projectId or role.' }, { status: 400 });
    }

    const summary = await generateSummary(projectId, role);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summarize error:', error);
    return NextResponse.json({ error: 'Failed to generate summary.' }, { status: 500 });
  }
}
