"use client";
/*
 * Documentation:
 * Hot Key Panel — https://app.subframe.com/61fe868f53c4/library?component=Hot+Key+Panel_3b748151-b9a9-4b3e-8656-5e643a4480d4
 * Badge — https://app.subframe.com/61fe868f53c4/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Badge } from "./Badge";

interface HotKeyPanelRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HotKeyPanelRoot = React.forwardRef<HTMLElement, HotKeyPanelRootProps>(
  function HotKeyPanelRoot(
    { className, ...otherProps }: HotKeyPanelRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex h-full w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full items-center gap-4">
            <Badge
              className="shadow-sm bg-neutral-50 border border-neutral-200"
              variant="neutral"
            >
              ⌘ A
            </Badge>
            <span className="text-body font-body text-default-font">
              Add Task
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Badge
              className="shadow-sm bg-neutral-50 border border-neutral-200"
              variant="neutral"
            >
              ⌘ R
            </Badge>
            <span className="text-body font-body text-default-font">
              Remove Task
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Badge
              className="shadow-sm bg-neutral-50 border border-neutral-200"
              variant="neutral"
            >
              ⌘ S
            </Badge>
            <span className="text-body font-body text-default-font">
              Save Workflow
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Badge
              className="shadow-sm bg-neutral-50 border border-neutral-200"
              variant="neutral"
            >
              ⌘ H
            </Badge>
            <span className="text-body font-body text-default-font">
              Horizontal Align
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Badge
              className="shadow-sm bg-neutral-50 border border-neutral-200"
              variant="neutral"
            >
              ⌘ V
            </Badge>
            <span className="text-body font-body text-default-font">
              Vertical Align
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export const HotKeyPanel = HotKeyPanelRoot;
