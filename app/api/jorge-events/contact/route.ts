import { NextResponse } from 'next/server';

interface InquiryPayload {
  names: string;
  email: string;
  weddingDate?: string;
  venue?: string;
  services?: string[];
  foundUs?: string;
  message: string;
}

const submissions: (InquiryPayload & { timestamp: string })[] = [];

export async function POST(request: Request) {
  try {
    const body: InquiryPayload = await request.json();

    if (!body.names?.trim()) {
      return NextResponse.json({ error: 'Names are required' }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const submission = {
      names: body.names.trim(),
      email: body.email.trim(),
      weddingDate: body.weddingDate || '',
      venue: body.venue?.trim() || '',
      services: body.services || [],
      foundUs: body.foundUs?.trim() || '',
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);

    console.log('[JORGE EVENTS INQUIRY]', JSON.stringify(submission, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
