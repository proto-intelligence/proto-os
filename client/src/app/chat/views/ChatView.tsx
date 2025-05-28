"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessages } from "../components/ui/ChatMessages";
import { ChatInput } from "../components/ui/ChatInput";
import { useChat } from '@ai-sdk/react';

export function ChatView() {
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [showAgentStream, setShowAgentStream] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + '/agent/stream',
    id: 'chat-view',
    body: () => ({
      messages: [
        {
          role: 'user',
          content: input
        }
      ]
    }),
    onError: (error) => {
      console.error('Stream error:', error);
    },
    onFinish: (message) => {
      console.log('Stream finished:', message);
    },
    initialMessages: []
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMicClick = () => {
    setShowAgentStream(!showAgentStream);
  };

  // Transform messages to include streaming state
  const transformedMessages = messages.map((msg, index) => ({
    id: Date.now().toString() + index,
    content: msg.content,
    role: msg.role as "user" | "assistant",
    timestamp: new Date(),
    isStreaming: isLoading && index === messages.length - 1 && msg.role === 'assistant'
  }));

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
        <>
          {error && (
            <div className="w-full px-8 py-4 text-red-500">
              Error: {error.message}
            </div>
          )}
          <ChatMessages messages={transformedMessages} />
          <div ref={messagesEndRef} />
          <ChatInput
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
            message={input}
            onMessageChange={(message: string) => handleInputChange({ target: { value: message } } as React.ChangeEvent<HTMLTextAreaElement>)}
            onSend={handleSubmit}
            onMicClick={handleMicClick}
            isLoading={isLoading}
          />
        </>
      </div>
    </div>
  );
} 