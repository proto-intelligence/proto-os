"use client";

import { useState } from "react";
import { TaskList } from "../components/ui/TaskList";
import { useRouter } from "next/navigation";
import { TaskType, TaskUrgency } from "@/types/task";
import { useTasksControllerSearch } from "@/hooks/backend/useTasksControllerSearch";

export function TasksPageView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<TaskType | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<TaskUrgency | null>(null);

  const { data, isLoading } = useTasksControllerSearch({
    search: searchQuery,
    type: selectedType || undefined,
    urgency: selectedUrgency || undefined,
    page: 1,
    limit: 10,
  });

  const tasks = data?.items || [];

  const handleCreateNew = () => {
    router.push("/tasks/new");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeSelect = (type: TaskType | null) => {
    setSelectedType(type);
  };

  const handleUrgencySelect = (urgency: TaskUrgency | null) => {
    setSelectedUrgency(urgency);
  };

  return (
    <div className="p-6">
      <TaskList
        tasks={tasks}
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedUrgency={selectedUrgency}
        onSearch={handleSearch}
        onTypeSelect={handleTypeSelect}
        onUrgencySelect={handleUrgencySelect}
        onCreateNew={handleCreateNew}
        isLoading={isLoading}
      />
    </div>
  );
} 