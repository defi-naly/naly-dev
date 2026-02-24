'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Bold, Italic, Link2 } from 'lucide-react';
import HubTooltip from './HubTooltip';
import LinkDialog from './LinkDialog';

export default function FormatToolbar({ editor }: { editor: Editor | null }) {
  const [linkOpen, setLinkOpen] = useState(false);

  if (!editor) return null;

  const openLinkDialog = () => {
    setLinkOpen(true);
  };

  const applyLink = (url: string) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  return (
    <>
      <div className="hub-toolbar">
        <HubTooltip label="Bold" shortcut="⌘B">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`hub-toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
          >
            <Bold size={14} strokeWidth={2.5} />
          </button>
        </HubTooltip>
        <HubTooltip label="Italic" shortcut="⌘I">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`hub-toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
          >
            <Italic size={14} strokeWidth={2} />
          </button>
        </HubTooltip>
        <div className="hub-toolbar-sep" />
        <HubTooltip label="Link" shortcut="⌘K">
          <button
            type="button"
            onClick={openLinkDialog}
            className={`hub-toolbar-btn ${editor.isActive('link') ? 'active' : ''}`}
          >
            <Link2 size={14} />
          </button>
        </HubTooltip>
      </div>

      <LinkDialog
        open={linkOpen}
        onOpenChange={setLinkOpen}
        initialUrl={editor.getAttributes('link').href || ''}
        onApply={applyLink}
        onRemove={removeLink}
      />
    </>
  );
}
