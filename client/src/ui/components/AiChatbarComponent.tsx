"use client";
/*
 * Documentation:
 * AI Chatbar Component — https://app.subframe.com/61fe868f53c4/library?component=AI+Chatbar+Component_f8cf24eb-f690-44ca-aa35-b2b8dfbcdbcf
 * Dropdown Menu — https://app.subframe.com/61fe868f53c4/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Button — https://app.subframe.com/61fe868f53c4/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Text Field Unstyled — https://app.subframe.com/61fe868f53c4/library?component=Text+Field+Unstyled_abb07b95-d67f-418c-aea5-aba353cce0d4
 * Icon Button — https://app.subframe.com/61fe868f53c4/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { DropdownMenu } from "./DropdownMenu";
import { FeatherBot } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { TextFieldUnstyled } from "./TextFieldUnstyled";
import { IconButton } from "./IconButton";
import { FeatherSend } from "@subframe/core";

interface AiChatbarComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  modelSelector?: React.ReactNode;
  className?: string;
}

const AiChatbarComponentRoot = React.forwardRef<
  HTMLElement,
  AiChatbarComponentRootProps
>(function AiChatbarComponentRoot(
  { modelSelector, className, ...otherProps }: AiChatbarComponentRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center gap-4",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 items-center gap-4 rounded-lg bg-neutral-100 px-4 py-3">
        {modelSelector ? (
          <div className="flex items-center gap-4">{modelSelector}</div>
        ) : null}
        <TextFieldUnstyled className="h-auto grow shrink-0 basis-0">
          <TextFieldUnstyled.Input placeholder="Message AI Assistant" />
        </TextFieldUnstyled>
        <IconButton variant="brand-primary" icon={<FeatherSend />} />
      </div>
    </div>
  );
});

export const AiChatbarComponent = AiChatbarComponentRoot;
