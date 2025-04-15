"use client";
/*
 * Documentation:
 * Prompt Form Input — https://app.subframe.com/0bee54e10183/library?component=Prompt+Form+Input_77a00f96-1035-481d-877e-597f2ef3dfb5
 * Select — https://app.subframe.com/0bee54e10183/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * Text Field — https://app.subframe.com/0bee54e10183/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Select } from "./Select";
import { TextField } from "./TextField";

interface PromptFormInputRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PromptFormInputRoot = React.forwardRef<
  HTMLElement,
  PromptFormInputRootProps
>(function PromptFormInputRoot(
  { className, ...otherProps }: PromptFormInputRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex flex-col items-start gap-2",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
          <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-6 py-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Test Inputs
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-4 px-6 py-6">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-caption-bold font-caption-bold text-default-font">
                Campaign Type
              </span>
              <Select
                className="h-auto w-full flex-none"
                label=""
                placeholder="Only me"
                helpText=""
              >
                <Select.Item value="Email Sequence">Email Sequence</Select.Item>
                <Select.Item value="Social Media">Social Media</Select.Item>
                <Select.Item value="Pay-Per-Click">Pay-Per-Click</Select.Item>
                <Select.Item value="Content Marketing">
                  Content Marketing
                </Select.Item>
              </Select>
              <span className="text-caption font-caption text-subtext-color">
                Who can see this template
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <TextField
                className="h-auto w-full flex-none"
                label="Campaign Name"
                helpText="Choose a descriptive name for your AI-powered campaign"
              >
                <TextField.Input placeholder="e.g., Summer Sale Email Sequence" />
              </TextField>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brand-600 px-6 py-6">
              <SubframeCore.Icon
                className="text-heading-1 font-heading-1 text-brand-700"
                name="FeatherUploadCloud"
              />
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-body font-body text-default-font text-center">
                  Click to select files or drag to upload
                </span>
                <span className="text-caption font-caption text-subtext-color text-center">
                  Up to 100 files, max file size 5MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const PromptFormInput = PromptFormInputRoot;
