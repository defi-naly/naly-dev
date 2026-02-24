import { NextRequest, NextResponse } from 'next/server';
import { readManifest, writeManifest, uploadToR2, generateR2Key } from '../../../hub/lib/r2';
import type { MediaAsset } from '../../../hub/data/hub-types';

/** GET — list all media assets */
export async function GET() {
  if (!process.env.R2_ACCOUNT_ID) {
    return NextResponse.json({ assets: [], tags: [] });
  }

  try {
    const manifest = await readManifest();
    const assets = Object.values(manifest.assets).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ assets, tags: manifest.tags });
  } catch (err) {
    console.error('Media list error:', err);
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
  }
}

/** POST — upload a file */
export async function POST(req: NextRequest) {
  if (!process.env.R2_ACCOUNT_ID) {
    return NextResponse.json({ error: 'R2 not configured' }, { status: 503 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const r2Key = generateR2Key(file.name);

    // Upload to R2
    await uploadToR2(r2Key, buffer, file.type);

    // Update manifest
    const manifest = await readManifest();
    const id = crypto.randomUUID();
    const asset: MediaAsset = {
      id,
      filename: r2Key.split('/').pop()!,
      originalFilename: file.name,
      mimeType: file.type,
      size: file.size,
      width: null,
      height: null,
      r2Key,
      altText: '',
      tags: [],
      createdAt: new Date().toISOString(),
    };

    manifest.assets[id] = asset;
    await writeManifest(manifest);

    return NextResponse.json({ asset });
  } catch (err) {
    console.error('Media upload error:', err);
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
