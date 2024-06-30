import { PhotoIcon } from "@heroicons/react/24/outline";
import { Editor } from "@tiptap/react";
import React, { useRef } from "react";

import { Button } from "@/components/button";
import { classNames } from "@/libs";

const MenuImageButton = ({
  editor,
  onImageSelect,
}: {
  editor: Editor | null;
  onImageSelect: (image: string) => void;
}) => {
  /**
   * refs
   */
  const imageRef = useRef<any>();

  return (
    <>
      <input
        type="file"
        ref={imageRef}
        className="hidden"
        accept={"image/jpg,image/jpeg,image/png,image/webp"}
        onChange={({ currentTarget: { files } }) => {
          if (files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
              editor
                ?.chain()
                .focus()
                .setImage({ src: reader.result as string })
                .run();
            };
            reader.readAsDataURL(files[0]);
            console.log(files?.[0]);
          }
        }}
      />
      <Button
        className={classNames(
          "!p-1",
          editor?.isActive("bulletList") ? "bg-neutral-30" : ""
        )}
        onClick={() => imageRef.current.click()}
      >
        <PhotoIcon className="w-5 h-5" />
      </Button>
    </>
  );
};

export default MenuImageButton;
