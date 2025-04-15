"use client";
/*
 * Documentation:
 * AI Chat Toolbar — https://app.subframe.com/0bee54e10183/library?component=AI+Chat+Toolbar_f1713755-abcc-44a1-b402-3d045d7e7256
 * Tooltip — https://app.subframe.com/0bee54e10183/library?component=Tooltip_ccebd1e9-f6ac-4737-8376-0dfacd90c9f3
 * Icon Button — https://app.subframe.com/0bee54e10183/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Tooltip } from "./Tooltip";

interface AiChatToolbarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AiChatToolbarRoot = React.forwardRef<HTMLElement, AiChatToolbarRootProps>(
  function AiChatToolbarRoot(
    { children, className, ...otherProps }: AiChatToolbarRootProps,
    ref
  ) {
    return children ? (
      <div
        className={SubframeCore.twClassNames(
          "flex items-start justify-center",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children}
      </div>
    ) : null;
  }
);

export const AiChatToolbar = AiChatToolbarRoot;
