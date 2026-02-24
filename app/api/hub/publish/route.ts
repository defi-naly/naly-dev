import { NextRequest, NextResponse } from 'next/server';
import { postTweet, postThread } from '../../../hub/lib/twitter';

export async function POST(req: NextRequest) {
  try {
    const { tweets, mediaMap } = await req.json();

    if (!tweets?.length) {
      return NextResponse.json({ error: 'No tweets provided' }, { status: 400 });
    }

    let ids: string[];

    if (tweets.length === 1) {
      const mediaIds = mediaMap?.[0] || [];
      const result = await postTweet(tweets[0], mediaIds.length ? mediaIds : undefined);
      ids = [result.id];
    } else {
      ids = await postThread(tweets, mediaMap || {});
    }

    return NextResponse.json({ ids });
  } catch (err) {
    console.error('Publish error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
