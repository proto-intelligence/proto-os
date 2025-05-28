import React, { KeyboardEvent } from "react";
import { Button } from "@/ui/components/Button";
import { FeatherBot, FeatherChevronDown, FeatherMic, FeatherSend } from "@subframe/core";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { TextFieldUnstyled } from "@/ui/components/TextFieldUnstyled";
import { IconButton } from "@/ui/components/IconButton";

interface ChatInputProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onMicClick: () => void;
  isLoading?: boolean;
}

export function ChatInput({
  selectedModel,
  onModelSelect,
  message,
  onMessageChange,
  onSend,
  onMicClick,
  isLoading = false,
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSend();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-2 px-8 py-6">
      <div className="flex w-full items-center gap-4">
        <div className="flex grow shrink-0 basis-0 items-center gap-4 rounded-lg bg-neutral-100 px-4 py-3">
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <Button
                variant="neutral-secondary"
                icon={<FeatherBot />}
                iconRight={<FeatherChevronDown />}
                disabled={isLoading}
              >
                {selectedModel}
              </Button>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="top"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem 
                    icon={<FeatherBot />}
                    onClick={() => onModelSelect("GPT-4")}
                  >
                    GPT-4
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem 
                    icon={<FeatherBot />}
                    onClick={() => onModelSelect("GPT-3.5")}
                  >
                    GPT-3.5
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem 
                    icon={<FeatherBot />}
                    onClick={() => onModelSelect("Claude 2")}
                  >
                    Claude 2
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
          <TextFieldUnstyled className="h-auto grow shrink-0 basis-0">
            <TextFieldUnstyled.Input
              placeholder="Message Proto AI"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </TextFieldUnstyled>
          <IconButton
            icon={<FeatherMic />}
            onClick={onMicClick}
            disabled={isLoading}
          />
          <IconButton
            variant="brand-primary"
            icon={<FeatherSend />}
            onClick={onSend}
            disabled={isLoading || !message.trim()}
          />
        </div>
      </div>
      <span className="w-full text-caption font-caption text-subtext-color text-center">
        Your conversation is private and secure
      </span>
    </form>
  );
} 