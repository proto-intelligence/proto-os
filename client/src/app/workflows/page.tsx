"use client";

import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { WorkflowEditor } from "@/components/workflows/WorkflowEditor";

export default function WorkflowsPage() {
  return (
    <AppLayout>
      <WorkflowEditor />
    </AppLayout>
  );
} 