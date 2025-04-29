"use client";

import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { WorkflowEditor } from "@/components/workflows/WorkflowEditor";

interface WorkflowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WorkflowPage({ params }: WorkflowPageProps) {
  const resolvedParams = React.use(params);
  
  return (
    <AppLayout>
      <WorkflowEditor workflowId={resolvedParams.id} />
    </AppLayout>
  );
} 