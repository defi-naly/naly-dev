'use client';

import { useState } from 'react';
import { Download, Link, RefreshCw } from 'lucide-react';

export default function ShareActions({ data }) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  const { birthYear, erosion, finalPurchasingPower, generation } = data;
  
  const handleCopyLink = async () => {
    const url = `${window.location.origin}/tools/time-machine?birth=${birthYear}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleExport = async () => {
    setExporting(true);
    
    // Dynamic import of html2canvas to avoid SSR issues
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      // Find the results container
      const element = document.querySelector('[data-export-container]');
      if (!element) {
        setExporting(false);
        return;
      }
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 2,
      });
      
      // Download
      const link = document.createElement('a');
      link.download = `dollar-life-story-${birthYear}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
    
    setExporting(false);
  };
  
  const shareText = `I was born in ${birthYear}. $100 from that year is worth $${finalPurchasingPower.toFixed(2)} today.\n\nMy dollar has lost ${erosion.toFixed(0)}% of its purchasing power in my lifetime.\n\nSee yours:`;
  
  const handleShare = async () => {
    const url = `${window.location.origin}/tools/time-machine?birth=${birthYear}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Your Dollar's Life Story",
          text: shareText,
          url: url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface p-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Share text preview */}
        <div className="flex-1 font-mono text-xs text-neutral-500 hidden md:block">
          <span className="text-neutral-400">Share:</span> "Born {birthYear}. ${finalPurchasingPower.toFixed(2)} remaining. -{erosion.toFixed(0)}% erosion."
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs border border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
          >
            <Link className="w-3.5 h-3.5" />
            {copied ? 'COPIED!' : 'COPY LINK'}
          </button>
          
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs border border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors disabled:opacity-50"
          >
            {exporting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {exporting ? 'EXPORTING...' : 'EXPORT PNG'}
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs bg-terminal-accent text-terminal-bg hover:bg-green-400 transition-colors"
          >
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
}
