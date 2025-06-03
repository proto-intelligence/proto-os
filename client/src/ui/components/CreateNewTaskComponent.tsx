"use client";
/*
 * Documentation:
 * Create New Task Component — https://app.subframe.com/61fe868f53c4/library?component=Create+New+Task+Component_93d0cf4f-bf7b-45df-a9ec-d94ca81eaeca
 * Icon Button — https://app.subframe.com/61fe868f53c4/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Field — https://app.subframe.com/61fe868f53c4/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Text Area — https://app.subframe.com/61fe868f53c4/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 * Select — https://app.subframe.com/61fe868f53c4/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * Accordion — https://app.subframe.com/61fe868f53c4/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Button — https://app.subframe.com/61fe868f53c4/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherClock } from "@subframe/core";

interface CreateNewTaskComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headerLabel?: React.ReactNode;
  stepsLabel?: React.ReactNode;
  icon?: React.ReactNode;
  updatedAt?: React.ReactNode;
  header?: React.ReactNode;
  taskMeta?: React.ReactNode;
  taskSteps?: React.ReactNode;
  taskUpdatedStatus?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const CreateNewTaskComponentRoot = React.forwardRef<
  HTMLElement,
  CreateNewTaskComponentRootProps
>(function CreateNewTaskComponentRoot(
  {
    headerLabel,
    stepsLabel,
    icon = <FeatherClock />,
    updatedAt,
    header,
    taskMeta,
    taskSteps,
    taskUpdatedStatus,
    footer,
    className,
    ...otherProps
  }: CreateNewTaskComponentRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[768px] flex-col items-start gap-8 rounded-md border border-solid border-neutral-border bg-white px-8 py-8 shadow-sm",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {header ? (
        <div className="flex w-full items-center justify-between">{header}</div>
      ) : null}
      {taskMeta ? (
        <div className="flex w-full flex-col items-start gap-6">{taskMeta}</div>
      ) : null}
      {taskSteps ? (
        <div className="flex w-full flex-col items-start gap-4">
          {taskSteps}
        </div>
      ) : null}
      {taskUpdatedStatus ? (
        <div className="flex w-full items-center gap-2">
          {taskUpdatedStatus}
        </div>
      ) : null}
      {footer ? (
        <div className="flex w-full flex-col items-start gap-4">{footer}</div>
      ) : null}
    </div>
  );
});

export const CreateNewTaskComponent = CreateNewTaskComponentRoot;
