"use client";

import { AppLayout } from "@/components/AppLayout";
import { NewTaskView } from "./views/NewTaskView";

export default function NewTaskPage() {
  return (
    <AppLayout>
      <NewTaskView />
    </AppLayout>
  );
}
