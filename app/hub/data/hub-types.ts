export type PostType = 'single' | 'thread';
export type DraftStatus = 'draft' | 'scheduled' | 'published';

export interface LocalDraft {
  id: string;
  title: string;
  content: TweetContent[];
  postType: PostType;
  mediaIds: string[][];
  status: DraftStatus;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TweetContent {
  type: 'doc';
  content: unknown[];
}

export interface MediaAsset {
  id: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  r2Key: string;
  altText: string;
  tags: string[];
  createdAt: string;
}

export interface MediaManifest {
  assets: Record<string, MediaAsset>;
  tags: string[];
}
