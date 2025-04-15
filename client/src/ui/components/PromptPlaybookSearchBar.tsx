"use client";
/*
 * Documentation:
 * Prompt Playbook Search Bar — https://app.subframe.com/0bee54e10183/library?component=Prompt+Playbook+Search+Bar_fe810a30-a37f-4dad-a7e8-aae1f45c9cb9
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLElement, InputProps>(function Input(
  { placeholder, className, ...otherProps }: InputProps,
  ref
) {
  return (
    <input
      className={SubframeUtils.twClassNames(
        "h-full w-full border-none bg-transparent font-['monospace'] text-[14px] font-[400] leading-[20px] text-[#ffffffff] outline-none placeholder:text-neutral-400",
        className
      )}
      placeholder={placeholder as string}
      ref={ref as any}
      {...otherProps}
    />
  );
});

interface PromptPlaybookSearchBarRootProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  variant?: "outline";
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  icon?: SubframeCore.IconName;
  iconRight?: SubframeCore.IconName;
  children?: React.ReactNode;
  className?: string;
}

const PromptPlaybookSearchBarRoot = React.forwardRef<
  HTMLElement,
  PromptPlaybookSearchBarRootProps
>(function PromptPlaybookSearchBarRoot(
  {
    disabled = false,
    error = false,
    variant = "outline",
    label,
    helpText,
    icon = "FeatherSearch",
    iconRight = null,
    children,
    className,
    ...otherProps
  }: PromptPlaybookSearchBarRootProps,
  ref
) {
  return (
    <label
      className={SubframeUtils.twClassNames(
        "group/fe810a30 flex h-11 w-144 cursor-pointer flex-col items-start justify-center gap-1 border border-solid border-subtext-color bg-default-font hover:border hover:border-solid hover:border-neutral-border hover:shadow-lg",
        { "h-9 w-144": disabled },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {label ? (
        <span className="w-full grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
          {label}
        </span>
      ) : null}
      <div
        className={SubframeUtils.twClassNames(
          "flex h-8 w-full flex-none items-center gap-1 rounded-none bg-default-font px-2 group-focus-within/fe810a30:w-full group-focus-within/fe810a30:grow group-focus-within/fe810a30:shrink-0 group-focus-within/fe810a30:basis-0 group-focus-within/fe810a30:border group-focus-within/fe810a30:border-solid group-focus-within/fe810a30:border-brand-primary",
          {
            "w-full grow shrink-0 basis-0 border border-solid border-error-600":
              error,
            "border border-solid border-neutral-200 bg-neutral-200": disabled,
          }
        )}
      >
        <SubframeCore.Icon
          className="text-body font-body text-subtext-color group-hover/fe810a30:text-subtext-color"
          name={icon}
        />
        {children ? (
          <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch px-1">
            {children}
          </div>
        ) : null}
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-white",
            { "text-error-500": error }
          )}
          name={iconRight}
        />
      </div>
      {helpText ? (
        <span
          className={SubframeUtils.twClassNames(
            "font-['Inter'] text-[12px] font-[400] leading-[16px] text-white",
            { "text-error-700": error }
          )}
        >
          {helpText}
        </span>
      ) : null}
    </label>
  );
});

export const PromptPlaybookSearchBar = Object.assign(
  PromptPlaybookSearchBarRoot,
  {
    Input,
  }
);
