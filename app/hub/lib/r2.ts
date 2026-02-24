import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { MANIFEST_KEY } from './constants';
import type { MediaManifest } from '../data/hub-types';

let client: S3Client | null = null;

function getClient() {
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

const BUCKET = () => process.env.R2_BUCKET_NAME!;

// ── Manifest ──

const EMPTY_MANIFEST: MediaManifest = { assets: {}, tags: [] };

export async function readManifest(): Promise<MediaManifest> {
  try {
    const res = await getClient().send(
      new GetObjectCommand({ Bucket: BUCKET(), Key: MANIFEST_KEY })
    );
    const body = await res.Body?.transformToString();
    return body ? JSON.parse(body) : EMPTY_MANIFEST;
  } catch (e: unknown) {
    const err = e as { name?: string };
    if (err.name === 'NoSuchKey') return EMPTY_MANIFEST;
    throw e;
  }
}

export async function writeManifest(manifest: MediaManifest) {
  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET(),
      Key: MANIFEST_KEY,
      Body: JSON.stringify(manifest),
      ContentType: 'application/json',
    })
  );
}

// ── Objects ──

export async function uploadToR2(key: string, body: Buffer, contentType: string) {
  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET(),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function deleteFromR2(key: string) {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: BUCKET(), Key: key })
  );
}

export function generateR2Key(filename: string): string {
  const ts = Date.now();
  const clean = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `media/${ts}-${clean}`;
}

/** Public URL for serving media from R2 */
export function publicUrl(r2Key: string): string {
  return `${process.env.R2_PUBLIC_URL}/${r2Key}`;
}
