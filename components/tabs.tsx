import React from "react";

import { classNames } from "@/libs";
import { Field } from ".";

export const Tabs = ({
  activeKey,
  tabs,
  onSelect,
}: {
  activeKey: string;
  tabs: any;
  onSelect: (key: string) => void;
}) => {
  return (
    <div className="relative border-b border-gray-200 pb-0">
      <div className="mt-4">
        <nav className="overflow-x-auto flex space-x-8">
          {tabs.map((tab: any) => (
            <div
              key={tab.name}
              className={classNames(
                activeKey === tab.slug
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-primary hover:text-primary",
                "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium cursor-pointer"
              )}
              aria-current={activeKey === tab.slug ? "page" : undefined}
              onClick={() => {
                onSelect(tab.slug);
              }}
            >
              {tab.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
