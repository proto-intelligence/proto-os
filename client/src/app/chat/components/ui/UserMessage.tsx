import React from "react";
import { Avatar } from "@/ui/components/Avatar";

interface UserMessageProps {
  content: string;
  timestamp: Date;
}

export function UserMessage({
  content,
  timestamp,
}: UserMessageProps) {
  return (
    <div className="flex w-full items-start gap-4 justify-end">
      <div className="flex max-w-[576px] flex-col items-start gap-2 rounded-lg bg-brand-primary px-4 py-4">
        <span className="text-body font-body text-default-font whitespace-pre-wrap">
          {content}
        </span>
        <span className="text-caption font-caption text-subtext-color">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
      <Avatar
        size="small"
        image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
      >
        SA
      </Avatar>
    </div>
  );
} 