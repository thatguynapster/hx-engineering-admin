import React, { ReactNode } from "react";
import { Button } from "./button";
import { Illustration } from ".";

type Props = {
  action?: {
    onClick: () => void;
    text: string;
  };
  className?: string;
  field?: string;
  icon?: ReactNode;
  subtext?: string;
  title?: string;
};

const Empty = ({ className, icon, subtext, action, title, field }: Props) => {
  return (
    <div
      className={`flex flex-col gap-8 px-4 w-full max-w-[370px] mx-auto ${className}`}
    >
      <div className="text-center flex flex-col gap-2">
        {icon ? icon : <Illustration.File className="mb-8 mx-auto" />}

        {/* <div> */}
        <p className="font-bold">{title ? title : "Nothing to see here"}</p>
        <p className="text-sm text-muted whitespace-pre-wrap">
          {subtext ? subtext : `No ${field} available.`}
        </p>
        {/* </div> */}
      </div>
      {action && (
        <Button
          type="button"
          className="btn btn-primary py-2 px-3"
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      )}
    </div>
  );
};

export default Empty;
