"use client";
/*
 * Documentation:
 * Proto Legend Row — https://app.subframe.com/61fe868f53c4/library?component=Proto+Legend+Row_2c16e5c6-d5c5-4c91-a6f0-b4993663ed06
 * Dropdown Menu — https://app.subframe.com/61fe868f53c4/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/61fe868f53c4/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { DropdownMenu } from "./DropdownMenu";
import { FeatherDownloadCloud } from "@subframe/core";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

interface ProtoLegendRowRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  image?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const ProtoLegendRowRoot = React.forwardRef<
  HTMLElement,
  ProtoLegendRowRootProps
>(function ProtoLegendRowRoot(
  {
    image,
    title,
    subtitle,
    actions,
    className,
    ...otherProps
  }: ProtoLegendRowRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/2c16e5c6 flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 hover:bg-neutral-50 active:bg-neutral-100 focus-within:bg-neutral-100",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {image ? (
        <img
          className="h-12 w-12 flex-none rounded-md object-cover"
          src={image}
        />
      ) : null}
      {title ? (
        <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
          {title}
        </span>
      ) : null}
      {actions ? (
        <div className="hidden items-center gap-4 group-hover/2c16e5c6:flex">
          {actions}
        </div>
      ) : null}
    </div>
  );
});

export const ProtoLegendRow = ProtoLegendRowRoot;
