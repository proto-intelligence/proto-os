"use client";
/*
 * Documentation:
 * Proto Floating Toolbar — https://app.subframe.com/8616996521e5/library?component=Proto+Floating+Toolbar_98eb3d13-4d73-4472-9b7e-57e1e4c27d60
 * Text Field — https://app.subframe.com/8616996521e5/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Icon Button — https://app.subframe.com/8616996521e5/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Button — https://app.subframe.com/8616996521e5/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { TextField } from "./TextField";

interface ProtoFloatingToolbarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  iconButtonSlots?: React.ReactNode;
  className?: string;
}

const ProtoFloatingToolbarRoot = React.forwardRef<
  HTMLElement,
  ProtoFloatingToolbarRootProps
>(function ProtoFloatingToolbarRoot(
  { iconButtonSlots, className, ...otherProps }: ProtoFloatingToolbarRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[768px] items-start justify-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-lg",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <TextField
        disabled={false}
        error={false}
        variant="outline"
        label=""
        helpText=""
        icon={null}
        iconRight={null}
      >
        <TextField.Input placeholder="Workflow Name" />
      </TextField>
      {iconButtonSlots ? (
        <div className="flex grow shrink-0 basis-0 items-center justify-center gap-1 self-stretch">
          {iconButtonSlots}
        </div>
      ) : null}
    </div>
  );
});

export const ProtoFloatingToolbar = ProtoFloatingToolbarRoot;
