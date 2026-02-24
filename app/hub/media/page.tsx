'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import MediaUploader from '../components/MediaUploader';
import MediaGrid from '../components/MediaGrid';

export default function MediaPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <>
      <div className="hub-header">
        <h1 className="text-sm font-medium text-[var(--hub-text)]">Media</h1>
      </div>

      <motion.div
        className="hub-content"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-6">
          <MediaUploader onUploadComplete={handleUploadComplete} />
        </div>
        <MediaGrid key={refreshKey} />
      </motion.div>
    </>
  );
}
