'use client';

import * as Adapter from '@/lib/privateChef/adapters';
import * as Tiptap from '@tiptap/react';
import * as Types from '@/lib/types';

import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const PlaceholderExtension = Placeholder.configure({
  placeholder: 'Write something …',
});

const Extensions = [StarterKit, PlaceholderExtension, Link];

const content = '<p>Hello World!</p>';

const ActiveButtonClasses = 'px-2 py-1 rounded-full bg-text text-background';
const InactiveButtonClasses = 'px-2 py-1 rounded-full bg-panel text-text';
const DisabledButtonClasses = 'px-2 py-1 rounded-full bg-panel text-emphasis';

const MenuBar = () => {
  const { editor } = Tiptap.useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? ActiveButtonClasses : InactiveButtonClasses}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? ActiveButtonClasses : InactiveButtonClasses}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? ActiveButtonClasses : InactiveButtonClasses}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? ActiveButtonClasses : InactiveButtonClasses}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 }) ? ActiveButtonClasses : InactiveButtonClasses
        }
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 }) ? ActiveButtonClasses : InactiveButtonClasses
        }
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 }) ? ActiveButtonClasses : InactiveButtonClasses
        }
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={
          editor.can().chain().focus().undo().run() ? InactiveButtonClasses : DisabledButtonClasses
        }
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={
          editor.can().chain().focus().redo().run() ? InactiveButtonClasses : DisabledButtonClasses
        }
      >
        Redo
      </button>
    </div>
  );
};

const BubbleActiveClasses = 'text-background font-bold';
const BubbleInactiveClasses = 'text-background';

const BubbleMenu = () => {
  const { editor } = Tiptap.useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tiptap.BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
      <div className="flex bg-text px-4 py-2 rounded-full divide-x divide-x-text shadow-md">
        <div className="flex space-x-2 pr-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? BubbleActiveClasses : BubbleInactiveClasses}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? BubbleActiveClasses : BubbleInactiveClasses}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? BubbleActiveClasses : BubbleInactiveClasses}
          >
            Strike
          </button>
        </div>
        <div className="flex space-x-2 pl-3">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? BubbleActiveClasses : BubbleInactiveClasses}
          >
            Paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={
              editor.isActive('heading', { level: 1 }) ? BubbleActiveClasses : BubbleInactiveClasses
            }
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={
              editor.isActive('heading', { level: 2 }) ? BubbleActiveClasses : BubbleInactiveClasses
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={
              editor.isActive('heading', { level: 3 }) ? BubbleActiveClasses : BubbleInactiveClasses
            }
          >
            H3
          </button>
        </div>
      </div>
    </Tiptap.BubbleMenu>
  );
};

const FloatingMenu = () => {
  const { editor } = Tiptap.useCurrentEditor();

  if (!editor) return null;

  return (
    <Tiptap.FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
    </Tiptap.FloatingMenu>
  );
};

type RichtextEditorProps = {
  value: Tiptap.JSONContent;
  onChange: (value: Types.Richtext) => void;
};

const RichtextEditor: React.FC<RichtextEditorProps> = (props) => {
  return (
    <div className="richtext-editor focus:outline-none">
      <Tiptap.EditorProvider
        extensions={Extensions}
        content={props.value}
        // slotBefore={<MenuBar />}
        onUpdate={(e) => {
          const json = e.editor.getJSON();
          props.onChange(json as Types.Richtext);
        }}
      >
        <BubbleMenu />
        {/* <FloatingMenu /> */}
      </Tiptap.EditorProvider>
    </div>
  );
};

export default RichtextEditor;
