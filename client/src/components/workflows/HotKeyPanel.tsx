"use client";

import { HotKeyPanel as BaseHotKeyPanel } from "@/ui/components/HotKeyPanel";
import { Badge } from "@/ui/components/Badge";
import { Panel } from "@xyflow/react";

interface WorkflowHotKeyPanelProps {
  className?: string;
}

export function WorkflowHotKeyPanel({ className }: WorkflowHotKeyPanelProps) {
  return (
    <Panel position="top-left" className="!p-0">
    <BaseHotKeyPanel className={className}>

    </BaseHotKeyPanel>
    </Panel>
  );
} 