"use client";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Table } from "@/ui/components/Table";
import { FeatherSearch, FeatherTrash2 } from "@subframe/core";
import { Task } from "@/lib/api/backend/models/Task";
import { useRouter } from "next/navigation";
import { useTasksControllerRemove } from "@/hooks/backend/useTasksControllerRemove";

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
  onTaskDeleted?: () => void;
}

export function TaskList({
  tasks,
  searchQuery,
  onSearch,
  onCreateNew,
  isLoading = false,
  onTaskDeleted
}: TaskListProps) {
  const router = useRouter();
  const { mutate: deleteTask } = useTasksControllerRemove();

  const handleRowClick = (taskId: string) => {
    router.push(`/tasks/edit/${taskId}`);
  };

  const handleDelete = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation(); // Prevent row click when clicking delete
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId, {
        onSuccess: () => {
          onTaskDeleted?.();
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Tasks
        </h2>
        <Button onClick={onCreateNew}>Create New Task</Button>
      </div>

      <div className="w-full max-w-md">
        <TextField
          disabled={false}
          error={false}
          variant="outline"
          label=""
          helpText=""
          icon={<FeatherSearch />}
          iconRight={null}
        >
          <TextField.Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
          />
        </TextField>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            No tasks found matching your criteria.
          </div>
        ) : (
          <Table>
            <Table.HeaderRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Urgency</Table.HeaderCell>
              <Table.HeaderCell>Usually Takes</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.HeaderRow>
            {tasks.map((task) => (
              <Table.Row 
                key={task.id}
                onClick={() => handleRowClick(task.id)}
                className="cursor-pointer hover:bg-neutral-50"
              >
                <Table.Cell>
                  <div className="font-medium">{task.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm text-neutral-600">{task.description}</div>
                </Table.Cell>
                <Table.Cell>{task.type}</Table.Cell>
                <Table.Cell>{task.urgency}</Table.Cell>
                <Table.Cell>{task.usually_takes}</Table.Cell>
                <Table.Cell>{new Date(task.created_at).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Button
                    variant="neutral-tertiary"
                    size="small"
                    onClick={(e) => handleDelete(e, task.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FeatherTrash2 className="w-4 h-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
} 