"use client";

import React from "react";
import { TaskEditView } from "@/app/tasks/edit/views/TaskEditView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  
  return <TaskEditView taskId={resolvedParams.id} />;
} 