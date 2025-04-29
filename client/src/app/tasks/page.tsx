"use client";

import { AppLayout } from "@/components/AppLayout";
import { TasksPageView } from "./views/TasksPageView";

export default function TasksPage() {
  return (
    <AppLayout>
      <TasksPageView />
    </AppLayout>
  );
} 