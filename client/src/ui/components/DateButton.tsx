"use client";
/*
 * Documentation:
 * DateButton — https://app.subframe.com/0bee54e10183/library?component=DateButton_d0a61d4f-257c-47b2-a73d-1b6c628f9eaa
 * Calendar — https://app.subframe.com/0bee54e10183/library?component=Calendar_5a87e517-ace2-49af-adcf-076c97ec3921
 * Button — https://app.subframe.com/0bee54e10183/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Calendar } from "./Calendar";
import { Button } from "./Button";

interface DateButtonRootProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

const DateButtonRoot = React.forwardRef<HTMLElement, DateButtonRootProps>(
  function DateButtonRoot(
    { className, ...otherProps }: DateButtonRootProps,
    ref
  ) {
    return (
      <SubframeCore.Popover.Root>
        <SubframeCore.Popover.Trigger asChild={true}>
          <Button className={className} ref={ref as any} {...otherProps}>
            Pick a date
          </Button>
        </SubframeCore.Popover.Trigger>
        <SubframeCore.Popover.Portal>
          <SubframeCore.Popover.Content
            side="bottom"
            align="start"
            sideOffset={4}
            asChild={true}
          >
            <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
              <Calendar />
            </div>
          </SubframeCore.Popover.Content>
        </SubframeCore.Popover.Portal>
      </SubframeCore.Popover.Root>
    );
  }
);

export const DateButton = DateButtonRoot;
