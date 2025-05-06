"use client";

import { useState } from "react";
import { TaskList } from "../components/ui/TaskList";
import { useRouter } from "next/navigation";
import { useTasksControllerSearch } from "@/hooks/backend/useTasksControllerSearch";
import { useClerkData } from "@/hooks/useClerkData";

export function TasksPageView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { organization, isLoaded: isClerkLoaded } = useClerkData();

  const { data, isLoading, error } = useTasksControllerSearch({
    search: searchQuery,
    page: 1,
    limit: 10,
    organizationId: organization?.id
  });

  const tasks = data?.data || [];

  const handleCreateNew = () => {
    router.push("/tasks/new");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error loading tasks: {error.message}</div>
      </div>
    );
  }

  if (isLoading || !isClerkLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <TaskList
        tasks={tasks}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onCreateNew={handleCreateNew}
        isLoading={isLoading}
      />
    </div>
  );
} 