"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React, { useEffect } from "react";

import { MenuBar } from "./menu";
import "./styles.scss";

interface TextEditorProps {
  content?: string;
  onChange: (data: string) => void;
}

export const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      Image.configure({ inline: true, allowBase64: true }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Highlight,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit,
      // Heading.configure({
      //   levels: [1],
      // }),
    ],
    content: content,
  });

  useEffect(() => {
    editor?.on("update", () => {
      onChange(editor.getHTML());
    });
  }, [editor]);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <MenuBar {...{ editor }} />

      <EditorContent
        className="border border-dashed rounded-lg min-h-24"
        {...{ editor }}
      />
    </div>
  );
};
