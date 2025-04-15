"use client";
/*
 * Documentation:
 * Kanban Column — https://app.subframe.com/0bee54e10183/library?component=Kanban+Column_6892f974-b192-4030-9b58-cfd39e4366de
 * Icon Button — https://app.subframe.com/0bee54e10183/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "./IconButton";

interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const KanbanCard = React.forwardRef<HTMLElement, KanbanCardProps>(
  function KanbanCard(
    { children, className, ...otherProps }: KanbanCardProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "group/a028190f flex w-full cursor-pointer flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm hover:shadow-lg active:shadow-lg",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children ? (
          <div className="flex w-full flex-col items-start gap-4">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

interface KanbanColumnRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const KanbanColumnRoot = React.forwardRef<HTMLElement, KanbanColumnRootProps>(
  function KanbanColumnRoot(
    { title, children, className, ...otherProps }: KanbanColumnRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex w-72 flex-col items-start gap-4 rounded-md bg-neutral-50 px-6 pt-5 pb-6",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-center gap-2">
          {title ? (
            <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
              {title}
            </span>
          ) : null}
          <IconButton variant="brand-secondary" size="small" />
        </div>
        {children ? (
          <div className="flex w-full flex-col items-start gap-2 overflow-auto">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const KanbanColumn = Object.assign(KanbanColumnRoot, {
  KanbanCard,
});
