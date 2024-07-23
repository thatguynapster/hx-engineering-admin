import { Button } from "@/components";
import { classNames } from "@/libs";
import { Editor } from "@tiptap/react";
import React from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BulletListIcon,
  ItalicIcon,
  NumberListIcon,
  RedoIcon,
  StrikeThroughIcon,
  UndoIcon,
} from "./icons";
import { PhotoIcon } from "@heroicons/react/24/outline";
import MenuImageButton from "./menu-image-button";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-between gap-12">
      <div className="flex gap-12">
        <div className="flex gap-6">
          <Button
            className={classNames(
              "!p-1",
              editor.isActive("bold") ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive("italic") ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive("strike") ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikeThroughIcon size={20} />
          </Button>
        </div>

        <div className="flex gap-6">
          <Button
            className={classNames(
              "!p-1 border border-transparent",
              editor.isActive({ textAlign: "left" })
                ? "bg-neutral-30 dark:bg-transparent dark:border-neutral-10"
                : ""
            )}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeftIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive({ textAlign: "center" }) ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenterIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive({ textAlign: "right" }) ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRightIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive({ textAlign: "justify" }) ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustifyIcon size={20} />
          </Button>
        </div>

        <div className="flex gap-6">
          <Button
            className={classNames(
              "!p-1",
              editor.isActive("bulletList") ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <BulletListIcon size={20} />
          </Button>

          <Button
            className={classNames(
              "!p-1",
              editor.isActive("orderedList") ? "bg-neutral-30" : ""
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberListIcon size={24} />
          </Button>
        </div>

        {/* <div className="flex gap-6">
          <MenuImageButton
            {...{ editor }}
            onImageSelect={(image: string) => {
              console.log(image);
            }}
          />
        </div> */}
      </div>

      <div className="flex gap-6">
        <Button
          className={classNames("!p-1", "disabled:text-neutral-40")}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoIcon size={20} />
        </Button>

        <Button
          className={classNames("!p-1", "disabled:text-neutral-40")}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoIcon size={20} />
        </Button>
      </div>
    </div>
  );
};
