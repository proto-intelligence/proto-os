import React from "react";
import { Avatar } from "@/ui/components/Avatar";

interface AssistantMessageProps {
  content: string;
  timestamp: Date;
  onCopy?: () => void;
  onViewSources?: () => void;
  onAddToCarePlan?: () => void;
  isStreaming?: boolean;
}

export function AssistantMessage({
  content,
  timestamp,
  isStreaming = false,
}: AssistantMessageProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <Avatar 
        image="https://res.cloudinary.com/subframe/image/upload/v1744735723/uploads/7701/oog2ssqmh5bmqiy3x6i1.png"
        size="small"
      />
      <div className="flex max-w-[576px] flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
        <div className="flex w-full flex-col gap-2">
          <span className="text-body font-body text-default-font whitespace-pre-wrap">
            {content}
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-brand-primary animate-pulse" />
            )}
          </span>
          <span className="text-caption font-caption text-subtext-color">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
} 