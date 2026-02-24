import { NextRequest, NextResponse } from 'next/server';
import { readManifest, writeManifest, deleteFromR2 } from '../../../../hub/lib/r2';

/** PATCH — update metadata (altText, tags) */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { altText, tags } = await req.json();
    const manifest = await readManifest();
    const asset = manifest.assets[params.id];

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    if (altText !== undefined) asset.altText = altText;
    if (tags !== undefined) {
      asset.tags = tags;
      // Ensure all tags exist in manifest.tags
      for (const t of tags) {
        if (!manifest.tags.includes(t)) manifest.tags.push(t);
      }
    }

    manifest.assets[params.id] = asset;
    await writeManifest(manifest);

    return NextResponse.json({ asset });
  } catch (err) {
    console.error('Media update error:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

/** DELETE — remove asset from R2 and manifest */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const manifest = await readManifest();
    const asset = manifest.assets[params.id];

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    // Delete from R2
    await deleteFromR2(asset.r2Key);

    // Remove from manifest
    delete manifest.assets[params.id];
    await writeManifest(manifest);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Media delete error:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
