"use client";
/*
 * Documentation:
 * AI Chat Bar — https://app.subframe.com/0bee54e10183/library?component=AI+Chat+Bar_71249f8d-6ed5-401e-840f-61a4d9820c5b
 * Dropdown Menu — https://app.subframe.com/0bee54e10183/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/0bee54e10183/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Field Unstyled — https://app.subframe.com/0bee54e10183/library?component=Text+Field+Unstyled_abb07b95-d67f-418c-aea5-aba353cce0d4
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "./DropdownMenu";
import { IconButton } from "./IconButton";
import { TextFieldUnstyled } from "./TextFieldUnstyled";

interface AiChatBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AiChatBarRoot = React.forwardRef<HTMLElement, AiChatBarRootProps>(
  function AiChatBarRoot(
    { className, ...otherProps }: AiChatBarRootProps,
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
        <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-4">
          <div className="flex h-14 w-full max-w-[768px] flex-none items-center justify-center gap-2 rounded-full bg-neutral-100 px-2 py-2">
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <IconButton size="large" icon="FeatherPaperclip" />
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon="FeatherCloud">
                      Connect to Google Drive
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherFilePlus2">
                      Upload from computer
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
            <TextFieldUnstyled className="h-auto grow shrink-0 basis-0">
              <TextFieldUnstyled.Input placeholder="Message chatGPT" />
            </TextFieldUnstyled>
            <IconButton disabled={true} size="large" icon="FeatherArrowUp" />
          </div>
          <span className="text-caption font-caption text-subtext-color">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    );
  }
);

export const AiChatBar = AiChatBarRoot;
