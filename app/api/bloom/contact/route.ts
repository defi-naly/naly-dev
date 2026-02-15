import { NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// In-memory store for now — replace with Supabase or DB when ready
const submissions: (ContactPayload & { timestamp: string })[] = [];

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const submission = {
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);

    // Log to server console for now — visible in `next dev` terminal
    console.log('[BLOOM CONTACT]', JSON.stringify(submission, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
