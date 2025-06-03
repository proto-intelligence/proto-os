"use client";
/*
 * Documentation:
 * Edit Workflow Panel — https://app.subframe.com/61fe868f53c4/library?component=Edit+Workflow+Panel_074ae19c-6268-4f44-bc77-8366f060bd9e
 * Icon Button — https://app.subframe.com/61fe868f53c4/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Field — https://app.subframe.com/61fe868f53c4/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Text Area — https://app.subframe.com/61fe868f53c4/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 * Badge — https://app.subframe.com/61fe868f53c4/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Button — https://app.subframe.com/61fe868f53c4/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Select — https://app.subframe.com/61fe868f53c4/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface EditWorkflowPanelRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
  workflowName?: React.ReactNode;
  className?: string;
}

const EditWorkflowPanelRoot = React.forwardRef<
  HTMLElement,
  EditWorkflowPanelRootProps
>(function EditWorkflowPanelRoot(
  {
    text,
    text2,
    text3,
    header,
    main,
    footer,
    workflowName,
    className,
    ...otherProps
  }: EditWorkflowPanelRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[448px] flex-col items-start gap-8 rounded-md border border-solid border-neutral-border bg-neutral-0 px-6 py-6 shadow-sm",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {header ? (
        <div className="flex w-full items-start justify-between">{header}</div>
      ) : null}
      {main ? (
        <div className="flex w-full flex-col items-start gap-6">{main}</div>
      ) : null}
      {footer ? (
        <div className="flex w-full flex-wrap items-center justify-end gap-2">
          {footer}
        </div>
      ) : null}
    </div>
  );
});

export const EditWorkflowPanel = EditWorkflowPanelRoot;
