import React from "react";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  onCopyMessage?: (content: string) => void;
  onViewSources?: (messageId: string) => void;
  onAddToCarePlan?: (messageId: string) => void;
}

export function ChatMessages({ 
  messages,
  onCopyMessage,
  onViewSources,
  onAddToCarePlan,
}: ChatMessagesProps) {
  return (
    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 px-8 py-6 overflow-auto">
      {messages.map((message) => (
        message.role === "assistant" ? (
          <AssistantMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            onCopy={() => onCopyMessage?.(message.content)}
            onViewSources={() => onViewSources?.(message.id)}
            onAddToCarePlan={() => onAddToCarePlan?.(message.id)}
            isStreaming={message.isStreaming}
          />
        ) : (
          <UserMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
          />
        )
      ))}
    </div>
  );
} 