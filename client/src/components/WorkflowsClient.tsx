"use client";

import React, { useState } from "react";
import { ProtoIconNavButton } from "@/ui/components/ProtoIconNavButton";
import { FeatherMenu } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { ProtoSidebarCollapsible } from "@/ui/components/ProtoSidebarCollapsible";
import { ProtoTopbar } from "@/ui/components/ProtoTopbar";
import { ReactFlowProvider } from "@xyflow/react";
import { Flow } from "./HomePageClient";

function WorkflowsClient() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-full w-full items-start">
      <ProtoSidebarCollapsible
        expanded={isExpanded}
        headerSlot={
          <div className="flex items-center justify-end w-full gap-2">
            <ProtoIconNavButton
              disabled={false}
              variant="neutral-tertiary"
              size="medium"
              icon={<FeatherMenu />}
              loading={false}
              onClick={handleToggle}
              className={isExpanded ? "hidden" : ""}
            />
            <ProtoIconNavButton
              disabled={false}
              variant="neutral-tertiary"
              size="medium"
              icon={<FeatherX />}
              loading={false}
              onClick={handleToggle}
              className={!isExpanded ? "hidden" : ""}
            />
          </div>
        }
      />
      <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch">
        <ProtoTopbar className="h-10 w-full flex-none" />
        <div className="flex h-[calc(100vh-2.5rem)] w-full flex-col items-start overflow-hidden">
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default WorkflowsClient;
