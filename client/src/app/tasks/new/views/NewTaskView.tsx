"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasksControllerCreate } from "@/hooks/backend/useTasksControllerCreate";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { CreateTaskDto } from "@/lib/api/backend/models/CreateTaskDto";

export function NewTaskView() {
  const router = useRouter();
  const { mutate: createTask, isPending } = useTasksControllerCreate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<CreateTaskDto.type>(CreateTaskDto.type.CLINICAL);
  const [urgency, setUrgency] = useState<CreateTaskDto.urgency>(CreateTaskDto.urgency.MEDIUM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createTask(
      {
        name: title,
        description,
        type,
        urgency,
        usually_takes: "1 hour",
        steps: {},
        workflow_id: "",
      },
      {
        onSuccess: () => {
          router.push("/tasks");
        },
      }
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <TextField label="Title">
              <TextField.Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </TextField>
          </div>

          <div className="space-y-2">
            <TextArea label="Description">
              <TextArea.Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                required
              />
            </TextArea>
          </div>

          <div className="space-y-2">
            <Select
              value={type}
              onValueChange={(value: string) => setType(value as CreateTaskDto.type)}
              placeholder="Select task type"
            >
              <Select.Item value={CreateTaskDto.type.ADMINISTRATIVE}>Administrative</Select.Item>
              <Select.Item value={CreateTaskDto.type.CLINICAL}>Clinical</Select.Item>
              <Select.Item value={CreateTaskDto.type.TECHNICAL}>Technical</Select.Item>
            </Select>
          </div>

          <div className="space-y-2">
            <Select
              value={urgency}
              onValueChange={(value: string) => setUrgency(value as CreateTaskDto.urgency)}
              placeholder="Select urgency level"
            >
              <Select.Item value={CreateTaskDto.urgency.LOW}>Low</Select.Item>
              <Select.Item value={CreateTaskDto.urgency.MEDIUM}>Medium</Select.Item>
              <Select.Item value={CreateTaskDto.urgency.HIGH}>High</Select.Item>
              <Select.Item value={CreateTaskDto.urgency.CRITICAL}>Critical</Select.Item>
            </Select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="neutral-secondary"
              onClick={() => router.push("/tasks")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 