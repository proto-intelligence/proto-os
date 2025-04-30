import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Table } from "@/ui/components/Table";
import { TaskType, TaskUrgency } from "@/types/task";
import { FeatherSearch } from "@subframe/core";
import { Task } from "@/lib/api/backend/models/Task";

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  selectedType: TaskType | null;
  selectedUrgency: TaskUrgency | null;
  onSearch: (query: string) => void;
  onTypeSelect: (type: TaskType | null) => void;
  onUrgencySelect: (urgency: TaskUrgency | null) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

export function TaskList({
  tasks,
  searchQuery,
  selectedType,
  selectedUrgency,
  onSearch,
  onTypeSelect,
  onUrgencySelect,
  onCreateNew,
  isLoading = false
}: TaskListProps) {
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

      <div className="flex gap-4">
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedType || ""}
          onChange={(e) => onTypeSelect(e.target.value as TaskType || null)}
        >
          <option value="">All Types</option>
          {Object.values(TaskType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded-md"
          value={selectedUrgency || ""}
          onChange={(e) => onUrgencySelect(e.target.value as TaskUrgency || null)}
        >
          <option value="">All Urgencies</option>
          {Object.values(TaskUrgency).map((urgency) => (
            <option key={urgency} value={urgency}>
              {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            </option>
          ))}
        </select>
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
            </Table.HeaderRow>
            {tasks.map((task) => (
              <Table.Row key={task.id}>
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
              </Table.Row>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
} 