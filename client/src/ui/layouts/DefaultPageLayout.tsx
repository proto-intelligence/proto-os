"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/8616996521e5/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Proto Sidebar Collapsible — https://app.subframe.com/8616996521e5/library?component=Proto+Sidebar+Collapsible_93288e80-29e5-4457-a57c-46fac4296e0e
 * Proto Topbar — https://app.subframe.com/8616996521e5/library?component=Proto+Topbar_9bd2d000-9e95-49f0-96a8-65f3f040a3f9
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { ProtoSidebarCollapsible } from "../components/ProtoSidebarCollapsible";
import { ProtoTopbar } from "../components/ProtoTopbar";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <ProtoSidebarCollapsible expanded={false} />
      <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch">
        <ProtoTopbar className="h-12 w-full flex-none" />
        <div className="flex w-full grow shrink-0 basis-0 items-start">
          {children ? (
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
