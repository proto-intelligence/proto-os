"use client";
/*
 * Documentation:
 * Tag Stack — https://app.subframe.com/0bee54e10183/library?component=Tag+Stack_86aeedc3-be09-4494-b7ae-1b8363afcc5d
 * Tag Badge — https://app.subframe.com/0bee54e10183/library?component=Tag+Badge_13d10a79-1033-4a65-880e-a875188b7d12
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface TagStackRootProps extends React.HTMLAttributes<HTMLDivElement> {
  tags?: React.ReactNode;
  className?: string;
}

const TagStackRoot = React.forwardRef<HTMLElement, TagStackRootProps>(
  function TagStackRoot(
    { tags, className, ...otherProps }: TagStackRootProps,
    ref
  ) {
    return tags ? (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-72 flex-wrap items-start gap-1",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {tags}
      </div>
    ) : null;
  }
);

export const TagStack = TagStackRoot;
