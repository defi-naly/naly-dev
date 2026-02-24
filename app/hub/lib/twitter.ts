import { TwitterApi } from 'twitter-api-v2';

function getClient() {
  return new TwitterApi({
    appKey: process.env.X_API_KEY!,
    appSecret: process.env.X_API_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessSecret: process.env.X_ACCESS_SECRET!,
  });
}

/** Post a single tweet, optionally with media */
export async function postTweet(text: string, mediaIds?: string[]) {
  const client = getClient();
  const payload: Record<string, unknown> = { text };
  if (mediaIds?.length) {
    payload.media = { media_ids: mediaIds };
  }
  const res = await client.v2.tweet(payload as Parameters<typeof client.v2.tweet>[0]);
  return res.data;
}

/** Post a thread — returns array of tweet IDs */
export async function postThread(
  tweets: string[],
  mediaMap: Record<number, string[]> = {}
) {
  const client = getClient();
  const ids: string[] = [];

  for (let i = 0; i < tweets.length; i++) {
    const payload: Record<string, unknown> = { text: tweets[i] };

    if (i > 0) {
      payload.reply = { in_reply_to_tweet_id: ids[i - 1] };
    }

    if (mediaMap[i]?.length) {
      payload.media = { media_ids: mediaMap[i] };
    }

    const res = await client.v2.tweet(payload as Parameters<typeof client.v2.tweet>[0]);
    ids.push(res.data.id);
  }

  return ids;
}

/** Upload media buffer to X, returns media ID string */
export async function uploadMedia(buffer: Buffer, mimeType: string): Promise<string> {
  const client = getClient();
  const mediaId = await client.v1.uploadMedia(buffer, { mimeType });
  return mediaId;
}
