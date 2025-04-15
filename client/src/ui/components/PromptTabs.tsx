"use client";
/*
 * Documentation:
 * Prompt Tabs — https://app.subframe.com/0bee54e10183/library?component=Prompt+Tabs_4cf57bba-3917-4d8a-8387-e0372e5c27b7
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  className?: string;
}

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  {
    active = false,
    icon = null,
    children,
    className,
    ...otherProps
  }: ItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/b2dce399 flex h-10 items-center justify-center gap-2 bg-[#1d1d1dff] px-2.5 py-0.5",
        { "border-none bg-[#2c2c2cff] px-2.5 pt-0.5 pb-px": active },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeUtils.twClassNames(
          "text-body font-body text-subtext-color",
          { "text-brand-700": active }
        )}
        name={icon}
      />
      {children ? (
        <span
          className={SubframeUtils.twClassNames(
            "text-body-bold font-body-bold text-[#777777ff]",
            { "text-white": active }
          )}
        >
          {children}
        </span>
      ) : null}
    </div>
  );
});

interface PromptTabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const PromptTabsRoot = React.forwardRef<HTMLElement, PromptTabsRootProps>(
  function PromptTabsRoot(
    { children, className, ...otherProps }: PromptTabsRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full items-end",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children ? (
          <div className="flex items-start self-stretch">{children}</div>
        ) : null}
      </div>
    );
  }
);

export const PromptTabs = Object.assign(PromptTabsRoot, {
  Item,
});
