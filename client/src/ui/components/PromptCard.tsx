"use client";
/*
 * Documentation:
 * Prompt Card — https://app.subframe.com/0bee54e10183/library?component=Prompt+Card_e5ec5842-7776-4a8b-9cc6-22493b58b857
 * Badge — https://app.subframe.com/0bee54e10183/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface PromptCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  prompt?: React.ReactNode;
  tags?: React.ReactNode;
  className?: string;
}

const PromptCardRoot = React.forwardRef<HTMLElement, PromptCardRootProps>(
  function PromptCardRoot(
    { text, prompt, tags, className, ...otherProps }: PromptCardRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/e5ec5842 flex h-112 w-96 cursor-pointer flex-col items-start rounded-none border border-solid border-[#2b2b2bff] bg-[#0d0d0dff] px-6 py-6 shadow-sm hover:shadow-lg",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex h-72 w-full flex-none flex-col items-center justify-center overflow-hidden bg-[#171717ff] px-4 py-4 group-hover/e5ec5842:bg-[#262626ff]">
          {prompt ? (
            <span className="w-full grow shrink-0 basis-0 font-['monospace'] text-[18px] font-[400] leading-[20px] text-[#a1a1a1ff] group-hover/e5ec5842:font-['monospace'] group-hover/e5ec5842:text-[18px] group-hover/e5ec5842:font-[400] group-hover/e5ec5842:leading-[20px] group-hover/e5ec5842:tracking-normal group-hover/e5ec5842:text-[#ffffffff]">
              {prompt}
            </span>
          ) : null}
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start justify-end gap-6">
          {text ? (
            <span className="line-clamp-1 font-['Inter'] text-[24px] font-[500] leading-[24px] text-white">
              {text}
            </span>
          ) : null}
          <div className="flex w-full items-center">
            {tags ? (
              <div className="flex flex-wrap items-start gap-2">{tags}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

export const PromptCard = PromptCardRoot;
