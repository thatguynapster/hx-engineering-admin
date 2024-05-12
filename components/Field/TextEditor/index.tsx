"use client";

import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";
import { MenuBar } from "./menu";
import { debounce } from "lodash";
import Heading from "@tiptap/extension-heading";

interface TextEditorProps {
  content?: string;
  onChange: (data: string) => void;
}

export const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
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
    <div className="flex flex-col w-full">
      <MenuBar {...{ editor }} />
      <div className="p-4">
        <EditorContent
          className="border border-dashed rounded-lg h-24 max-h-48"
          {...{ editor }}
        />
      </div>
    </div>
  );
};
