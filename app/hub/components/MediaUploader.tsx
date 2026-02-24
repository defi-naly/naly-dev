'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';
import { SUPPORTED_MEDIA_TYPES, X_MAX_IMAGE_SIZE } from '../lib/constants';

interface Props {
  onUploadComplete: () => void;
}

export default function MediaUploader({ onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState({ done: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (files: FileList | File[]) => {
    setUploading(true);

    const fileArr = Array.from(files);
    let completed = 0;
    setUploadCount({ done: 0, total: fileArr.length });

    for (const file of fileArr) {
      if (!SUPPORTED_MEDIA_TYPES.includes(file.type)) {
        toast.error(`Unsupported type: ${file.type}`);
        continue;
      }
      if (file.size > X_MAX_IMAGE_SIZE && file.type.startsWith('image/')) {
        toast.error(`${file.name} exceeds 5MB`);
        continue;
      }

      setProgress(`Uploading ${file.name}...`);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/hub/media', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          toast.error(data.error || `Upload failed: ${file.name}`);
        } else {
          completed++;
          setUploadCount({ done: completed, total: fileArr.length });
        }
      } catch {
        toast.error(`Network error uploading ${file.name}`);
      }
    }

    setProgress(null);
    setUploading(false);
    setUploadCount({ done: 0, total: 0 });

    if (completed > 0) {
      toast.success(`${completed} file${completed > 1 ? 's' : ''} uploaded`);
      onUploadComplete();
    }
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  }, [upload]);

  return (
    <div>
      <motion.div
        className={`hub-dropzone ${dragActive ? 'active' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={dragActive ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={SUPPORTED_MEDIA_TYPES.join(',')}
          onChange={e => e.target.files?.length && upload(e.target.files)}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex flex-col items-center gap-3"
            >
              <Loader2 size={24} className="text-[var(--hub-accent)] animate-spin" />
              <p className="text-sm text-[var(--hub-text-secondary)]">{progress}</p>
              {uploadCount.total > 1 && (
                <div className="w-48">
                  <div className="h-1 bg-[var(--hub-border)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--hub-accent)] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(uploadCount.done / uploadCount.total) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--hub-text-muted)] mt-1 text-center">
                    {uploadCount.done}/{uploadCount.total}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex flex-col items-center gap-2"
            >
              <Upload size={24} strokeWidth={1.5} className="text-[var(--hub-text-muted)]" />
              <p className="text-sm text-[var(--hub-text-secondary)]">
                Drop files here or <span className="text-[var(--hub-accent)]">browse</span>
              </p>
              <p className="text-xs text-[var(--hub-text-muted)]">
                JPEG, PNG, WebP, GIF, MP4
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
