import { Button, IconButton } from "@/ui";
import {
  FeatherPlusCircle,
  FeatherTrash,
  FeatherAlignVerticalJustifyStart,
  FeatherAlignHorizontalJustifyStart,
  FeatherSave,
} from "@subframe/core";
import { ProtoFloatingToolbar } from "@/ui/components/ProtoFloatingToolbar";
import { useWorkflowStore } from "./store";
import { useReactFlow } from "@xyflow/react";
import { Select } from "@/ui/components/Select";
import { useState } from "react";
import { useTasksControllerSearch } from "@/hooks/backend/useTasksControllerSearch";
import { Task } from "@/lib/api/backend/models/Task";
import { useWorkflowsControllerFindOne } from "@/hooks/backend/useWorkflowsControllerFindOne";
import { useWorkflowsControllerUpdate } from "@/hooks/backend/useWorkflowsControllerUpdate";
import { toast } from "sonner";

interface WorkflowToolbarProps {
  onDeleteNodes: () => void;
  workflowId?: string;
}

interface TaskOption {
  id: string;
  name: string;
  type: Task.type;
}

export function WorkflowToolbar({
  onDeleteNodes,
  workflowId,
}: WorkflowToolbarProps) {
  const layoutNodes = useWorkflowStore((state) => state.layoutNodes);
  const { nodes, edges } = useWorkflowStore();
  const { fitView, getViewport } = useReactFlow();
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  // Fetch workflow data if workflowId is provided
  const { data: workflowData } = useWorkflowsControllerFindOne(workflowId || '');

  // Fetch tasks from the backend
  const { data: tasksData, isLoading } = useTasksControllerSearch({
    limit: 100,
    sortBy: 'name',
    sortOrder: 'ASC'
  });

  // Get the update mutation hook
  const { mutate: updateWorkflow, isPending: isSaving } = useWorkflowsControllerUpdate();

  // Transform tasks data into options for the dropdown
  const taskOptions = tasksData?.items?.map((task: Task) => ({
    id: task.id,
    name: task.name,
    type: task.type
  })) || [];

  const handleVerticalLayout = () => {
    layoutNodes("TB");
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleHorizontalLayout = () => {
    layoutNodes("LR");
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
  };

  const handleSave = async () => {
    if (!workflowId) {
      toast.error("No workflow ID provided");
      return;
    }

    try {
      updateWorkflow(
        {
          id: workflowId,
          data: {
            nodes: nodes,
            edges: edges
          }
        },
        {
          onSuccess: () => {
            toast.success("Workflow saved successfully");
          },
          onError: (error) => {
            toast.error("Failed to save workflow");
            console.error("Failed to save workflow:", error);
          }
        }
      );
    } catch (error) {
      toast.error("Failed to save workflow");
      console.error("Failed to save workflow:", error);
    }
  };

  const handleAddNode = () => {
    const { x, y } = getViewport();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const position = {
      x: (centerX - x) / 1,
      y: (centerY - y) / 1,
    };
    
    // Find the selected task from the fetched data
    const selectedTask = taskOptions.find((task: TaskOption) => task.id === selectedTaskId);
    
    if (selectedTask) {
      useWorkflowStore.getState().addNode(selectedTask.name, position);
    }
  };

  // Get workflow name from the fetched data or use a default
  const workflowName = workflowData?.name || "Untitled Workflow";

  return (
    <ProtoFloatingToolbar
      iconButtonSlots={
        <>
          <IconButton
            size="small"
            icon={<FeatherPlusCircle />}
            onClick={handleAddNode}
          />
          <IconButton
            size="small"
            icon={<FeatherTrash />}
            onClick={onDeleteNodes}
          />
          <IconButton
            size="small"
            icon={<FeatherAlignVerticalJustifyStart />}
            onClick={handleVerticalLayout}
          />
          <IconButton
            size="small"
            icon={<FeatherAlignHorizontalJustifyStart />}
            onClick={handleHorizontalLayout}
          />

          <Button
            variant="brand-secondary"
            size="small"
            icon={<FeatherSave />}
            onClick={handleSave}
            disabled={isSaving || !workflowId}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </>
      }
      taskSearchBar={
        <Select
          label=""
          placeholder={isLoading ? "Loading tasks..." : "Select a task"}
          helpText=""
          value={selectedTaskId}
          onValueChange={(value: string) => setSelectedTaskId(value)}
          disabled={isLoading}
        >
          {taskOptions.map((task: TaskOption) => (
            <Select.Item key={task.id} value={task.id}>
              {task.name}
            </Select.Item>
          ))}
        </Select>
      }
      workflow={
        <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
          {workflowName}
        </span>
      }
    />
  );
}
