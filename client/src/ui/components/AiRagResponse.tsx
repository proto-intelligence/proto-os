"use client";
/*
 * Documentation:
 * AI RAG Response — https://app.subframe.com/0bee54e10183/library?component=AI+RAG+Response_bf4d23aa-65c9-4570-aa50-031f803aebf0
 * Icon with background — https://app.subframe.com/0bee54e10183/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Badge — https://app.subframe.com/0bee54e10183/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * AI Chat Toolbar — https://app.subframe.com/0bee54e10183/library?component=AI+Chat+Toolbar_f1713755-abcc-44a1-b402-3d045d7e7256
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { IconWithBackground } from "./IconWithBackground";
import { Badge } from "./Badge";
import { AiChatToolbar } from "./AiChatToolbar";

interface AiRagResponseRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  text9?: React.ReactNode;
  text10?: React.ReactNode;
  text11?: React.ReactNode;
  text12?: React.ReactNode;
  text13?: React.ReactNode;
  text14?: React.ReactNode;
  text15?: React.ReactNode;
  text16?: React.ReactNode;
  text17?: React.ReactNode;
  text18?: React.ReactNode;
  text19?: React.ReactNode;
  className?: string;
}

const AiRagResponseRoot = React.forwardRef<HTMLElement, AiRagResponseRootProps>(
  function AiRagResponseRoot(
    {
      text,
      text2,
      text3,
      text4,
      text5,
      text6,
      text7,
      text8,
      text9,
      text10,
      text11,
      text12,
      text13,
      text14,
      text15,
      text16,
      text17,
      text18,
      text19,
      className,
      ...otherProps
    }: AiRagResponseRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-center gap-4">
          <IconWithBackground size="medium" icon="FeatherActivity" />
          {text ? (
            <span className="text-heading-2 font-heading-2 text-default-font">
              {text}
            </span>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
          <span className="whitespace-pre-wrap text-body font-body text-default-font">
            {
              "Analysis of your blood biomarkers shows a significant improvement in cholesterol levels over the past 6 months, with LDL decreasing by 15% and HDL increasing by 8%. Vitamin D levels have stabilized within the optimal range, showing consistent maintenance above 30 ng/mL."
            }
          </span>
          {text16 ? (
            <span className="text-body-bold font-body-bold text-default-font">
              {text16}
            </span>
          ) : null}
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
            <div className="flex w-full flex-col items-start gap-2">
              {text17 ? (
                <span className="text-body font-body text-default-font">
                  {text17}
                </span>
              ) : null}
              {text18 ? (
                <span className="text-body font-body text-default-font">
                  {text18}
                </span>
              ) : null}
              {text19 ? (
                <span className="text-body font-body text-default-font">
                  {text19}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" icon="FeatherTrendingUp">
              Positive Trend
            </Badge>
            <Badge variant="neutral" icon="FeatherClock">
              6 Month Analysis
            </Badge>
          </div>
          <AiChatToolbar />
        </div>
      </div>
    );
  }
);

export const AiRagResponse = AiRagResponseRoot;
