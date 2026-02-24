export const X_CHAR_LIMIT = 280;
export const X_URL_LENGTH = 23;
export const X_EMOJI_LENGTH = 2;
export const X_MAX_IMAGES = 4;
export const X_MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const X_MAX_VIDEO_SIZE = 512 * 1024 * 1024; // 512MB

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];
export const SUPPORTED_MEDIA_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES];

export const AUTOSAVE_MS = 1500;
export const DRAFTS_STORAGE_KEY = 'hub-drafts';
export const MANIFEST_KEY = '_hub_manifest.json';

export const POST_TYPE_LABELS: Record<string, string> = {
  single: 'Post',
  thread: 'Thread',
};
