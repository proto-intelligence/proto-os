"use client";
/*
 * Documentation:
 * Quick Analyses Right Sidebar — https://app.subframe.com/0bee54e10183/library?component=Quick+Analyses+Right+Sidebar_9c4e583b-bb1a-4b28-90d9-09aee87926db
 * Badge — https://app.subframe.com/0bee54e10183/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Icon with background — https://app.subframe.com/0bee54e10183/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Progress — https://app.subframe.com/0bee54e10183/library?component=Progress_60964db0-a1bf-428b-b9d5-f34cdf58ea77
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Badge } from "./Badge";
import { IconWithBackground } from "./IconWithBackground";
import { Progress } from "./Progress";

interface QuickAnalysesRightSidebarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  className?: string;
}

const QuickAnalysesRightSidebarRoot = React.forwardRef<
  HTMLElement,
  QuickAnalysesRightSidebarRootProps
>(function QuickAnalysesRightSidebarRoot(
  {
    text,
    text2,
    text3,
    className,
    ...otherProps
  }: QuickAnalysesRightSidebarRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex h-full w-64 flex-col items-start gap-4 border-l border-solid border-neutral-border px-6 py-6",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {text ? (
        <span className="text-body-bold font-body-bold text-default-font">
          {text}
        </span>
      ) : null}
      <div className="flex w-full flex-wrap items-start gap-2">
        <Badge icon="FeatherActivity">Show Lab Trends</Badge>
        <div className="flex flex-col items-start gap-2">
          <Badge variant="neutral" icon="FeatherPill">
            Summarize Medication History
          </Badge>
          <Badge variant="error" icon="FeatherAlertCircle">
            Flag Allergies
          </Badge>
          <Badge variant="success" icon="FeatherHeart">
            Create Visit Note
          </Badge>
        </div>
        <Badge variant="warning" icon="FeatherThermometer">
          Compare Recent Labs
        </Badge>
      </div>
      <IconWithBackground icon="FeatherPlus" />
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
      {text2 ? (
        <span className="text-body-bold font-body-bold text-default-font">
          {text2}
        </span>
      ) : null}
      <div className="flex w-full flex-col items-start gap-2">
        {text3 ? (
          <span className="text-caption font-caption text-subtext-color">
            {text3}
          </span>
        ) : null}
        <Progress value={100} />
      </div>
    </div>
  );
});

export const QuickAnalysesRightSidebar = QuickAnalysesRightSidebarRoot;
